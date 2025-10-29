import { TOTAL_SECTIONS } from "@/data/questions";

const Navigation: React.FC<{
  onPrev: () => void;
  onNext: () => void;
  onSubmit: () => void;
  currentIndex: number;
}> = ({ onPrev, onNext, onSubmit, currentIndex }) => (
  <div className="flex flex-col-reverse items-center justify-between gap-4 pt-6 sm:flex-row">
    <button
      onClick={onPrev}
      disabled={currentIndex === 0}
      className="flex w-full items-center justify-center gap-2 rounded-full border border-border-light dark:border-border-dark px-6 py-3 text-base font-bold transition-colors hover:bg-background-light dark:hover:bg-background-dark disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
    >
      {/* SVG Icon for "arrow_back" */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-5 w-5"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fillRule="evenodd"
          d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
          clipRule="evenodd"
        />
      </svg>
      Previous Section
    </button>

    {currentIndex < TOTAL_SECTIONS - 1 ? (
      <button
        onClick={onNext}
        className="flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-bold text-white shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 active:scale-100 sm:w-auto primary-button"
      >
        Next Section
        {/* SVG Icon for "arrow_forward" */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    ) : (
      <button
        onClick={onSubmit}
        className="flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 active:scale-100 primary-button"
      >
        Submit Quiz
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2.5}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      </button>
    )}
  </div>
);

export default Navigation;
