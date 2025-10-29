"use client";

import { useRouter } from "next/navigation";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { FormStep } from "@/features/application/application.model";
import { useApplicationFormStore } from "@/features/application/application.store";
import { BasicDetailsSection } from "@/components/application/BasicDetails";
import { ProjectSelectionSection } from "@/components/application/Project";
import { EducationSection } from "@/components/application/Education";
import { ExperienceSection } from "@/components/application/Experience";
import { DocumentsSection } from "@/components/application/Documents";

const STEP_TITLES: { [key in FormStep]: string } = {
  [FormStep.BASIC_DETAILS]: "Basic Details",
  [FormStep.PROJECT_SELECTION]: "Project Selection",
  [FormStep.EDUCATION]: "Education",
  [FormStep.EXPERIENCE]: "Experience & Publications",
  [FormStep.DOCUMENTS]: "Resume & Cover Letter",
};

export default function ApplicationPage() {
  const { currentStep, nextStep, prevStep, validateAndSave } =
    useApplicationFormStore();
  const router = useRouter();

  const renderCurrentStep = () => {
    switch (currentStep) {
      case FormStep.BASIC_DETAILS:
        return <BasicDetailsSection />;
      case FormStep.PROJECT_SELECTION:
        return <ProjectSelectionSection />;
      case FormStep.EDUCATION:
        return <EducationSection />;
      case FormStep.EXPERIENCE:
        return <ExperienceSection />;
      case FormStep.DOCUMENTS:
        return <DocumentsSection />;
      default:
        return <BasicDetailsSection />;
    }
  };

  const handleFinalSubmit = () => {
    const isFormValid = validateAndSave();

    if (isFormValid) {
      router.push("/test");
    } else {
      toast.error("Please review the form and fix the highlighted errors.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <main className="px-4 sm:px-10 lg:px-20 xl:px-40 flex flex-1 justify-center py-5 sm:py-10">
        <div className="flex flex-col w-full max-w-[960px] flex-1">
          <div className="p-4">
            <h1 className="page-title">Internship Application</h1>
            <p className="mt-2 text-text-body">
              Complete the form below to apply for a research position.
            </p>
          </div>
          <div className="flex flex-col gap-3 p-4">
            <p
              className="text-base font-medium"
              style={{ color: "var(--text-headings)" }}
            >
              Step {currentStep} of 5: {STEP_TITLES[currentStep]}
            </p>
            <div className="rounded-full bg-gray-200 dark:bg-gray-700 h-2">
              <div
                className="h-2 rounded-full bg-primary transition-all duration-300"
                style={{ width: `${(currentStep / 5) * 100}%` }}
              />
            </div>
          </div>
          <div className="p-4">{renderCurrentStep()}</div>
          <div className="flex justify-between p-4 mt-4">
            <button
              onClick={prevStep}
              disabled={currentStep === FormStep.BASIC_DETAILS}
              className="secondary-button"
            >
              Previous
            </button>
            <button
              onClick={
                currentStep === FormStep.DOCUMENTS
                  ? handleFinalSubmit
                  : nextStep
              }
              className="primary-button"
            >
              {currentStep === FormStep.DOCUMENTS
                ? "Save & Go to Quiz"
                : "Next Step"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
