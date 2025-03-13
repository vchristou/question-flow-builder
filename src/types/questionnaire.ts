
export interface QuestionOption {
  Id: number;
  AnswerId: number;
  Answer: string;
  Action: "GoToQuestion" | "GoToUrl";
  GoToQuestionId: number;
  FilterQueryStringKey: string;
  FilterQueryStringValue: string;
}

export interface Question {
  Id: number;
  Question: string;
  QuestionSelectType: number; // 0 for radio, 1 for checkbox
  IsOptional: boolean;
  Options: QuestionOption[];
}

export interface QuestionsResponse {
  Data: Question[];
}

export interface UserSelection {
  questionId: number;
  selectedOptions: QuestionOption[];
}

export interface UserSelectionHistory {
  [questionId: number]: QuestionOption[];
}
