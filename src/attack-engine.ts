import {
  ProposalRow,
  CallRow,
  SocialSellingRow,
  FocusStrategy,
  UpworkMetrics,
  SalesCrmMetrics,
  SocialSellingMetrics,
  ConsolidatedPipelineMetrics,
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
export function normalizeDate(dateVal: unknown, sheetContext?: string): string | null {
  if (dateVal === null || dateVal === undefined || dateVal === "") return null;

  // 1. Date object (native or SheetJS parsed)
  if (dateVal instanceof Date || (typeof dateVal === "object" && typeof (dateVal as Date).getTime === "function")) {
    const d = dateVal as Date;
    if (!isNaN(d.getTime())) {
      const y = d.getFullYear();
      const m = String(d.getMonth() + 1).padStart(2, "0");
      const day = String(d.getDate()).padStart(2, "0");
      return `${y}-${m}-${day}`;
    }
  }

  // 2. Numeric / Excel serial timestamp or day-of-month
  const num = typeof dateVal === "number"
    ? dateVal
    : (typeof dateVal === "string" && /^\d+(\.\d+)?$/.test(dateVal.trim()) ? Number(dateVal.trim()) : NaN);

  if (!isNaN(num)) {
    // Excel serial dates (approx 1982 to 2078)
    if (num >= 30000 && num <= 65000) {
      const excelEpoch = new Date(Date.UTC(1899, 11, 30));
      const jsDate = new Date(excelEpoch.getTime() + Math.floor(num) * 86400000);
      if (!isNaN(jsDate.getTime())) {
        return jsDate.toISOString().split("T")[0];
      }
    }
    // Day of month (1-31) within a monthly sheet context (e.g. September)
    if (num >= 1 && num <= 31) {
      const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
      const sLower = (sheetContext || "").toLowerCase();
      let mIdx = monthNames.findIndex(m => sLower.includes(m));
      if (mIdx === -1) mIdx = 8; // Default to September if context not specified
      const yrMatch = sLower.match(/\b(202\d)\b/);
      const yr = yrMatch ? yrMatch[1] : "2026";
      const mStr = String(mIdx + 1).padStart(2, "0");
      const dStr = String(Math.floor(num)).padStart(2, "0");
      return `${yr}-${mStr}-${dStr}`;
    }
  }

  const str = String(dateVal).trim();
  if (!str) return null;

  // 3. YYYY-MM-DD
  if (/^\d{4}-\d{2}-\d{2}$/.test(str)) {
    return str;
  }

  // 4. DD/MM/YYYY, MM/DD/YYYY, DD-MM-YYYY, DD.MM.YYYY
  const delimMatch = str.match(/^(\d{1,2})[\/\-\.](\d{1,2})[\/\-\.](\d{4})$/);
  if (delimMatch) {
    const p1 = parseInt(delimMatch[1], 10);
    const p2 = parseInt(delimMatch[2], 10);
    const y = parseInt(delimMatch[3], 10);
    let day = p1;
    let month = p2;
    if (p2 > 12 && p1 <= 12) {
      month = p1;
      day = p2;
    }
    const dStr = String(day).padStart(2, "0");
    const mStr = String(month).padStart(2, "0");
    return `${y}-${mStr}-${dStr}`;
  }

  // 5. D-Mon-YYYY or D-Mon (e.g. 9-Sep-2026, 9-Sep)
  const monthNames = ["jan", "feb", "mar", "apr", "may", "jun", "jul", "aug", "sep", "oct", "nov", "dec"];
  const dMonMatch = str.match(/^(\d{1,2})[\/\-\.\s]+([a-zA-Z]{3,9})(?:[\/\-\.\s]+(\d{4}))?$/);
  if (dMonMatch) {
    const day = parseInt(dMonMatch[1], 10);
    const mName = dMonMatch[2].toLowerCase();
    const mIdx = monthNames.findIndex(m => mName.startsWith(m));
    const yr = dMonMatch[3] || "2026";
    if (mIdx >= 0 && day >= 1 && day <= 31) {
      return `${yr}-${String(mIdx + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
    }
  }

  // 6. Match 3-letter or full month name (e.g. "Jan", "Feb", "Sep", "September", etc.)
  const lower = str.toLowerCase();
  const mMatch = monthNames.findIndex(m => lower === m || lower.startsWith(m));
  if (mMatch >= 0 && str.length <= 15) {
    const monthNum = String(mMatch + 1).padStart(2, "0");
    const yMatch = str.match(/\b(202\d)\b/);
    const yr = yMatch ? yMatch[1] : "2026";
    return `${yr}-${monthNum}-15`;
  }

  // 7. General JS parse attempt (only accept realistic calendar years 2000-2050)
  const parsed = new Date(str);
  if (!isNaN(parsed.getTime())) {
    const y = parsed.getFullYear();
    if (y >= 2000 && y <= 2050) {
      const m = String(parsed.getMonth() + 1).padStart(2, "0");
      const d = String(parsed.getDate()).padStart(2, "0");
      return `${y}-${m}-${d}`;
    }
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
  socialSelling?: SocialSellingRow[],
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

  // Find latest recorded activity date across all proposals, calls, and socialSelling
  const allDates: string[] = [];
  for (const p of proposals) {
    const nd = normalizeDate(p.date);
    if (nd) allDates.push(nd);
  }
  for (const c of calls) {
    const nd = normalizeDate(c.date);
    if (nd) allDates.push(nd);
  }
  if (socialSelling) {
    for (const s of socialSelling) {
      const nd = normalizeDate(s.date);
      if (nd) allDates.push(nd);
    }
  }

  let refDateStr = new Date().toISOString().split("T")[0];
  if (allDates.length > 0) {
    allDates.sort();
    refDateStr = allDates[allDates.length - 1];
  }

  const [ry, rm, rd] = refDateStr.split("-").map((n) => parseInt(n, 10));
  const refDate = new Date(Date.UTC(ry, rm - 1, rd));

  // Compute end of current week (Sunday)
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
    input.socialSelling || [],
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

  const inWindowSocial = (input.socialSelling || []).filter((s) => {
    const nd = normalizeDate(s.date);
    if (!nd) return false;
    const ms = new Date(nd).getTime();
    return ms >= startMs && ms <= endMs;
  });

  // Funnel counts (Upwork)
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

  // Call breakdown (CRM)
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

  // Social Selling breakdown
  let totalConnectionsSent = 0;
  let totalDmsSent = 0;
  let totalPositiveReplies = 0;
  let totalCallsBooked = 0;
  let totalSocialWon = 0;

  for (const s of inWindowSocial) {
    const nd = normalizeDate(s.date);
    if (nd) activeDatesSet.add(nd);
    totalConnectionsSent += Number(s.connectionsSent) || 0;
    totalDmsSent += Number(s.dmsSent) || 0;
    totalPositiveReplies += Number(s.positiveReplies) || 0;
    totalCallsBooked += Number(s.callsBooked) || 0;
    totalSocialWon += Number(s.projectsWon) || 0;
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
    if (typeof sm.socialConnections === "number" && sm.socialConnections > 0 && totalConnectionsSent === 0) {
      totalConnectionsSent = sm.socialConnections;
    }
    if (typeof sm.socialDms === "number" && sm.socialDms > 0 && totalDmsSent === 0) {
      totalDmsSent = sm.socialDms;
    }
    if (typeof sm.socialReplies === "number" && sm.socialReplies > 0 && totalPositiveReplies === 0) {
      totalPositiveReplies = sm.socialReplies;
    }
    if (typeof sm.socialCalls === "number" && sm.socialCalls > 0 && totalCallsBooked === 0) {
      totalCallsBooked = sm.socialCalls;
    }
    if (typeof sm.socialWon === "number" && sm.socialWon > 0 && totalSocialWon === 0) {
      totalSocialWon = sm.socialWon;
    }
  }

  // Upwork Conversion calculations
  const replyRate =
    totalProposalsSent > 0 ? (totalReplies / totalProposalsSent) * 100 : 0;
  const interviewRate =
    totalProposalsSent > 0 ? (totalInterviews / totalProposalsSent) * 100 : 0;
  const interviewToProjectRate =
    totalInterviews > 0 ? (totalWon / totalInterviews) * 100 : 0;
  const overallWinRate =
    totalProposalsSent > 0 ? (totalWon / totalProposalsSent) * 100 : 0;

  const upworkMetrics: UpworkMetrics = {
    proposalsSent: totalProposalsSent,
    replies: totalReplies,
    interviews: totalInterviews,
    won: totalWon,
    replyRate: Math.round(replyRate * 10) / 10,
    interviewRate: Math.round(interviewRate * 10) / 10,
    interviewToProjectRate: Math.round(interviewToProjectRate * 10) / 10,
    overallWinRate: Math.round(overallWinRate * 10) / 10,
  };

  // CRM Conversion calculations
  const totalCalls = Math.max(
    inWindowCalls.length,
    typeof input.summaryMetrics?.calls === "number" ? input.summaryMetrics.calls : 0,
    introCalls + discoveryCalls + proposalCalls
  );
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

  const salesCrmMetrics: SalesCrmMetrics = {
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
    topObjections,
  };

  // Social Selling Conversion calculations
  const connectionToDmRate =
    totalConnectionsSent > 0 ? (totalDmsSent / totalConnectionsSent) * 100 : 0;
  const dmToReplyRate =
    totalDmsSent > 0 ? (totalPositiveReplies / totalDmsSent) * 100 : 0;
  const replyToCallRate =
    totalPositiveReplies > 0 ? (totalCallsBooked / totalPositiveReplies) * 100 : 0;
  const callToProjectRate =
    totalCallsBooked > 0 ? (totalSocialWon / totalCallsBooked) * 100 : 0;

  const socialSellingMetrics: SocialSellingMetrics = {
    totalConnectionsSent,
    totalDmsSent,
    totalPositiveReplies,
    totalCallsBooked,
    totalProjectsWon: totalSocialWon,
    connectionToDmRate: Math.round(connectionToDmRate * 10) / 10,
    dmToReplyRate: Math.round(dmToReplyRate * 10) / 10,
    replyToCallRate: Math.round(replyToCallRate * 10) / 10,
    callToProjectRate: Math.round(callToProjectRate * 10) / 10,
  };

  // Active channel detection & Focus Strategy resolution
  const hasUpwork = totalProposalsSent > 0 || inWindowProposals.length > 0;
  const hasCrm = totalCalls > 0 || inWindowCalls.length > 0;
  const hasSocial =
    totalConnectionsSent > 0 || totalDmsSent > 0 || inWindowSocial.length > 0;

  const activeChannels = {
    upwork: hasUpwork,
    salesCrm: hasCrm,
    socialSelling: hasSocial,
  };

  let focusStrategy: FocusStrategy = input.focusStrategy || "omni";
  if (!input.focusStrategy) {
    const activeCount =
      (hasUpwork ? 1 : 0) + (hasCrm ? 1 : 0) + (hasSocial ? 1 : 0);
    if (activeCount === 1) {
      if (hasUpwork) focusStrategy = "upwork";
      else if (hasCrm) focusStrategy = "sales_crm";
      else if (hasSocial) focusStrategy = "social_selling";
    } else {
      focusStrategy = "omni";
    }
  }

  // Consolidated Pipeline Totals
  const totalOutboundVolume =
    totalProposalsSent + totalConnectionsSent + totalDmsSent + introCalls + inboundLeads;
  const totalEngagements = totalReplies + totalPositiveReplies + inboundLeads;
  const totalQualifiedCalls = totalInterviews + discoveryCalls + totalCallsBooked;
  const totalDealsWon = totalWon + totalSocialWon;
  const overallCallBookingRate =
    totalOutboundVolume > 0 ? (totalQualifiedCalls / totalOutboundVolume) * 100 : 0;
  const overallClosingRate =
    totalQualifiedCalls > 0 ? (totalDealsWon / totalQualifiedCalls) * 100 : 0;

  const consolidated: ConsolidatedPipelineMetrics = {
    focusStrategy,
    activeChannels,
    totalOutboundVolume,
    totalEngagements,
    totalQualifiedCalls,
    totalDealsWon,
    overallCallBookingRate: Math.round(overallCallBookingRate * 10) / 10,
    overallClosingRate: Math.round(overallClosingRate * 10) / 10,
  };

  // Daily momentum & cadence
  const activeDaysCount = activeDatesSet.size;
  const totalDaysInWindow = window.daysCovered;
  const zeroActivityDaysCount = Math.max(0, totalDaysInWindow - activeDaysCount);
  const averageProposalsPerActiveDay =
    activeDaysCount > 0 ? totalProposalsSent / activeDaysCount : 0;
  const currentPaceProposalsPerDay = totalProposalsSent / totalDaysInWindow;
  const projected30DayProposals = Math.round(currentPaceProposalsPerDay * 30);

  // Channel-aware outbound cadence
  // If activity is logged as a monthly summary (e.g. 1 entry with high volume like 86 DMs),
  // flag it as monthly aggregate so the UI does not unfairly treat it as 1 day of work and 29 dormant days.
  const isMonthlyAggregate = activeDaysCount <= 2 && totalOutboundVolume >= 15;

  let cadenceUnit = "proposals";
  let primaryOutbound = totalProposalsSent;

  if (focusStrategy === "social_selling") {
    cadenceUnit = totalDmsSent > 0 ? "DMs" : "outreach";
    primaryOutbound = totalDmsSent > 0 ? totalDmsSent : totalConnectionsSent;
  } else if (focusStrategy === "sales_crm") {
    cadenceUnit = "calls";
    primaryOutbound = introCalls + inboundLeads + discoveryCalls;
  } else if (focusStrategy === "omni") {
    cadenceUnit = "actions";
    primaryOutbound = totalOutboundVolume;
  }

  const effectiveActiveDays = isMonthlyAggregate ? 20 : activeDaysCount;
  const outboundDensityPerActiveDay = effectiveActiveDays > 0
    ? Math.round((primaryOutbound / effectiveActiveDays) * 10) / 10
    : 0;
  const currentPaceOutboundPerDay = Math.round((primaryOutbound / totalDaysInWindow) * 10) / 10;
  const projected30DayOutbound = isMonthlyAggregate
    ? primaryOutbound
    : Math.round(currentPaceOutboundPerDay * 30);

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

    const wSocial = inWindowSocial.filter((s) => {
      const nd = normalizeDate(s.date);
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

    const wConn = wSocial.reduce((sum, s) => sum + (Number(s.connectionsSent) || 0), 0);
    const wDms = wSocial.reduce((sum, s) => sum + (Number(s.dmsSent) || 0), 0);
    const wSocReplies = wSocial.reduce((sum, s) => sum + (Number(s.positiveReplies) || 0), 0);
    const wSocCalls = wSocial.reduce((sum, s) => sum + (Number(s.callsBooked) || 0), 0);
    const wSocWon = wSocial.reduce((sum, s) => sum + (Number(s.projectsWon) || 0), 0);

    const totalWeekOutbound = wSent + wDms;
    const totalWeekReplies = wRep + wSocReplies;
    const weeklyReplyRate = totalWeekOutbound > 0
      ? (totalWeekReplies / totalWeekOutbound) * 100
      : (wSent > 0 ? (wRep / wSent) * 100 : 0);

    weeklyCohorts.push({
      weekLabel: w === 3 ? "Week 4 (Current Week)" : `Week ${w + 1}`,
      startDate: cStartStr,
      endDate: cEndStr,
      proposalsSent: wSent,
      replies: wRep,
      interviews: wInt,
      dealsWon: wWon + wSocWon,
      callsScheduled: wCalls.length + wSocCalls,
      replyRate: Math.round(weeklyReplyRate * 10) / 10,
      interviewRate: wSent > 0 ? Math.round((wInt / wSent) * 1000) / 10 : 0,
      socialConnections: wConn,
      socialDms: wDms,
      socialReplies: wSocReplies,
      socialCalls: wSocCalls,
    });
  }

  const metrics: ThirtyDayAttackDeterministicMetrics = {
    focusStrategy,
    activeChannels,
    channels: {
      upwork: upworkMetrics,
      salesCrm: salesCrmMetrics,
      socialSelling: socialSellingMetrics,
    },
    consolidated,
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
    outboundDensityPerActiveDay,
    currentPaceOutboundPerDay,
    projected30DayOutbound,
    cadenceUnit,
    isMonthlyAggregate,
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
        `- ${w.weekLabel} (${w.startDate} to ${w.endDate}): ${w.proposalsSent} Upwork proposals (${w.replies} replies, ${w.interviews} interviews), ${w.socialConnections || 0} social connections, ${w.socialDms || 0} DMs, ${w.callsScheduled} total calls/meetings, ${w.dealsWon} won`
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

  const activeChannelsList = Object.entries(m.activeChannels)
    .filter(([, v]) => v)
    .map(([k]) => k.replace(/([A-Z])/g, " $1").toUpperCase())
    .join(", ") || "NONE DETECTED";

  const state = `DATALUMINA FREELANCER 30-DAY ATTACK EVALUATION
Candidate / Student: ${studentName || "Freelance Student"}
Active 30-Day Window: ${window.startDate} to ${window.endDate} (Ending at Current Week)
Total Days in Window: ${window.daysCovered} days | Active Action Days: ${m.activeDaysCount} days | Dormant Days: ${m.zeroActivityDaysCount} days
Declared Focus Strategy: ${m.focusStrategy.toUpperCase()} (Active Channels: ${activeChannelsList})

CONSOLIDATED OMNI-CHANNEL PIPELINE:
- Total Outbound Volume: ${m.consolidated.totalOutboundVolume} (Proposals + Connections + Direct Outreach)
- Total Engagements: ${m.consolidated.totalEngagements} (Upwork Replies + Positive Social Replies + Inbound Leads)
- Total Qualified Calls Booked: ${m.consolidated.totalQualifiedCalls} (Upwork Interviews + Discovery Calls + Social Calls)
- Total Deals / Projects Won: ${m.consolidated.totalDealsWon}
- Overall Qualified Call Booking Rate: ${m.consolidated.overallCallBookingRate}%
- Overall Closing Rate: ${m.consolidated.overallClosingRate}%

CHANNEL 1: UPWORK TRACKER
- Proposals Sent: ${m.channels.upwork.proposalsSent} (Target: ${m.focusStrategy === 'upwork' ? '50-150' : '20-50'} across 30 days)
- Replies: ${m.channels.upwork.replies} (${m.channels.upwork.replyRate}% | Target: 10%-30%)
- Interviews: ${m.channels.upwork.interviews} (${m.channels.upwork.interviewRate}% | Target: 10%-30%)
- Closed Won: ${m.channels.upwork.won} (${m.channels.upwork.overallWinRate}% | Target: 20%-40%)

CHANNEL 2: DIRECT SALES & CRM TRACKER
- Total Calls: ${m.channels.salesCrm.totalCalls} | Intro Calls: ${m.channels.salesCrm.introCalls} | Discovery Calls: ${m.channels.salesCrm.discoveryCalls}
- Proposal Calls: ${m.channels.salesCrm.proposalCalls} | Inbound Leads: ${m.channels.salesCrm.inboundLeads}
- Discovery Conversion Rate: ${m.channels.salesCrm.introToDiscoveryRate}%
- Call-to-Project Conversion Rate: ${m.channels.salesCrm.overallCallConversionRate}%

CHANNEL 3: SOCIAL SELLING TRACKER
- Connections Sent: ${m.channels.socialSelling.totalConnectionsSent} (Target: ${m.focusStrategy === 'social_selling' ? '50-150' : '20-50'})
- DMs Sent: ${m.channels.socialSelling.totalDmsSent} (Connection-to-DM Rate: ${m.channels.socialSelling.connectionToDmRate}%)
- Positive Replies: ${m.channels.socialSelling.totalPositiveReplies} (DM-to-Reply Rate: ${m.channels.socialSelling.dmToReplyRate}% | Target: 15%-35%)
- Calls Booked from Social: ${m.channels.socialSelling.totalCallsBooked} (Reply-to-Call Rate: ${m.channels.socialSelling.replyToCallRate}% | Target: 20%-40%)
- Projects Won: ${m.channels.socialSelling.totalProjectsWon}

WEEK-BY-WEEK COHORT PROGRESSION:
${weeklySummary}

DAILY CADENCE & VELOCITY:
- Total Active Days: ${m.activeDaysCount} of ${m.totalDaysInWindow}
- Daily Outbound Activity Pace: ${m.currentPaceProposalsPerDay} / day
- Projected 30-Day Outbound Pace: ${m.projected30DayProposals}

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
          "How healthy is the candidate's outreach volume and pipeline momentum across their active channels compared to Datalumina 30-day benchmarks?",
        criteria: [
          "Critical Deficit: Very low activity across all channels; pipeline starved of statistical volume",
          "Low Momentum: Insufficient pipeline velocity to guarantee deal closing in their chosen focus",
          "Developing: Moderate outreach approaching minimum viability but vulnerable to pipeline dry-up",
          "Strong Momentum: Regular active daily submissions meeting benchmark expectations for their focus channel(s)",
          "Exceptional Pipeline: Aggressive multi-channel pipeline density generating abundant qualified opportunities",
        ],
      },
      funnel_efficiency: {
        type: "score",
        instructions:
          "How efficiently does the candidate convert outreach into positive responses and discovery/strategy calls across active channels?",
        criteria: [
          "Severely Broken: <5% response rate; outreach is systematically ignored or rejected across channels",
          "Below Benchmark: 5-9% response rate; weak hooks, lack of credibility proof, or poor audience targeting",
          "Benchmark Viable: Meets Datalumina baselines with solid problem understanding and relevant conversation starters",
          "High Conversion: Crisp tailored hooks and compelling proof assets driving frequent strategy calls",
          "Elite Conversion: Irresistible consultation offer, high positive reply rate, and rapid conversion to booked calls",
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
          "Consistent: Active 5-6 days per week with steady daily prospecting flow and rapid follow-ups",
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
          "What is the single most critical constraint holding back this student across their active channels from securing high-ticket clients?",
        criteria: {
          outreach_volume_deficit:
            "Volume deficit: Total outbound volume across active channels is insufficient to generate qualified calls",
          proposal_hook_copy:
            "Proposal hook & copy: Low Upwork reply rate indicates weak snippet hooks, generic boilerplate, or lack of proof",
          social_dm_conversion:
            "Social DM conversion: Connections or DMs are not converting into positive conversations or booked discovery calls",
          discovery_qualification:
            "Discovery call booking: Inbound leads or positive replies stall before booking a qualified strategy call",
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
          "Based on overall conversion metrics, volume trajectory, and discipline across active channels, is this student on track to fulfill the 30-day attack performance guarantee and secure client projects?",
        criteria: {
          true: "On track: Activity pace and conversion rates support landing paid client projects within the attack cycle",
          false:
            "At risk / Intervention required: Current pace or conversion bottlenecks will fail to produce closed projects without immediate adjustments",
        },
      },
    },
  };
}
