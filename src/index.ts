import { JevResponse, JevInput, Env } from "./types";
import { getHtmlDashboard } from "./ui";

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
      return Response.json(response);
    }

    return new Response("Not found", { status: 404 });
  },
};
