import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  ApplicationFormState,
  initialApplicationFormState,
} from "@/features/application/application.model";
import {
  ApplicationFormActions,
  createApplicationFormController,
} from "@/features/application/application.controller";

export const useApplicationFormStore = create(
  persist<ApplicationFormState & ApplicationFormActions>(
    (...a) => ({
      ...initialApplicationFormState,
      ...createApplicationFormController(...a),
    }),
    {
      name: "applicationFormData",
      partialize: (state) => ({
        ...state,
        form: {
          ...state.form,
          documents: {
            ...state.form.documents,
            resume: null,
          },
        },
      }),
    }
  )
);
