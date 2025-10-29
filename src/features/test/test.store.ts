import { create } from "zustand";
import { persist } from "zustand/middleware";
import { QuizState, initialQuizState } from "@/features/test/test.model";
import {
  QuizActions,
  createQuizController,
} from "@/features/test/test.controller";

export const useQuizStore = create(
  persist<QuizState & QuizActions>(
    (...a) => ({
      ...initialQuizState,
      ...createQuizController(...a),
    }),
    {
      name: "quiz-session-storage",
      onRehydrateStorage: (state) => {
        return (state, error) => {
          if (state) state.rehydrateTime();
        };
      },
    }
  )
);
