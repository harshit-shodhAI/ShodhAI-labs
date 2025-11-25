"use client";

import { useRouter } from "next/navigation";
import { ToastContainer, Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApplicationFormStore } from "@/features/application/application.store";

export default function FinalStepPage() {
  const router = useRouter();

  const {
    form,
    handleFileChange,
    handleChange,
    submitApplication,
    isSubmitting
  } = useApplicationFormStore();

  const { documents } = form;

  // Wrapper to handle the file input event
  const onFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleFileChange(e);
  };

  const onFinalSubmit = async () => {
    if (!documents.resume) {
      toast.error("Resume is mandatory.");
      return;
    }

    // Call store action; it returns true if successful
    const success = await submitApplication();
    if (success) {
      router.push("/confirmation");
    }
  };

  return (
    <div className="min-h-screen w-full bg-[var(--background-body)] py-12 px-4 sm:px-6">
      <ToastContainer position="top-center" theme="colored" transition={Bounce} />

      <main className="max-w-2xl mx-auto">

        {/* --- Main Content Card --- */}
        <div className="bg-[var(--background-surface)] rounded-xl shadow-sm border border-[var(--border-default)] overflow-hidden">

          <div className="p-8 border-b border-[var(--border-default)] text-center">
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">Almost There!</h1>
            <p className="mt-2 text-[var(--text-secondary)]">
              You have successfully completed the assessment.<br />
              Please upload your resume to finalize your application.
            </p>
          </div>

          <div className="p-8 flex flex-col gap-8">

            {/* Resume Upload Zone */}
            <div>
              <label className="block text-sm font-bold text-[var(--text-primary)] mb-3 ml-1">
                Upload Resume / CV <span className="text-[var(--error-500)]">*</span>
              </label>

              <label
                className={`group relative flex flex-col items-center justify-center w-full h-48 rounded-xl border-2 border-dashed transition-all duration-200 cursor-pointer overflow-hidden
                  ${documents.resume
                    ? 'border-[var(--success-500)] bg-[var(--success-100)]'
                    : 'border-[var(--border-default)] bg-[var(--neutral-50)] hover:border-[var(--primary-400)] hover:bg-[var(--primary-50)]'
                  }
                `}
              >
                <input
                  type="file"
                  accept=".pdf"
                  onChange={onFileSelect}
                  className="hidden"
                />

                {documents.resume ? (
                  <div className="w-full h-full flex flex-col items-center justify-center animate-in fade-in zoom-in duration-300">
                    <div className="mb-2 text-[var(--success-500)]">
                      <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    </div>
                    <p className="text-lg font-bold text-[var(--text-primary)] px-4 text-center max-w-[90%] truncate">
                      {documents.resume.name}
                    </p>
                    <p className="absolute bottom-3 text-xs text-[var(--text-secondary)] opacity-0 group-hover:opacity-100 transition-opacity">
                      Click to replace
                    </p>
                  </div>
                ) : (
                  <div className="flex flex-col items-center gap-3 p-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-white border border-[var(--border-default)] flex items-center justify-center group-hover:scale-110 group-hover:border-[var(--primary-300)] transition-all duration-300 shadow-sm">
                      <svg className="w-6 h-6 text-[var(--text-secondary)] group-hover:text-[var(--primary-600)] transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-base font-bold text-[var(--text-primary)]">
                        Click to upload PDF
                      </p>
                      <p className="text-sm text-[var(--text-secondary)] mt-1">
                        or drag and drop
                      </p>
                    </div>
                    <div className="text-xs font-medium text-[var(--text-placeholder)] border border-[var(--border-default)] px-3 py-1 rounded-full bg-white">
                      PDF only • Max 512 KB
                    </div>
                  </div>
                )}
              </label>
            </div>

            {/* Cover Letter (Optional) */}
            <div>
              <label className="block text-sm font-bold text-[var(--text-primary)] mb-2 ml-1">
                Cover Letter <span className="font-normal text-[var(--text-secondary)]">(Optional)</span>
              </label>
              <textarea
                name="coverLetter"
                value={documents.coverLetter || ""}
                onChange={(e) => handleChange("documents", "coverLetter", e.target.value)}
                className="input-field h-32 resize-none"
                placeholder="Share why you are a great fit for this role..."
              />
            </div>

          </div>

          {/* Footer Actions */}
          <div className="p-6 bg-[var(--neutral-50)] border-t border-[var(--border-default)] flex justify-end">
            <button
              onClick={onFinalSubmit}
              disabled={isSubmitting}
              className="button_primary px-8 py-3 w-full sm:w-auto"
            >
              {isSubmitting ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                  Submitting...
                </span>
              ) : (
                "Complete Application"
              )}
            </button>
          </div>

        </div>
      </main>
    </div>
  );
}