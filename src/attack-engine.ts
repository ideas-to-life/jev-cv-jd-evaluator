import {
  ProposalRow,
  CallRow,
  AttackWindow,
  KpiBenchmarkTarget,
  CohortWeeklyMetrics,
  ThirtyDayAttackDeterministicMetrics,
  ThirtyDayAttackInput,
  JevInput,
} from "./types";

export const DEFAULT_DATALUMINA_BENCHMARKS: KpiBenchmarkTarget[] = [
  {
    category: "Network Outreach",
    kpiName: "Total Outreach Messages Sent",
    targetValue: "50-150 people",
    minTarget: 50,
    maxTarget: 150,
    unit: "messages",
    trackingFrequency: "Daily",
    impactDescription:
      "Direct measure of pipeline growth and network expansion efficiency; includes recruiter and B2B outreach.",
  },
  {
    category: "Network Outreach",
    kpiName: "Outreach Conversion Rate (Reply Rate)",
    targetValue: "10% - 30% Reply Rate",
    minTarget: 10,
    maxTarget: 30,
    unit: "%",
    trackingFrequency: "Daily / Weekly",
    impactDescription:
      "Measures effectiveness of messaging and targeting in converting outreach to discovery calls.",
  },
  {
    category: "Sales Conversion",
    kpiName: "Proposal Interview Rate",
    targetValue: "10% - 30% Interview Rate",
    minTarget: 10,
    maxTarget: 30,
    unit: "%",
    trackingFrequency: "Daily / Weekly",
    impactDescription:
      "Measures relevance of skills, credibility proof, and CTA in booking prospect calls.",
  },
  {
    category: "Sales Conversion",
    kpiName: "Interview & Win Rate",
    targetValue: "20% - 40% Win Rate",
    minTarget: 20,
    maxTarget: 40,
    unit: "%",
    trackingFrequency: "Weekly",
    impactDescription:
      "Evaluates closing skills and the efficiency of the sales funnel from proposal to won project.",
  },
  {
    category: "Sales Conversion",
    kpiName: "Discovery Calls Scheduled",
    targetValue: "100% of qualified leads",
    minTarget: 4,
    unit: "calls",
    trackingFrequency: "Daily",
    impactDescription:
      "Critical milestone to understand client challenges and move prospects into the formal proposal stage.",
  },
  {
    category: "Personal Performance",
    kpiName: "Productivity & Daily Focus Cadence",
    targetValue: "90%+ Active Days",
    minTarget: 90,
    unit: "%",
    trackingFrequency: "Daily",
    impactDescription:
      "Measures concentration, consistent daily output, and avoidance of dormant periods.",
  },
  {
    category: "Business Launch",
    kpiName: "30-Day Attack Cycle Completion",
    targetValue: "100% (30 Days)",
    minTarget: 100,
    unit: "%",
    trackingFrequency: "Daily / Monthly",
    impactDescription:
      "Ensures consistent action and momentum required for the performance guarantee and securing projects.",
  },
];

/**
 * Checks if a cell value indicates a truthy state (checkmarks, boolean, 1, yes, x)
 */
export function isTruthyMetric(val: unknown): boolean {
  if (val === true || val === 1) return true;
  if (!val) return false;
  const s = String(val).trim().toLowerCase();
  return (
    s === "true" ||
    s === "1" ||
    s === "yes" ||
    s === "y" ||
    s === "x" ||
    s === "✔" ||
    s === "✓" ||
    s === "checked"
  );
}

/**
 * Normalizes loose dates (e.g. "9/9/2026", "01/09/2026", "2026-09-09", Excel serials) into YYYY-MM-DD
 */
