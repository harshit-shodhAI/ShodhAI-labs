import { StateCreator } from "zustand";
import { toast } from "react-toastify";
import {
  ApplicationFormState,
  FormStep,
  initialApplicationFormState,
  FormErrors,
} from "@/features/application/application.model";
import { submitApplication as submitApplicationService } from "@/services/application.service";

const validateForm = (form: ApplicationFormState["form"]): FormErrors => {
  const errors: FormErrors = {};
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // --- Section 1: Basic Details Validation ---
  if (!form.basicDetails.firstName.trim())
    errors.firstName = "First name is required.";
  if (!form.basicDetails.lastName.trim())
    errors.lastName = "Last name is required.";
  if (!form.basicDetails.email.trim()) {
    errors.email = "Email is required.";
  } else if (!emailRegex.test(form.basicDetails.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!form.basicDetails.phone.trim())
    errors.phone = "Phone number is required.";
  if (!form.basicDetails.city.trim()) errors.city = "City is required.";
  if (!form.basicDetails.country.trim())
    errors.country = "Country is required.";
  if (!form.basicDetails.dob) errors.dob = "Date of birth is required.";
  if (!form.basicDetails.nationality.trim())
    errors.nationality = "Nationality is required.";

  // --- Section 2: Project Selection Validation ---
  if (!form.projectSelection.firstChoiceProject) {
    errors.firstChoiceProject = "Please select your first choice project.";
  }

  // --- Section 3: Education Validation ---
  if (!form.education.institution.trim())
    errors.institution = "Institution name is required.";
  if (!form.education.degreeProgram.trim())
    errors.degreeProgram = "Degree program is required.";
  if (!form.education.yearOfStudy.trim())
    errors.yearOfStudy = "Year of study is required.";
  if (!form.education.currentGrade.trim())
    errors.currentGrade = "Current grade is required.";
  if (!form.education.graduationDate)
    errors.graduationDate = "Expected graduation date is required.";

  // --- Section 4: Experience Validation ---
  if (!form.experience.skills.trim()) errors.skills = "Skills are required.";

  // --- Section 5: Documents Validation ---
  if (!form.documents.resume)
    errors.resume = "A resume file (PDF) is required.";
  if (!form.documents.coverLetter.trim())
    errors.coverLetter = "A cover letter is required.";

  return errors;
};

export interface ApplicationFormActions {
  handleChange: (
    section: keyof ApplicationFormState["form"],
    name: string,
    value: string
  ) => void;
  handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  setScore: (score: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetForm: () => void;
  validateAndSave: () => boolean;
  submitApplication: () => Promise<void>;
  setShowResumeUploadModal: (isOpen: boolean) => void;
}

export const createApplicationFormController: StateCreator<
  ApplicationFormState & ApplicationFormActions,
  [],
  [],
  ApplicationFormActions
> = (set, get) => ({
  handleChange: (section, name, value) => {
    set((state) => ({
      form: {
        ...state.form,
        [section]: { ...state.form[section], [name]: value },
      },
    }));
  },

  handleFileChange: (e) => {
    const file = e.target.files?.[0] || null;
    if (file && file.size > 512 * 1024) {
      console.error("File size exceeds 512 KB");
      return;
    }
    set((state) => ({
      form: {
        ...state.form,
        documents: { ...state.form.documents, resume: file },
      },
    }));
  },

  setScore: (score: number) => {
    set({ score });
  },

  nextStep: () => {
    set((state) => ({
      currentStep: Math.min(state.currentStep + 1, FormStep.DOCUMENTS),
    }));
  },

  prevStep: () => {
    set((state) => ({
      currentStep: Math.max(state.currentStep - 1, FormStep.BASIC_DETAILS),
    }));
  },

  resetForm: () => {
    set(initialApplicationFormState);
  },

  validateAndSave: () => {
    const state = get();
    const errors = validateForm(state.form);

    set({ errors });

    const isValid = Object.keys(errors).length === 0;
    return isValid;
  },
  submitApplication: async () => {
    const { form, score } = get();
    if (score === null) {
      toast.error("Quiz score is missing. Please complete the quiz first.");
      return;
    }

    // 2. Set Submitting State
    set({ isSubmitting: true });

    try {
      // 3. Call the Service
      const [success, error] = await submitApplicationService(form, score);

      // 4. Handle the service's response
      if (error) {
        // A. Check for the specific, recoverable "missing resume" error
        if (error.includes("Resume file is missing")) {
          // Update the state to trigger the UI popup
          set({ showResumeUploadModal: true });
        } else {
          // B. Handle all other unrecoverable errors with a toast
          toast.error(error);
        }
      } else if (success) {
        // C. Handle the success case
        console.log("Submission successful:", success);
        toast.success(success); // Optional: show success toast
        get().resetForm(); // Reset the form on successful submission
      }
    } catch (e) {
      // This catches unexpected exceptions within the action itself
      toast.error("An unexpected client-side error occurred.");
    } finally {
      // 5. ALWAYS reset the submitting state, regardless of outcome
      set({ isSubmitting: false });
    }
  },
  setShowResumeUploadModal: (isOpen) => {
    set({ showResumeUploadModal: isOpen });
  },
});
