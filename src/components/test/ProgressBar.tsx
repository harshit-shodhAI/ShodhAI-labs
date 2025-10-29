import { TOTAL_SECTIONS } from "@/data/questions";

const ProgressBar: React.FC<{ currentSection: number }> = ({
  currentSection,
}) => {
  const progressPercentage = (currentSection / TOTAL_SECTIONS) * 100;
  return (
    <div className="flex flex-col gap-3 rounded-xl border border-border-light dark:border-border-dark bg-card-light dark:bg-card-dark p-4 shadow-sm sm:p-6">
      <div className="flex items-center justify-between">
        <p className="text-base font-medium">
          Section {currentSection} of {TOTAL_SECTIONS}
        </p>
        <p className="text-sm font-medium text-text-light/80 dark:text-text-dark/80">
          {Math.round(progressPercentage)}% Complete
        </p>
      </div>
      <div className="h-2 w-full rounded-full bg-background-light dark:bg-background-dark">
        <div
          className="h-2 rounded-full bg-primary"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ProgressBar;
