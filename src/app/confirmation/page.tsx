"use client";

import { ToastContainer, Bounce } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useApplicationFormStore } from "@/features/application/application.store";

export default function ConfirmationPage() {
  // Connect to the central store to get actions and state
  const submitApplication = useApplicationFormStore(
    (state) => state.submitApplication
  );
  const isSubmitting = useApplicationFormStore((state) => state.isSubmitting);
  const showResumeUploadModal = useApplicationFormStore(
    (state) => state.showResumeUploadModal
  );
  const setShowResumeUploadModal = useApplicationFormStore(
    (state) => state.setShowResumeUploadModal
  );
  const handleFileChange = useApplicationFormStore(
    (state) => state.handleFileChange
  );
  const documents = useApplicationFormStore((state) => state.form.documents); // Access documents to show file name if selected

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background-light dark:bg-background-dark px-4 py-8 font-display">
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

      <div className="text-center max-w-2xl">
        <h1 className="text-3xl font-black tracking-[-0.033em] text-text-light dark:text-text-dark sm:text-4xl">
          Quiz Completed!
        </h1>
        <p className="mt-4 text-lg text-text-light/80 dark:text-text-dark/80">
          Thank you for your effort. You are now ready to submit your entire
          application, including your quiz score.
        </p>

        <div className="mt-10 flex justify-center">
          {/* The Primary Button that triggers the final submission */}
          <button
            onClick={() => submitApplication()}
            disabled={isSubmitting}
            className="primary-button w-full sm:w-auto"
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2">
                <svg
                  className="animate-spin h-5 w-5 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Submitting...
              </span>
            ) : (
              "Submit Final Application"
            )}
          </button>
        </div>
      </div>

      {/* === Resume Upload Modal === */}
      {showResumeUploadModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="card w-full max-w-md p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex items-center gap-4 text-amber-500 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-8 w-8"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                />
              </svg>
              <h2 className="text-xl font-bold text-text-light dark:text-text-dark">
                Resume Required
              </h2>
            </div>

            <p className="text-text-light/80 dark:text-text-dark/80 mb-6">
              It looks like you haven&apos;t uploaded your resume yet. Please
              attach it below to complete your application.
            </p>

            {/* File Input Area */}
            <div className="mb-6">
              <label className="flex flex-col gap-2 cursor-pointer">
                <div className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-border-light dark:border-border-dark rounded-lg hover:bg-background-light/50 dark:hover:bg-background-dark/50 transition-colors">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-8 w-8 text-primary mb-2"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                    />
                  </svg>
                  <p className="text-sm font-medium text-text-light/70 dark:text-text-dark/70">
                    {documents.resume
                      ? documents.resume.name
                      : "Click to upload PDF (max 512KB)"}
                  </p>
                </div>
                <input
                  type="file"
                  accept=".pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
            </div>

            {/* Modal Actions */}
            <div className="flex gap-3 justify-end">
              <button
                onClick={() => setShowResumeUploadModal(false)}
                className="px-4 py-2 text-sm font-medium text-text-light/70 hover:text-text-light dark:text-text-dark/70 dark:hover:text-text-dark transition-colors"
                disabled={isSubmitting}
              >
                Cancel
              </button>
              <button
                onClick={() => submitApplication()}
                disabled={isSubmitting}
                className="primary-button h-10 px-6 text-sm"
              >
                {isSubmitting ? "Uploading..." : "Confirm & Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
