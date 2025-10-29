export enum QuestionType {
  MCQ = "MCQ",
  Integer = "Integer",
}

export interface IntegerQuestion {
  type: QuestionType.Integer;
  question: string;
  correct_answer: number;
}

export interface MCQ {
  type: QuestionType.MCQ;
  question: string;
  options: string[];
  correct_answer: string;
}

export type Question = IntegerQuestion | MCQ;

export interface Section {
  title: string;
  questions: Question[];
}
