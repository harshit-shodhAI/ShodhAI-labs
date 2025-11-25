import React, { useEffect, useMemo } from "react";
import { useQuizStore } from "@/features/test/test.store";
import { QuizStatus } from "@/features/test/test.model";

const formatTime = (totalSeconds: number) => {
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
};

export const QuizHeader: React.FC<{ currentSection: number; totalSections: number }> = ({ currentSection, totalSections }) => {
    const status = useQuizStore((state) => state.status);
    const timeLeft = useQuizStore((state) => state.timeLeft);
    const tick = useQuizStore((state) => state.tick);

    useEffect(() => {
        if (status === QuizStatus.IN_PROGRESS) {
            const timer = setInterval(tick, 1000);
            return () => clearInterval(timer);
        }
    }, [status, tick]);

    const progress = (currentSection / totalSections) * 100;
    const isUrgent = timeLeft < 300;

    return (
        <div className="px-6 py-4 rounded-full">
            <div className="flex items-center justify-between mb-3">
                <div className="flex flex-col">
                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)]">
                        Section {currentSection} of {totalSections}
                    </span>
                </div>

                {/* Minimalist Timer */}
                <div className={`flex items-center gap-2 font-mono text-xl font-bold ${isUrgent ? "text-[var(--error-500)]" : "text-[var(--primary-600)]"}`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                    {formatTime(timeLeft)}
                </div>
            </div>

            {/* Sleek Progress Bar */}
            <div className="h-1.5 w-full bg-[var(--neutral-100)] rounded-full overflow-hidden">
                <div
                    className="h-full bg-[var(--primary-500)] transition-all duration-500 ease-out"
                    style={{ width: `${progress}%` }}
                />
            </div>
        </div>
    );
};