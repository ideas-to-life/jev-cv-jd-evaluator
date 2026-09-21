import { JevResponse, JevInput, Env, CreditStatus } from "./types";
import { getHtmlDashboard } from "./ui";

// In-memory fallback map for local testing when KV is not attached
const memoryUsageMap = new Map<string, number>();

function getTodayUtcDate(): string {
  return new Date().toISOString().split("T")[0];
}

function getResetsInHours(): number {
  const now = new Date();
  const nextUtcMidnight = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1, 0, 0, 0));
  return Math.max(1, Math.round((nextUtcMidnight.getTime() - now.getTime()) / (1000 * 60 * 60)));
}

async function getCount(key: string, env: Env): Promise<number> {
  if (env.USAGE_KV) {
    const val = await env.USAGE_KV.get(key);
    return val ? parseInt(val, 10) : 0;
  }
  return memoryUsageMap.get(key) || 0;
}

async function incrementCount(key: string, env: Env): Promise<number> {
  const current = await getCount(key, env);
  const next = current + 1;
  if (env.USAGE_KV) {
    await env.USAGE_KV.put(key, String(next), { expirationTtl: 86400 });
  } else {
    memoryUsageMap.set(key, next);
  }
  return next;
}

async function getCreditStatus(req: Request, env: Env): Promise<CreditStatus> {
  const today = getTodayUtcDate();
  const resetsInHours = getResetsInHours();
  const passcode = req.headers.get("x-passcode")?.trim() || "";
  const authEmail = req.headers.get("cf-access-authenticated-user-email")?.trim();
  const cfIp = req.headers.get("cf-connecting-ip")?.trim() || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";

  let tier: "public" | "vip" | "admin" = "public";
  let limit = parseInt(env.PUBLIC_DAILY_LIMIT || "3", 10);

  if (env.ADMIN_KEY && passcode === env.ADMIN_KEY) {
    tier = "admin";
    limit = 999999;
  } else if (passcode && (passcode.toUpperCase() === (env.VIP_PASSCODE || "COURSE-VIP").toUpperCase())) {
    tier = "vip";
    limit = parseInt(env.VIP_DAILY_LIMIT || "15", 10);
  }

  const clientId = authEmail || (tier === "vip" || tier === "admin" ? `pass:${passcode}` : `ip:${cfIp}`);
  const userKey = `user:${tier}:${clientId}:${today}`;
  const globalKey = `global:${today}`;

  const globalLimit = parseInt(env.GLOBAL_DAILY_LIMIT || "250", 10);
  const globalCount = await getCount(globalKey, env);
  const globalRemaining = Math.max(0, globalLimit - globalCount);

  if (globalRemaining <= 0 && tier !== "admin") {
    return {
      allowed: false,
      tier,
      remaining: 0,
      limit,
      resetsInHours,
      globalRemaining: 0,
      error: `Today's community credit pool has been exhausted (${globalLimit}/${globalLimit} evaluations used). Resets at 00:00 UTC (~${resetsInHours}h).`,
    };
  }

  const userCount = await getCount(userKey, env);
  const remaining = Math.max(0, limit - userCount);

  if (remaining <= 0 && tier !== "admin") {
    const tierMsg = tier === "vip"
      ? `VIP daily limit reached (${limit}/${limit} evaluations used). Resets at 00:00 UTC (~${resetsInHours}h).`
      : `Daily limit reached (${limit}/${limit} evaluations used). Enter a VIP Passcode or check back tomorrow at 00:00 UTC (~${resetsInHours}h).`;
    return {
      allowed: false,
      tier,
      remaining: 0,
      limit,
      resetsInHours,
      globalRemaining,
      error: tierMsg,
    };
  }

  return {
    allowed: true,
    tier,
    remaining,
    limit,
    resetsInHours,
    globalRemaining,
  };
}

