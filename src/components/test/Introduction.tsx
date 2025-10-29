import { TOTAL_SECTIONS } from "@/data/questions";

const Introduction: React.FC<{ onStartQuiz: () => void }> = ({
  onStartQuiz,
}) => (
  <div className="mb-8 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-6 text-center shadow-sm sm:p-8">
    <p className="text-3xl font-black leading-tight tracking-[-0.033em] sm:text-4xl">
      Technical Skills Assessment
    </p>
    <p className="mx-auto mt-3 max-w-2xl text-base font-normal text-text-light/80 dark:text-text-dark/80">
      This assessment consists of 25 questions divided into 5 sections: Aptitude
      (5), Mathematics - Calculus & Linear Algebra (5), Machine Learning
      Concepts (5), Deep Learning & LLM Concepts (5), and Programming & Data
      Structures (5). Each section tests your understanding and problem-solving
      abilities.
    </p>

    <div className="mx-auto mt-4 max-w-2xl rounded-lg bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 p-4">
      <p className="text-sm font-semibold text-yellow-800 dark:text-yellow-200 mb-2">
        ⚠️ Important Rules
      </p>
      <ul className="text-sm text-yellow-700 dark:text-yellow-300 text-left space-y-1">
        <li>
          • You have <strong>30 minutes</strong> to complete all questions
        </li>
        <li>
          • The quiz will run in <strong>fullscreen mode</strong>
        </li>
        <li>
          • <strong>Switching tabs</strong> or{" "}
          <strong>exiting fullscreen</strong> will automatically terminate the
          quiz
        </li>
        <li>
          • The timer <strong>cannot be paused</strong> once started
        </li>
        <li>• Ensure a stable internet connection before starting</li>
      </ul>
    </div>

    <button
      onClick={onStartQuiz}
      className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-8 py-3 text-base font-bold text-white shadow-lg shadow-primary/30 transition-transform duration-200 hover:scale-105 active:scale-100 primary-button"
    >
      Start Quiz
    </button>
  </div>
);

export default Introduction;
