export type JevQuestionType = "choice" | "score" | "noul";

export interface ChoiceQuestion {
  type: "choice";
  instructions: string;
  criteria: Record<string, string>;
}

export interface ScoreQuestion {
  type: "score";
  instructions: string;
  criteria: string[];
}

export interface NoulQuestion {
  type: "noul";
  instructions: string;
  criteria: Record<string, string>;
}

export type JevQuestion = ChoiceQuestion | ScoreQuestion | NoulQuestion;

export interface JevInput {
  state: string | Record<string, unknown>;
  questions: Record<string, JevQuestion>;
}

export interface JevAnswer {
  type: JevQuestionType;
  choice?: string;
  confidence?: number;
  probabilities?: Record<string, number>;
  score?: number;
  legend?: Record<string, string>;
  noul?: number;
  answer?: boolean;
}

export interface JevResult {
  model: string;
  answers: Record<string, JevAnswer>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export interface JevResponse {
  state?: string;
  result?: JevResult;
  model?: string;
  answers?: Record<string, JevAnswer>;
  usage?: {
    input_tokens: number;
    output_tokens: number;
  };
  gatewayMetadata?: Record<string, unknown>;
}

export interface CreditStatus {
  allowed: boolean;
  tier: "public" | "vip" | "admin";
  remaining: number;
  limit: number;
  resetsInHours: number;
  globalRemaining: number;
  error?: string;
}

export interface Env {
  AI: {
    run(model: string, input: JevInput): Promise<JevResponse>;
  };
  USAGE_KV?: KVNamespace;
  PUBLIC_DAILY_LIMIT?: string;
  VIP_DAILY_LIMIT?: string;
  GLOBAL_DAILY_LIMIT?: string;
  VIP_PASSCODE?: string;
  ADMIN_KEY?: string;
  BUY_ME_COFFEE_URL?: string;
}

export interface ProposalRow {
  date: string;
  job: string;
  url?: string;
  proposal: boolean;
  reply: boolean;
  interview: boolean;
  won: boolean;
  notes?: string;
}

export interface CallRow {
  date: string;
  name: string;
  callType?: string; // "Introduction" | "Discovery" | "Proposal" | "Inbound" | string
  outcome?: string; // "Interview" | "Discovery Call" | "Lost" | "Won" | string
  whatWentWell?: string;
  areasForImprovement?: string;
  objections?: string;
  recordingLink?: string;
}

export interface SocialSellingRow {
  date: string;
  connectionsSent?: number;
  dmsSent?: number;
  positiveReplies?: number;
  callsBooked?: number;
  projectsWon?: number;
  notes?: string;
}

export type FocusStrategy = "omni" | "upwork" | "sales_crm" | "social_selling";

export interface UpworkMetrics {
  proposalsSent: number;
  replies: number;
  interviews: number;
  won: number;
  replyRate: number; // %
  interviewRate: number; // %
  interviewToProjectRate: number; // %
  overallWinRate: number; // %
}

export interface SalesCrmMetrics {
  totalCalls: number;
  introCalls: number;
  discoveryCalls: number;
  proposalCalls: number;
  inboundLeads: number;
  introToDiscoveryRate: number; // %
  discoveryToProposalRate: number; // %
  proposalToProjectRate: number; // %
  overallCallConversionRate: number; // %
  inboundToDiscoveryRate: number; // %
  topObjections: string[];
}

export interface SocialSellingMetrics {
  totalConnectionsSent: number;
  totalDmsSent: number;
  totalPositiveReplies: number;
  totalCallsBooked: number;
  totalProjectsWon: number;
  connectionToDmRate: number; // %
  dmToReplyRate: number; // %
  replyToCallRate: number; // %
  callToProjectRate: number; // %
}

export interface ConsolidatedPipelineMetrics {
  focusStrategy: FocusStrategy;
  activeChannels: {
    upwork: boolean;
    salesCrm: boolean;
    socialSelling: boolean;
  };
  totalOutboundVolume: number; // Proposals + DMs/Outreach + Connections
  totalEngagements: number; // Upwork Replies + Positive Social Replies + Inbound Leads
  totalQualifiedCalls: number; // Upwork Interviews + CRM Discovery/Calls + Social Calls
  totalDealsWon: number; // Upwork Won + CRM Won + Social Won
  overallCallBookingRate: number; // Qualified Calls / Outbound Volume %
  overallClosingRate: number; // Won Deals / Qualified Calls %
}

export interface AttackWindow {
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD (End of current week)
  daysCovered: number; // typically 30
  currentWeekNumber?: number;
  referenceDate: string; // Date used to anchor current week
}

export interface KpiBenchmarkTarget {
  category: string;
  kpiName: string;
  targetValue: string;
  minTarget?: number;
  maxTarget?: number;
  unit?: string;
  trackingFrequency: string;
  impactDescription: string;
}

export interface CohortWeeklyMetrics {
  weekLabel: string; // "Week 1", "Week 2", "Week 3", "Week 4 (Current)"
  startDate: string;
  endDate: string;
  proposalsSent: number;
  replies: number;
  interviews: number;
  dealsWon: number;
  callsScheduled: number;
  replyRate: number; // percentage 0-100
  interviewRate: number; // percentage 0-100
  socialConnections?: number;
  socialDms?: number;
  socialReplies?: number;
  socialCalls?: number;
}

export interface ThirtyDayAttackDeterministicMetrics {
  focusStrategy: FocusStrategy;
  activeChannels: {
    upwork: boolean;
    salesCrm: boolean;
    socialSelling: boolean;
  };
  channels: {
    upwork: UpworkMetrics;
    salesCrm: SalesCrmMetrics;
    socialSelling: SocialSellingMetrics;
  };
  consolidated: ConsolidatedPipelineMetrics;

