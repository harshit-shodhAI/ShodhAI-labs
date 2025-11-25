import React from "react";

export const QuizNavigation: React.FC<{
    currentIndex: number;
    totalSections: number;
    onPrev: () => void;
    onNext: () => void;
    onSubmit: () => void;
}> = ({ currentIndex, totalSections, onPrev, onNext, onSubmit }) => {

    const isLast = currentIndex === totalSections - 1;

    return (
        <div className="flex items-center justify-between">
            <button
                onClick={onPrev}
                disabled={currentIndex === 0}
                className="button_ghost disabled:opacity-0"
            >
                ← Previous
            </button>

            {isLast ? (
                <button onClick={onSubmit} className="button_primary bg-[var(--primary-600)] hover:bg-[var(--primary-700)] px-8">
                    Submit Assessment
                </button>
            ) : (
                <button onClick={onNext} className="button_primary px-8">
                    Next Section →
                </button>
            )}
        </div>
    );
};