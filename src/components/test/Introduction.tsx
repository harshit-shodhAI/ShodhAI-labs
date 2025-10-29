import { TOTAL_SECTIONS } from "@/data/questions";

const Introduction: React.FC<{ onStartQuiz: () => void }> = ({
  onStartQuiz,
}) => (
  <div className="mb-8 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 text-center shadow-sm sm:p-8">
    <p className="text-3xl font-black leading-tight tracking-[-0.033em] sm:text-4xl">
      Technical Skills Assessment
    </p>
    <p className="mx-auto mt-3 max-w-2xl text-base font-normal text-text-light/80 dark:text-text-dark/80">
      This quiz consists of 5 sections with 5 questions each. You will have 60
      minutes to complete it. Once you start, the timer cannot be paused. Good
      luck!
    </p>
    <button
      onClick={onStartQuiz}
      className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 active:scale-100 primary-button"
    >
      Start Quiz
    </button>
  </div>
);

export default Introduction;
