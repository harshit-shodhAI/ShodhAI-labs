import { questions as allQuestions } from "@/data/questions";
import { StateCreator } from "zustand";
import {
  QuizState,
  QuizStatus,
  Answers,
  QUIZ_DURATION_MINUTES,
} from "./test.model";

export const calculateScore = (answers: Answers): number => {
  let score = 0;
  allQuestions.forEach((question, index) => {
    const candidateAnswer = answers[index];
    if (candidateAnswer === undefined || candidateAnswer === "") return;

    if (candidateAnswer == question.correct_answer) {
      score++;
    }
  });
  return score;
};

export interface QuizActions {
  startQuiz: () => void;
  setAnswer: (questionIndex: number, answer: string | number) => void;
  tick: () => void;
  nextSection: () => void;
  prevSection: () => void;
  submitQuiz: (options: {
    onSuccess: (score: number) => void;
    onError: (error: string) => void;
  }) => Promise<void>;
  rehydrateTime: () => void;
}

export const createQuizController: StateCreator<
  QuizState & QuizActions,
  [],
  [],
  QuizActions
> = (set, get) => ({
  startQuiz: () => {
    set({
      status: QuizStatus.IN_PROGRESS,
      startTime: Date.now(),
    });
  },

  setAnswer: (questionIndex, answer) => {
    set((state) => ({
      answers: { ...state.answers, [questionIndex]: answer },
    }));
  },

  tick: () => {
    const { timeLeft } = get();
    if (timeLeft > 0) {
      set({ timeLeft: timeLeft - 1 });
    }
  },

  nextSection: () => {
    set((state) => ({
      currentSectionIndex: Math.min(state.currentSectionIndex + 1, 4),
    }));
  },

  prevSection: () => {
    set((state) => ({
      currentSectionIndex: Math.max(state.currentSectionIndex - 1, 0),
    }));
  },

  rehydrateTime: () => {
    const { startTime, status } = get();
    if (status === QuizStatus.IN_PROGRESS && startTime) {
      const timeElapsed = Math.floor((Date.now() - startTime) / 1000);
      const newTimeLeft = Math.max(0, QUIZ_DURATION_MINUTES * 60 - timeElapsed);
      set({ timeLeft: newTimeLeft });
    }
  },

  submitQuiz: async ({ onSuccess, onError }) => {
    const { answers } = get();
    const score = calculateScore(answers);

    try {
      set({ status: QuizStatus.SUBMITTED, timeLeft: 0 });
      console.log("Quiz submitted. Score:", score);
      onSuccess(score);
    } catch (error) {
      console.error("Submission failed:", error);
      onError("Submission failed");
    }
  },
});