export function normalizeDate(dateVal: unknown): string | null {
  if (!dateVal) return null;

  // If number (Excel serial timestamp)
  if (typeof dateVal === "number" && !isNaN(dateVal)) {
    // Excel epoch starts 1899-12-30
    const excelEpoch = new Date(Date.UTC(1899, 11, 30));
    const jsDate = new Date(excelEpoch.getTime() + dateVal * 86400000);
    if (!isNaN(jsDate.getTime())) {
      return jsDate.toISOString().split("T")[0];
    }
  }

  const str = String(dateVal).trim();
  if (!str) return null;

  // Match YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }

  // Match D/M/YYYY or DD/MM/YYYY or M/D/YYYY
  const slashMatch = str.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (slashMatch) {
    const p1 = parseInt(slashMatch[1], 10);
    const p2 = parseInt(slashMatch[2], 10);
    const y = parseInt(slashMatch[3], 10);
    // If p1 > 12, it must be DD/MM/YYYY
    // Otherwise standard UK/EU date DD/MM/YYYY convention commonly used in Datalumina tracker
    let day = p1;
    let month = p2;
    if (p2 > 12 && p1 <= 12) {
      // It's MM/DD/YYYY
      month = p1;
      day = p2;
    }
    const dStr = String(day).padStart(2, "0");
    const mStr = String(month).padStart(2, "0");
    return `${y}-${mStr}-${dStr}`;
  }

  // General JS parse attempt
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    return parsed.toISOString().split("T")[0];
  }

  return null;
}

/**
 * Calculates the active 30-day attack window:
 * Window runs from: (End of Current Week - 30 days) to (End of Current Week).
 * Standard ISO week ends on Sunday 23:59:59 UTC.
 */
