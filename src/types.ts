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
  answer?: boolean;
}

export interface JevResponse {
  model: string;
  answers: Record<string, JevAnswer>;
  usage: {
    input_tokens: number;
    output_tokens: number;
  };
}

export interface Env {
  AI: {
    run(model: string, input: JevInput): Promise<JevResponse>;
  };
}
