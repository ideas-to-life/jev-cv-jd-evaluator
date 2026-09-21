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