async function deductCredit(req: Request, env: Env): Promise<void> {
  const today = getTodayUtcDate();
  const passcode = req.headers.get("x-passcode")?.trim() || "";
  const authEmail = req.headers.get("cf-access-authenticated-user-email")?.trim();
  const cfIp = req.headers.get("cf-connecting-ip")?.trim() || req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "anonymous";

  let tier: "public" | "vip" | "admin" = "public";
  if (env.ADMIN_KEY && passcode === env.ADMIN_KEY) {
    tier = "admin";
  } else if (passcode && (passcode.toUpperCase() === (env.VIP_PASSCODE || "COURSE-VIP").toUpperCase())) {
    tier = "vip";
  }

  const clientId = authEmail || (tier === "vip" || tier === "admin" ? `pass:${passcode}` : `ip:${cfIp}`);
  const userKey = `user:${tier}:${clientId}:${today}`;
  const globalKey = `global:${today}`;

  await incrementCount(globalKey, env);
  if (tier !== "admin") {
    await incrementCount(userKey, env);
  }
}

export default {
  async fetch(req: Request, env: Env): Promise<Response> {
    const url = new URL(req.url);

    if (url.pathname === "/" || url.pathname === "/dashboard") {
      return new Response(getHtmlDashboard(), {
        headers: {
          "Content-Type": "text/html; charset=utf-8",
        },
      });
    }

    // --- GET /api/credits --- Check current credit status
    if (url.pathname === "/api/credits" && req.method === "GET") {
      const status = await getCreditStatus(req, env);
      return Response.json(status);
    }

    // --- POST /classify ---
    if (url.pathname === "/classify" && req.method === "POST") {
      const body = await req.json<{ text: string }>();
      const input: JevInput = {
        state: body.text,
        questions: {
          department: {
            type: "choice",
            instructions: "Which team should handle this support request?",
            criteria: {
              account: "Login, password, profile, or security issues",
              billing: "Charges, invoices, refunds, or subscriptions",
              technical: "Product bugs, outages, or integrations",
              other: "Requests that do not fit the other departments",
            },
          },
        },
      };
      const response = (await env.AI.run("typesafe/jev", input)) as JevResponse;
      return Response.json(response);
    }

    // --- POST /risk ---
    if (url.pathname === "/risk" && req.method === "POST") {
      const body = await req.json<{
        account_age_days: number;
        recent_events: string[];
        account_verified: boolean;
      }>();
      const input: JevInput = {
        state: {
          account_age_days: body.account_age_days,
          recent_events: body.recent_events,
          account_verified: body.account_verified,
        },
        questions: {
          risk_level: {
            type: "score",
            instructions: "How risky does this account activity appear?",
            criteria: [
              "Low risk: activity is consistent with the account history",
              "Moderate risk: some unusual activity needs monitoring",
              "High risk: multiple strong indicators of account compromise",
            ],
          },
          escalate: {
            type: "noul",
            instructions:
              "Should this account be escalated for manual security review?",
            criteria: {
              true: "The activity warrants immediate human review",
              false: "The activity can be handled with normal automated controls",
            },
          },
        },
      };
      const response = (await env.AI.run("typesafe/jev", input)) as JevResponse;
      return Response.json(response);
    }

    // --- POST /evaluate ---
    if (url.pathname === "/evaluate" && req.method === "POST") {
      const body = await req.json<JevInput>();
      const response = (await env.AI.run("typesafe/jev", body)) as JevResponse;
      return Response.json(response);
    }

    // --- POST /cv-jd --- CV-to-Job-Description alignment evaluator
    if (url.pathname === "/cv-jd" && req.method === "POST") {
      const creditStatus = await getCreditStatus(req, env);
      if (!creditStatus.allowed) {
        return Response.json(
          { error: creditStatus.error, creditStatus },
          { status: 429 }
        );
      }

      const body = await req.json<{ cv: string; jd: string }>();

      if (!body.cv?.trim() || !body.jd?.trim()) {
        return new Response(
          JSON.stringify({ error: "Both 'cv' and 'jd' are required." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const state = `JOB DESCRIPTION:\n${body.jd}\n\nCANDIDATE CV / RESUME:\n${body.cv}`;

      const input: JevInput = {
        state,
        questions: {
          overall_alignment: {
            type: "score",
            instructions:
              "How well does the candidate's overall profile align with the job requirements?",
            criteria: [
              "Poor alignment: the candidate is missing most key requirements",
              "Weak alignment: the candidate meets some requirements but has significant gaps",
              "Moderate alignment: the candidate meets many requirements with some notable gaps",
              "Strong alignment: the candidate meets most requirements with minor gaps",
              "Excellent alignment: the candidate meets or exceeds all key requirements",
            ],
          },
          skills_match: {
            type: "score",
            instructions:
              "How well do the candidate's technical skills and tools match the job requirements?",
            criteria: [
              "Major gaps: several required skills are missing entirely",
              "Some gaps: a few required skills are missing or only partially demonstrated",
              "Partial match: the candidate has some required skills but not all",
              "Good match: the candidate has most required skills",
              "Complete match: the candidate has all required skills and possibly more",
            ],
          },
          experience_match: {
            type: "score",
            instructions:
              "How well does the candidate's years and relevance of experience match the job requirements?",
            criteria: [
              "Insufficient: significantly less experience or in unrelated areas",
              "Marginal: slightly below the required experience or only partially relevant",
              "Adequate: meets the minimum experience requirements with relevant background",
              "Strong: exceeds the required experience with highly relevant background",
              "Exceptional: extensive experience that is a perfect match for the role",
            ],
          },
          education_match: {
            type: "score",
            instructions:
              "How well does the candidate's education and certifications match the job requirements?",
            criteria: [
              "Does not meet: missing required education or certifications",
              "Partially meets: has some relevant education but missing key credentials",
              "Meets minimum: has the required education but no additional credentials",
              "Exceeds: has the required education plus relevant certifications",
              "Far exceeds: has advanced degrees or prestigious certifications beyond requirements",
            ],
          },
          biggest_gap: {
            type: "choice",
            instructions:
              "What is the most significant gap between the candidate and the job requirements?",
            criteria: {
              none: "No significant gaps identified",
              technical_skills: "Missing required technical skills or tools",
              experience: "Insufficient years or relevance of experience",
              education: "Missing required education, degree, or certifications",
              domain_knowledge: "Lacks knowledge of the industry or domain",
              soft_skills: "Missing leadership, communication, or teamwork evidence",
              seniority: "The role requires a more senior level than the candidate demonstrates",
            },
          },
          recommend_interview: {
            type: "noul",
            instructions:
              "Based on the alignment analysis, should this candidate be invited for an interview?",
            criteria: {
              true: "The candidate shows enough alignment to warrant an interview",
              false: "The gaps are too significant to justify an interview at this time",
            },
          },
        },
      };

      const response = (await env.AI.run("typesafe/jev", input)) as JevResponse;
      await deductCredit(req, env);
      return Response.json(response);
    }

    // --- POST /upwork-proposal --- Upwork Job Post & Proposal Evaluator
    if (url.pathname === "/upwork-proposal" && req.method === "POST") {
      const creditStatus = await getCreditStatus(req, env);
      if (!creditStatus.allowed) {
        return Response.json(
          { error: creditStatus.error, creditStatus },
          { status: 429 }
        );
      }

      const body = await req.json<{ job_post: string; proposal: string }>();

      if (!body.job_post?.trim() || !body.proposal?.trim()) {
        return new Response(
          JSON.stringify({ error: "Both 'job_post' and 'proposal' are required." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }

      const state = `UPWORK JOB POST:\n${body.job_post}\n\nSUBMITTED PROPOSAL DRAFT:\n${body.proposal}`;

      const input: JevInput = {
        state,
        questions: {
          hook_strength: {
            type: "score",
            instructions:
              "How effectively do the opening 2-3 lines grab the client's attention and avoid generic pleasantries?",
            criteria: [
              "Poor hook: uses generic filler, pleasantries, or boilerplate introduction",
              "Weak hook: mentions the project but does not stand out in the client's inbox snippet",
              "Moderate hook: addresses the job topic with basic relevance",
              "Strong hook: directly addresses the client's problem with sharp relevance",
              "Exceptional hook: immediately hooks the client with high-impact insight or solution angle",
            ],
          },
          problem_understanding: {
            type: "score",
            instructions:
              "How well does the proposal demonstrate genuine understanding of the client's problem, constraints, and business goals?",
            criteria: [
              "Misunderstood: misses the client's core problem or proposes an irrelevant solution",
              "Superficial: only repeats the client's words without showing deeper comprehension",
              "Adequate: understands the basic technical scope and deliverables",
              "Deep: clearly understands root challenges, architecture constraints, and business context",
              "Mastery: anticipates edge cases and demonstrates authoritative domain mastery",
            ],
          },
          technical_credibility: {
            type: "score",
            instructions:
              "How effectively does the proposal provide proof of work, past case studies, metrics, or technical authority?",
            criteria: [
              "No proof: makes unsupported claims with zero evidence or portfolio references",
              "Weak proof: generic claims with little concrete project context",
              "Solid proof: cites relevant past projects, tech stacks, or tangible results",
              "High credibility: cites highly relevant case studies, quantifiable impact, and deep stack mastery",
              "Authoritative: undisputed expert proof directly mirroring the client's stack and problem",
            ],
          },
          brevity_and_tone: {
            type: "score",
            instructions:
              "How appropriate is the proposal's brevity, structure, readability, and confident peer-to-peer consulting tone?",
            criteria: [
              "Poor tone: unstructured wall of text, desperate, or overly academic/subordinate",
              "Needs improvement: somewhat cluttered or hard to scan quickly",
              "Good: structured with clear paragraphs/bullet points and professional tone",
              "Strong: crisp, scannable, confident peer-to-peer consulting tone with zero fluff",
              "Exceptional: perfectly paced, effortless to read, and immediately conveys executive poise",
            ],
          },
          call_to_action: {
            type: "score",
            instructions:
              "How effective is the closing call-to-action (CTA) in sparking a low-friction conversation or interview?",
            criteria: [
              "No CTA: ends abruptly or with passive statements like 'hope to hear from you'",
              "Weak CTA: asks generic questions or demands immediate high-commitment calls",
              "Clear CTA: includes a direct next step or question",
              "Compelling CTA: asks an insightful question about the client's stack or timeline",
              "Irresistible CTA: low-friction, high-value conversation starter that compels an immediate reply",
            ],
          },
          scope_budget_fit: {
            type: "score",
            instructions:
              "How well does the proposal address the client's budget expectations, timeline, and delivery scope?",
            criteria: [
              "Misaligned: ignores budget, timeline, or key delivery scope entirely",
              "Questionable: vague on timelines or unrealistic regarding project scope",
              "Reasonable: acknowledges timeline and scope with feasible expectations",
              "Strong alignment: clearly articulates phased milestones, timeline feasibility, and value",
              "Optimal alignment: perfectly calibrated delivery plan maximizing ROI for the client's budget",
            ],
          },
          primary_weakness: {
            type: "choice",
            instructions:
              "What is the single most significant weakness or bottleneck in this Upwork proposal?",
            criteria: {
              none: "No significant weakness identified; proposal is well-optimized",
              generic_hook: "Opening lines are generic or waste the preview snippet on pleasantries",
              lack_of_proof: "Lacks specific proof of work, past metrics, or relevant portfolio examples",
              weak_cta: "Closing lacks a compelling question or low-friction conversation starter",
              too_lengthy_unstructured: "Proposal is overly verbose, dense, or difficult to scan on mobile",
              missed_key_requirement: "Missed an explicit requirement or question posed in the job post",
              passive_tone: "Tone is too desperate, passive, or overly academic rather than peer-to-peer",
            },
          },
          recommend_submission: {
            type: "noul",
            instructions:
              "Based on overall proposal strength and competitiveness, is this proposal ready to submit to the client?",
            criteria: {
              true: "The proposal is competitive, persuasive, and ready to submit",
              false: "The proposal needs revision before spending connects or submitting",
            },
          },
        },
      };

      const response = (await env.AI.run("typesafe/jev", input)) as JevResponse;
      await deductCredit(req, env);
      return Response.json(response);
    }

    return new Response("Not found", { status: 404 });
  },
};