export function calculateAttackWindow(
  proposals: ProposalRow[],
  calls: CallRow[],
  windowOverride?: { startDate?: string; endDate?: string }
): AttackWindow {
  if (windowOverride?.startDate && windowOverride?.endDate) {
    const start = new Date(windowOverride.startDate);
    const end = new Date(windowOverride.endDate);
    const daysCovered = Math.max(
      1,
      Math.round((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1
    );
    return {
      startDate: windowOverride.startDate,
      endDate: windowOverride.endDate,
      daysCovered,
      referenceDate: windowOverride.endDate,
    };
  }

  // Find latest recorded activity date across all proposals and calls
  const allDates: string[] = [];
  for (const p of proposals) {
    const nd = normalizeDate(p.date);
    if (nd) allDates.push(nd);
  }
  for (const c of calls) {
    const nd = normalizeDate(c.date);
    if (nd) allDates.push(nd);
  }

  let refDateStr = new Date().toISOString().split("T")[0];
  if (allDates.length > 0) {
    allDates.sort();
    refDateStr = allDates[allDates.length - 1];
  }

  const [ry, rm, rd] = refDateStr.split("-").map((n) => parseInt(n, 10));
  const refDate = new Date(Date.UTC(ry, rm - 1, rd));

  // Compute end of current week (Sunday)
  // getUTCDay: 0 is Sunday, 1 is Monday ... 6 is Saturday
  const dayOfWeek = refDate.getUTCDay();
  const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
  const endOfWeek = new Date(refDate.getTime() + daysUntilSunday * 86400000);

  // 30 days attack window: 30 days prior up to and including end of current week
  const startOfWindow = new Date(endOfWeek.getTime() - 29 * 86400000);

  const startDateStr = startOfWindow.toISOString().split("T")[0];
  const endDateStr = endOfWeek.toISOString().split("T")[0];

  return {
    startDate: windowOverride?.startDate || startDateStr,
    endDate: windowOverride?.endDate || endDateStr,
    daysCovered: 30,
    referenceDate: refDateStr,
  };
}

/**
 * Deterministic engine: filters data into attack window and computes metrics.
 */
export function computeAttackMetrics(
  input: ThirtyDayAttackInput
): { window: AttackWindow; metrics: ThirtyDayAttackDeterministicMetrics } {
  const window = calculateAttackWindow(
    input.proposals || [],
    input.calls || [],
    input.windowOverride
  );

  const startMs = new Date(window.startDate).getTime();
  const endMs = new Date(window.endDate + "T23:59:59.999Z").getTime();

  // Filter rows within window
  const inWindowProposals = (input.proposals || []).filter((p) => {
    const nd = normalizeDate(p.date);
    if (!nd) return false;
    const ms = new Date(nd).getTime();
    return ms >= startMs && ms <= endMs;
  });

  const inWindowCalls = (input.calls || []).filter((c) => {
    const nd = normalizeDate(c.date);
    if (!nd) return false;
    const ms = new Date(nd).getTime();
    return ms >= startMs && ms <= endMs;
  });

  // Funnel counts
  const totalProposalsSent = inWindowProposals.length;
  let totalReplies = 0;
  let totalInterviews = 0;
  let totalWon = 0;
  const activeDatesSet = new Set<string>();
  const sampleRoles: string[] = [];

  for (const p of inWindowProposals) {
    const nd = normalizeDate(p.date);
    if (nd) activeDatesSet.add(nd);
    if (isTruthyMetric(p.reply)) totalReplies++;
    if (isTruthyMetric(p.interview)) totalInterviews++;
    if (isTruthyMetric(p.won)) totalWon++;
    if (p.job && sampleRoles.length < 5 && !sampleRoles.includes(p.job)) {
      sampleRoles.push(p.job.trim());
    }
  }

  // Call breakdown
  let introCalls = 0;
  let discoveryCalls = 0;
  let proposalCalls = 0;
  let inboundLeads = 0;
  let inboundToDiscovery = 0;
  const topObjections: string[] = [];

  for (const c of inWindowCalls) {
    const nd = normalizeDate(c.date);
    if (nd) activeDatesSet.add(nd);

    const type = (c.callType || "").toLowerCase();
    const outcome = (c.outcome || "").toLowerCase();

    if (type.includes("intro")) introCalls++;
    if (type.includes("discovery") || outcome.includes("discovery")) discoveryCalls++;
    if (type.includes("proposal")) proposalCalls++;
    if (type.includes("inbound")) {
      inboundLeads++;
      if (outcome.includes("discovery") || outcome.includes("call")) {
        inboundToDiscovery++;
      }
    }
    if (outcome.includes("won") || outcome.includes("closed")) totalWon++;

    if (c.objections && c.objections.trim().length > 2 && topObjections.length < 8) {
      if (!topObjections.includes(c.objections.trim())) {
        topObjections.push(c.objections.trim());
      }
    }
  }

  // Reconcile with sheet/dashboard summary metrics if row-level flags were unpopulated
  if (input.summaryMetrics) {
    const sm = input.summaryMetrics;
    if (typeof sm.replies === "number" && sm.replies > 0 && totalReplies === 0 && totalProposalsSent > 0) {
      totalReplies = Math.min(totalProposalsSent, sm.replies);
    }
    if (typeof sm.interviews === "number" && sm.interviews > 0 && totalInterviews === 0 && totalProposalsSent > 0) {
      totalInterviews = Math.min(totalProposalsSent, sm.interviews);
    }
    if (typeof sm.won === "number" && sm.won > 0 && totalWon === 0 && totalProposalsSent > 0) {
      totalWon = Math.min(totalProposalsSent, sm.won);
    }
    if (typeof sm.introCalls === "number" && sm.introCalls > 0 && introCalls === 0) {
      introCalls = sm.introCalls;
    }
    if (typeof sm.discoveryCalls === "number" && sm.discoveryCalls > 0 && discoveryCalls === 0) {
      discoveryCalls = sm.discoveryCalls;
    }
    if (typeof sm.proposalCalls === "number" && sm.proposalCalls > 0 && proposalCalls === 0) {
      proposalCalls = sm.proposalCalls;
    }
    if (typeof sm.inboundLeads === "number" && sm.inboundLeads > 0 && inboundLeads === 0) {
      inboundLeads = sm.inboundLeads;
    }
  }

  // Conversion calculations
  const replyRate =
    totalProposalsSent > 0 ? (totalReplies / totalProposalsSent) * 100 : 0;
  const interviewRate =
    totalProposalsSent > 0 ? (totalInterviews / totalProposalsSent) * 100 : 0;
  const interviewToProjectRate =
    totalInterviews > 0 ? (totalWon / totalInterviews) * 100 : 0;
  const overallWinRate =
    totalProposalsSent > 0 ? (totalWon / totalProposalsSent) * 100 : 0;

  const totalCalls = inWindowCalls.length;
  const introToDiscoveryRate =
    introCalls > 0 ? (discoveryCalls / introCalls) * 100 : 0;
  const discoveryToProposalRate =
    discoveryCalls > 0 ? (proposalCalls / discoveryCalls) * 100 : 0;
  const proposalToProjectRate =
    proposalCalls > 0 ? (totalWon / proposalCalls) * 100 : 0;
  const overallCallConversionRate =
    totalCalls > 0 ? (totalWon / totalCalls) * 100 : 0;
  const inboundToDiscoveryRate =
    inboundLeads > 0 ? (inboundToDiscovery / inboundLeads) * 100 : 0;

  // Daily momentum & cadence
  const activeDaysCount = activeDatesSet.size;
  const totalDaysInWindow = window.daysCovered;
  const zeroActivityDaysCount = Math.max(0, totalDaysInWindow - activeDaysCount);
  const averageProposalsPerActiveDay =
    activeDaysCount > 0 ? totalProposalsSent / activeDaysCount : 0;
  const currentPaceProposalsPerDay = totalProposalsSent / totalDaysInWindow;
  const projected30DayProposals = Math.round(currentPaceProposalsPerDay * 30);

  // Weekly cohort breakdowns (divide window into 4 cohorts)
  const windowStart = new Date(window.startDate);
  const weeklyCohorts: CohortWeeklyMetrics[] = [];

  for (let w = 0; w < 4; w++) {
    const cohortStart = new Date(windowStart.getTime() + w * 7 * 86400000);
    const cohortEnd =
      w === 3
        ? new Date(window.endDate)
        : new Date(cohortStart.getTime() + 6 * 86400000);

    const cStartStr = cohortStart.toISOString().split("T")[0];
    const cEndStr = cohortEnd.toISOString().split("T")[0];
    const cStartMs = cohortStart.getTime();
    const cEndMs = new Date(cEndStr + "T23:59:59.999Z").getTime();

    const wProposals = inWindowProposals.filter((p) => {
      const nd = normalizeDate(p.date);
      if (!nd) return false;
      const ms = new Date(nd).getTime();
      return ms >= cStartMs && ms <= cEndMs;
    });

    const wCalls = inWindowCalls.filter((c) => {
      const nd = normalizeDate(c.date);
      if (!nd) return false;
      const ms = new Date(nd).getTime();
      return ms >= cStartMs && ms <= cEndMs;
    });

    const wSent = wProposals.length;
    let wRep = 0;
    let wInt = 0;
    let wWon = 0;
    for (const p of wProposals) {
      if (isTruthyMetric(p.reply)) wRep++;
      if (isTruthyMetric(p.interview)) wInt++;
      if (isTruthyMetric(p.won)) wWon++;
    }

    weeklyCohorts.push({
      weekLabel: w === 3 ? "Week 4 (Current Week)" : `Week ${w + 1}`,
      startDate: cStartStr,
      endDate: cEndStr,
      proposalsSent: wSent,
      replies: wRep,
      interviews: wInt,
      dealsWon: wWon,
      callsScheduled: wCalls.length,
      replyRate: wSent > 0 ? (wRep / wSent) * 100 : 0,
      interviewRate: wSent > 0 ? (wInt / wSent) * 100 : 0,
    });
  }

  const metrics: ThirtyDayAttackDeterministicMetrics = {
    totalProposalsSent,
    totalReplies,
    totalInterviews,
    totalWon,
    replyRate: Math.round(replyRate * 10) / 10,
    interviewRate: Math.round(interviewRate * 10) / 10,
    interviewToProjectRate: Math.round(interviewToProjectRate * 10) / 10,
    overallWinRate: Math.round(overallWinRate * 10) / 10,
    totalCalls,
    introCalls,
    discoveryCalls,
    proposalCalls,
    inboundLeads,
    introToDiscoveryRate: Math.round(introToDiscoveryRate * 10) / 10,
    discoveryToProposalRate: Math.round(discoveryToProposalRate * 10) / 10,
    proposalToProjectRate: Math.round(proposalToProjectRate * 10) / 10,
    overallCallConversionRate: Math.round(overallCallConversionRate * 10) / 10,
    inboundToDiscoveryRate: Math.round(inboundToDiscoveryRate * 10) / 10,
    activeDaysCount,
    totalDaysInWindow,
    zeroActivityDaysCount,
    averageProposalsPerActiveDay: Math.round(averageProposalsPerActiveDay * 10) / 10,
    currentPaceProposalsPerDay: Math.round(currentPaceProposalsPerDay * 10) / 10,
    projected30DayProposals,
    weeklyCohorts,
    topObjections,
    sampleRoles,
  };

  return { window, metrics };
}

/**
 * Builds the state string and questions for typesafe/jev evaluation
 */
export function buildJevAttackPrompt(
  window: AttackWindow,
  m: ThirtyDayAttackDeterministicMetrics,
  studentName?: string,
  notes?: string
): JevInput {
  const weeklySummary = m.weeklyCohorts
    .map(
      (w) =>
        `- ${w.weekLabel} (${w.startDate} to ${w.endDate}): ${w.proposalsSent} proposals, ${w.replies} replies (${w.replyRate}%), ${w.interviews} interviews, ${w.callsScheduled} calls, ${w.dealsWon} won`
    )
    .join("\n");

  const objectionsSummary =
    m.topObjections.length > 0
      ? m.topObjections.map((o) => `  * "${o}"`).join("\n")
      : "  * None explicitly logged in CRM calls.";

  const rolesSummary =
    m.sampleRoles.length > 0
      ? m.sampleRoles.map((r) => `  * ${r}`).join("\n")
      : "  * General freelancer / consulting roles";

  const state = `DATALUMINA FREELANCER 30-DAY ATTACK EVALUATION
Candidate / Student: ${studentName || "Freelance Student"}
Active 30-Day Window: ${window.startDate} to ${window.endDate} (Ending at Current Week)
Total Days in Window: ${window.daysCovered} days | Active Action Days: ${m.activeDaysCount} days | Dormant Days: ${m.zeroActivityDaysCount} days

PROPOSALS & OUTREACH FUNNEL:
- Total Proposals Sent: ${m.totalProposalsSent} (Target: 50-150 across 30 days)
- Total Replies: ${m.totalReplies} (Reply Rate: ${m.replyRate}% | Target: 10% - 30%)
- Total Interviews: ${m.totalInterviews} (Interview Rate: ${m.interviewRate}% | Target: 10% - 30%)
- Deals Won: ${m.totalWon} (Overall Win Rate: ${m.overallWinRate}% | Target: 20% - 40%)

CRM & PIPELINE CALLS:
- Total Calls Logged: ${m.totalCalls}
- Intro Calls: ${m.introCalls} | Discovery Calls: ${m.discoveryCalls} | Proposal Calls: ${m.proposalCalls}
- Inbound Leads: ${m.inboundLeads}
- Discovery Booking Rate: ${m.introToDiscoveryRate}%
- Closing / Proposal-to-Win Rate: ${m.proposalToProjectRate}%

WEEK-BY-WEEK COHORT PROGRESSION:
${weeklySummary}

DAILY CADENCE & VELOCITY:
- Daily Activity Pace: ${m.currentPaceProposalsPerDay} proposals/day (Need 1.7 - 5.0/day for 50-150 target)
- Active Day Density: ${m.averageProposalsPerActiveDay} proposals per active day
- Projected 30-Day Total: ${m.projected30DayProposals} proposals

ROLES TARGETED:
${rolesSummary}

RECORDED OBJECTIONS & OBSTACLES:
${objectionsSummary}

ADDITIONAL CONTEXT / STUDENT NOTES:
${notes || "No additional notes provided."}`;

  return {
    state,
    questions: {
      pipeline_health: {
        type: "score",
        instructions:
          "How healthy is the candidate's outreach volume and pipeline momentum compared to the 30-day target of 50-150 outreach contacts?",
        criteria: [
          "Critical Deficit: Under 15 proposals sent; pipeline starved of statistical volume",
          "Low Momentum: 15-35 proposals sent; insufficient pipeline velocity to ensure deal closing",
          "Developing: 35-50 proposals sent; approaching minimum viability but vulnerable to pipeline dry-up",
          "Strong Momentum: 50-100 proposals sent with regular active daily submissions",
          "Exceptional Pipeline: 100-150+ proposals sent with aggressive multi-channel pipeline density",
        ],
      },
      funnel_efficiency: {
        type: "score",
        instructions:
          "How efficiently does the candidate convert proposals into replies (target 10-30%) and interviews (target 10-30%)?",
        criteria: [
          "Severely Broken: <5% reply rate; proposals are being systematically ignored or rejected",
          "Below Benchmark: 5-9% reply rate; weak hooks, lack of credibility proof, or poor job targeting",
          "Benchmark Viable: 10-19% reply rate; meets Datalumina baseline with solid problem understanding",
          "High Conversion: 20-29% reply rate; crisp tailored hooks and compelling proof assets",
          "Elite Conversion: 30%+ reply rate; irresistible consultation offer and precise niche fit",
        ],
      },
      attack_discipline: {
        type: "score",
        instructions:
          "How disciplined is the candidate's daily execution consistency and avoidance of dormant periods across the 30-day attack?",
        criteria: [
          "Erratic: Long gaps of zero activity; binge outreach followed by multi-day abandonment",
          "Sporadic: Active only 1-2 days per week; lacking consistent daily business development habits",
          "Moderate: Active 3-4 days per week with recognizable effort but intermittent momentum drops",
          "Consistent: Active 5-6 days per week with steady daily proposal flow and rapid follow-ups",
          "Relentless: Daily discipline with zero dormant blocks, rapid CRM updates, and consistent outreach",
        ],
      },
      positioning_and_targeting: {
        type: "score",
        instructions:
          "How well calibrated is the student's positioning, job selection, and value proposition based on targeted roles and call outcomes?",
        criteria: [
          "Scattered: Applying to mismatched or generic low-value jobs without defined niche positioning",
          "Emerging: Targeting somewhat relevant roles but struggling to convey specialized authority",
          "Solid: Clearly focused on defined technical domains with relevant experience alignment",
          "Compelling: Well-differentiated specialist positioning commanding peer-to-peer advisory status",
          "Mastery: High-ticket consultative positioning with clear productized offers and objection mastery",
        ],
      },
      primary_bottleneck: {
        type: "choice",
        instructions:
          "What is the single most critical constraint holding back this student from closing high-ticket clients?",
        criteria: {
          outreach_volume_deficit:
            "Volume deficit: Not enough proposals or outreach messages are being sent to achieve mathematical deal closing",
          proposal_hook_copy:
            "Proposal hook & copy: Low reply rate indicates weak snippet hooks, generic boilerplate, or lack of proof",
          discovery_qualification:
            "Discovery call booking: Replies are generated but not converting into booked discovery/strategy calls",
          objection_handling_closing:
            "Objection handling & closing: Calls are taking place but stalling on price, scoping, or lack of closing confidence",
          erratic_cadence:
            "Inconsistent cadence: Momentum dies due to irregular activity and prolonged dormant days",
          lack_of_niche_focus:
            "Lack of niche focus: Applying to broad or disjointed roles instead of dominating one specialized offer",
        },
      },
      on_track_for_guarantee: {
        type: "noul",
        instructions:
          "Based on overall conversion metrics, volume trajectory, and discipline, is this student on track to fulfill the 30-day attack performance guarantee and secure client projects?",
        criteria: {
          true: "On track: Activity pace and conversion rates support landing paid client projects within the attack cycle",
          false:
            "At risk / Intervention required: Current pace or conversion bottlenecks will fail to produce closed projects without immediate adjustments",
        },
      },
    },
  };
}
