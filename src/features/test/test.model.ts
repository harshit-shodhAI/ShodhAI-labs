export enum QuizStatus {
  NOT_STARTED = "NOT_STARTED",
  IN_PROGRESS = "IN_PROGRESS",
  SUBMITTED = "SUBMITTED",
}

export type Answers = {
  [questionIndex: number]: string | number;
};

export interface QuizState {
  status: QuizStatus;
  answers: Answers;
  timeLeft: number;
  startTime: number | null;
  currentSectionIndex: number;
}

export const QUIZ_DURATION_MINUTES = 30;
export const initialQuizState: QuizState = {
  status: QuizStatus.NOT_STARTED,
  answers: {},
  timeLeft: QUIZ_DURATION_MINUTES * 60,
  startTime: null,
  currentSectionIndex: 0,
};
