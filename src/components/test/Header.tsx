"use client";

import React, { useEffect, useMemo } from "react";
import { useQuizStore } from "@/features/test/test.store";
import { QuizStatus } from "@/features/test/test.model";

const formatTime = (
  totalSeconds: number
): { hours: string; minutes: string; seconds: string } => {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  return {
    hours: String(hours).padStart(2, "0"),
    minutes: String(minutes).padStart(2, "0"),
    seconds: String(seconds).padStart(2, "0"),
  };
};

const Header: React.FC = () => {
  const status = useQuizStore((state) => state.status);
  const timeLeft = useQuizStore((state) => state.timeLeft);
  const tick = useQuizStore((state) => state.tick);

  useEffect(() => {
    if (status === QuizStatus.IN_PROGRESS) {
      const timerId = setInterval(() => {
        tick();
      }, 1000);
      return () => clearInterval(timerId);
    }
  }, [status, tick]);

  const { hours, minutes, seconds } = useMemo(
    () => formatTime(timeLeft),
    [timeLeft]
  );

  return (
    <header className="sticky top-0 z-10 flex w-full items-center justify-between border-b border-solid border-border-light dark:border-border-dark bg-card-light/80 dark:bg-card-dark/80 px-6 py-3 backdrop-blur-sm sm:px-10">
      <div className="flex items-center gap-4 text-text-light dark:text-text-dark">
        <div className="h-6 w-6 text-primary">
          <svg
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 6H42L36 24L42 42H6L12 24L6 6Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h1 className="text-lg font-bold tracking-[-0.015em]">
          Research Internship Portal
        </h1>
      </div>
      {/* Timer Component */}
      <div className="flex items-center gap-2 sm:gap-4">
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background-light dark:bg-background-dark px-3">
            <p className="text-xl font-bold tracking-[-0.015em]">{hours}</p>
          </div>
          <p className="mt-1 text-xs font-medium text-text-light/70 dark:text-text-dark/70">
            Hours
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background-light dark:bg-background-dark px-3">
            <p className="text-xl font-bold tracking-[-0.015em]">{minutes}</p>
          </div>
          <p className="mt-1 text-xs font-medium text-text-light/70 dark:text-text-dark/70">
            Minutes
          </p>
        </div>
        <div className="flex flex-col items-center">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-background-light dark:bg-background-dark px-3">
            <p className="text-xl font-bold tracking-[-0.015em]">{seconds}</p>
          </div>
          <p className="mt-1 text-xs font-medium text-text-light/70 dark:text-text-dark/70">
            Seconds
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
