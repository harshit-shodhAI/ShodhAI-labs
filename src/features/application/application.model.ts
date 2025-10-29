export enum FormStep {
  BASIC_DETAILS = 1,
  PROJECT_SELECTION = 2,
  EDUCATION = 3,
  EXPERIENCE = 4,
  DOCUMENTS = 5,
}

export interface BasicDetails {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  linkedin?: string;
  city: string;
  country: string;
  dob: string;
  nationality: string;
}

export interface ProjectSelection {
  firstChoiceProject: string;
  secondChoiceProject?: string;
}

export interface Education {
  institution: string;
  degreeProgram: string;
  yearOfStudy: string;
  currentGrade: string;
  graduationDate: string;
}

export interface Experience {
  skills: string;
  previousExperience?: string;
  publicationsPatents?: string;
}

export interface Documents {
  resume: File | null;
  coverLetter: string;
}

export type FormErrors = { [key: string]: string };

export interface ApplicationFormState {
  currentStep: FormStep;
  errors: FormErrors;
  score: number;
  isSubmitting: boolean;
  showResumeUploadModal: boolean;
  form: {
    basicDetails: BasicDetails;
    projectSelection: ProjectSelection;
    education: Education;
    experience: Experience;
    documents: Documents;
  };
}

export const initialApplicationFormState: ApplicationFormState = {
  currentStep: FormStep.BASIC_DETAILS,
  errors: {},
  score: 0,
  isSubmitting: false,
  showResumeUploadModal: false,
  form: {
    basicDetails: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      linkedin: "",
      city: "",
      country: "",
      dob: "",
      nationality: "",
    },
    projectSelection: {
      firstChoiceProject: "",
      secondChoiceProject: "",
    },
    education: {
      institution: "",
      degreeProgram: "",
      yearOfStudy: "",
      currentGrade: "",
      graduationDate: "",
    },
    experience: {
      previousExperience: "",
      skills: "",
      publicationsPatents: "",
    },
    documents: {
      resume: null,
      coverLetter: "",
    },
  },
};