  // Preserved backwards-compatible root metrics
  totalProposalsSent: number;
  totalReplies: number;
  totalInterviews: number;
  totalWon: number;
  replyRate: number; // %
  interviewRate: number; // %
  interviewToProjectRate: number; // %
  overallWinRate: number; // %
  
  totalCalls: number;
  introCalls: number;
  discoveryCalls: number;
  proposalCalls: number;
  inboundLeads: number;
  introToDiscoveryRate: number; // %
  discoveryToProposalRate: number; // %
  proposalToProjectRate: number; // %
  overallCallConversionRate: number; // %
  inboundToDiscoveryRate: number; // %

  activeDaysCount: number;
  totalDaysInWindow: number;
  zeroActivityDaysCount: number;
  averageProposalsPerActiveDay: number;
  currentPaceProposalsPerDay: number;
  projected30DayProposals: number;
  outboundDensityPerActiveDay?: number;
  currentPaceOutboundPerDay?: number;
  projected30DayOutbound?: number;
  cadenceUnit?: string;
  isMonthlyAggregate?: boolean;

  weeklyCohorts: CohortWeeklyMetrics[];
  topObjections: string[];
  sampleRoles: string[];
}

export interface ThirtyDayAttackInput {
  proposals?: ProposalRow[];
  calls?: CallRow[];
  socialSelling?: SocialSellingRow[];
  focusStrategy?: FocusStrategy;
  customTargets?: Partial<Record<string, number>>;
  windowOverride?: {
    startDate?: string;
    endDate?: string;
  };
  studentName?: string;
  notes?: string;
  summaryMetrics?: {
    proposals?: number;
    replies?: number;
    interviews?: number;
    won?: number;
    calls?: number;
    introCalls?: number;
    discoveryCalls?: number;
    proposalCalls?: number;
    inboundLeads?: number;
    socialConnections?: number;
    socialDms?: number;
    socialReplies?: number;
    socialCalls?: number;
    socialWon?: number;
  };
}

export interface ThirtyDayAttackResult {
  window: AttackWindow;
  deterministicMetrics: ThirtyDayAttackDeterministicMetrics;
  jevEvaluation: JevResponse;
}

