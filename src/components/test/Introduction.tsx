import React from "react";

interface IntroductionProps {
  onStartQuiz: () => void;
  hasProgress: boolean;
  currentSection: number;
}

export const Introduction: React.FC<IntroductionProps> = ({ onStartQuiz, hasProgress, currentSection }) => {
  return (
    <div className="flex flex-col items-center justify-center flex-1 p-8 text-center max-w-2xl mx-auto">
      <div className="mb-6 p-4 rounded-full bg-[var(--primary-50)] text-[var(--primary-600)]">
        <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
      </div>

      <h1 className="text-3xl font-bold text-[var(--text-primary)] mb-4">
        Technical Assessment
      </h1>

      <p className="text-[var(--text-secondary)] mb-8 leading-relaxed">
        This assessment consists of 25 questions across 5 sections.
        It tests your logic, math, and ML engineering skills.
      </p>

      {/* Rules Box - Using Warning Hues */}
      <div className="w-full text-left bg-[var(--warning-100)] border border-[var(--warning-500)] rounded-lg p-5 mb-8">
        <h3 className="font-bold text-[var(--warning-700)] flex items-center gap-2 mb-3">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
          Anti-Cheat Rules
        </h3>
        <ul className="space-y-2 text-sm text-[var(--warning-700)]">
          <li>• <strong>Fullscreen Only:</strong> Exiting fullscreen pauses the test.</li>
          <li>• <strong>No Tab Switching:</strong> We track visibility. 3 violations = Auto Fail.</li>
          <li>• <strong>No Copy/Paste:</strong> Right-click and shortcuts are disabled.</li>
          <li>• <strong>30 Minutes:</strong> The timer continues even if you disconnect.</li>
        </ul>
      </div>

      {hasProgress && (
        <div className="mb-6 p-3 bg-[var(--primary-50)] text-[var(--primary-700)] rounded-lg border border-[var(--primary-200)] text-sm font-semibold">
          Resuming from Section {currentSection}...
        </div>
      )}

      <button onClick={onStartQuiz} className="button_primary px-10 py-3 text-lg w-full sm:w-auto">
        {hasProgress ? "Resume Quiz" : "Start Assessment"}
      </button>
    </div>
  );
};