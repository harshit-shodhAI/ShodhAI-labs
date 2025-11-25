"use client";

import { useRouter } from "next/navigation";
import { Bounce, toast, ToastContainer } from "react-toastify";
import { useApplicationFormStore } from "@/features/application/application.store";
import {
  BasicDetailsSection,
  ProjectSelectionSection,
  EducationSection,
  ExperienceSection,
} from "@/components/application/FormSections";
import "react-toastify/dist/ReactToastify.css";

export default function ApplicationPage() {
  const { validateAndSave } = useApplicationFormStore();
  const router = useRouter();

  const handleFinalSubmit = () => {
    const isFormValid = validateAndSave();

    if (isFormValid) {
      router.push("/test");
    } else {
      toast.error("Please fill in all required fields marked in red.", {
        position: "top-center",
        theme: "colored",
        transition: Bounce,
      });
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--background-body)] py-10 px-4 sm:px-6">
      <ToastContainer />

      {/* --- Main Wrapper --- */}
      <main className="max-w-3xl mx-auto">

        {/* --- Form Card --- */}
        <div className="bg-[var(--background-surface)] rounded-xl shadow-sm border border-[var(--border-default)]">

          {/* Header */}
          <div className="p-8 border-b border-[var(--border-default)]">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Internship Application</h1>
            <p className="mt-1 text-[var(--text-secondary)]">
              Please fill out the details below accurately.
            </p>
          </div>

          <div className="p-8 flex flex-col gap-10">

            {/* Section 1: Basic Info */}
            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
                1. Basic Information
              </h2>
              <BasicDetailsSection />
            </section>

            {/* Section 2: Education */}
            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
                2. Education
              </h2>
              <EducationSection />
            </section>

            {/* Section 3: Projects */}
            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
                3. Project Preferences
              </h2>
              <ProjectSelectionSection />
            </section>

            {/* Section 4: Experience */}
            <section>
              <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4 pb-2 border-b border-[var(--border-default)]">
                4. Experience & Skills
              </h2>
              <ExperienceSection />
            </section>

          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-[var(--neutral-50)] border-t border-[var(--border-default)] flex items-center justify-between rounded-b-xl">
            <button
              onClick={() => router.back()}
              className="button_secondary text-[var(--text-secondary)] hover:bg-[var(--neutral-200)]"
            >
              Cancel
            </button>

            <button
              onClick={handleFinalSubmit}
              className="button_primary px-8"
            >
              Continue to Assessment
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}