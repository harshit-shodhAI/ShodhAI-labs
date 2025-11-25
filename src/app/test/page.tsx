"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useQuizStore } from "@/features/test/test.store";
import { useApplicationFormStore } from "@/features/application/application.store";
import { SECTIONS } from "@/data/questions";
import { QuizStatus } from "@/features/test/test.model";

// Components
import { Introduction } from "@/components/test/Introduction";
import { QuizHeader } from "@/components/test/QuizHeader";
import { QuizSection } from "@/components/test/QuizSection";
import { QuizNavigation } from "@/components/test/QuizNavigation";

const QuizPage: React.FC = () => {
  const {
    status,
    answers,
    currentSectionIndex,
    timeLeft,
    startQuiz,
    setAnswer,
    nextSection,
    prevSection,
    submitQuiz,
  } = useQuizStore();

  const { setScore } = useApplicationFormStore();
  const router = useRouter();
  const [violations, setViolations] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const quizStarted = status === QuizStatus.IN_PROGRESS;

  const enterFullscreen = async () => {
    try {
      if (containerRef.current && document.fullscreenEnabled) {
        await containerRef.current.requestFullscreen();
      }
    } catch (error) {
      console.error("Error entering fullscreen:", error);
      toast.error("Fullscreen mode is required.", { position: "top-center" });
    }
  };

  const handleStartQuiz = async () => {
    await enterFullscreen();
    startQuiz();
  };

  const handleSuccess = (score: number) => {
    if (document.fullscreenElement) document.exitFullscreen().catch(() => { });
    setScore(score);
    router.push("/final-step");
  };

  const handleSubmit = async () => {
    await submitQuiz({
      onSuccess: handleSuccess,
      onError: (msg) => toast.error(msg),
    });
  };

  // Timer check
  useEffect(() => {
    if (quizStarted && timeLeft === 0) {
      toast.info("Time's up! Submitting...", { position: "top-center" });
      setTimeout(handleSubmit, 2000);
    }
  }, [quizStarted, timeLeft]);

  // Fullscreen check
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (quizStarted && !document.fullscreenElement) {
        toast.warning("Fullscreen exited. Quiz paused.", { autoClose: 4000 });
        useQuizStore.setState({ status: QuizStatus.NOT_STARTED });
      }
    };
    document.addEventListener("fullscreenchange", handleFullscreenChange);
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange);
  }, [quizStarted]);

  // Tab Switching & Key bans
  useEffect(() => {
    if (!quizStarted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const newCount = violations + 1;
        setViolations(newCount);
        toast.warning(`Tab switch detected! Violation ${newCount}/3`, { toastId: "violation" });
        if (newCount >= 3) {
          toast.error("Too many violations. Auto-submitting.");
          setTimeout(handleSubmit, 3000);
        }
      }
    };

    const blockKeys = (e: KeyboardEvent) => {
      // Block F12, Ctrl+Shift+I, Ctrl+C, Ctrl+V, Alt+Tab (if possible)
      if (
        e.key === "F12" ||
        (e.ctrlKey && (e.key === "u" || e.key === "s" || e.key === "p")) ||
        (e.ctrlKey && e.shiftKey && ["I", "J", "C"].includes(e.key))
      ) {
        e.preventDefault();
      }
    };

    const blockContext = (e: MouseEvent) => e.preventDefault();

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("keydown", blockKeys);
    document.addEventListener("contextmenu", blockContext);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("keydown", blockKeys);
      document.removeEventListener("contextmenu", blockContext);
    };
  }, [quizStarted, violations]);

  const hasProgress = Object.keys(answers).length > 0 || currentSectionIndex > 0;

  return (
    <div ref={containerRef} className="min-h-screen w-full bg-[var(--background-body)] py-8 px-4 sm:px-6 overflow-y-auto">
      <ToastContainer position="top-center" theme="light" transition={Bounce} />

      <main className="max-w-3xl mx-auto">
        {/* Main Card Wrapper */}
        <div className="bg-[var(--background-surface)] rounded-xl shadow-sm border border-[var(--border-default)] min-h-[600px] flex flex-col">

          {!quizStarted ? (
            <Introduction onStartQuiz={handleStartQuiz} hasProgress={hasProgress} currentSection={currentSectionIndex + 1} />
          ) : (
            <>
              {/* Sticky Internal Header */}
              <div className="sticky top-0 z-20 bg-[var(--background-surface)]/95 backdrop-blur-md border-b border-[var(--border-default)] rounded-b-2xl shadow-sm transition-all duration-200">
                <QuizHeader
                  currentSection={currentSectionIndex + 1}
                  totalSections={SECTIONS.length}
                />
              </div>

              {/* Scrollable Content */}
              <div className="flex-1 p-6 md:p-10">
                <QuizSection
                  section={SECTIONS[currentSectionIndex]}
                  sectionIndex={currentSectionIndex}
                  answers={answers}
                  onAnswerChange={setAnswer}
                />
              </div>

              {/* Footer Navigation */}
              <div className="p-6 border-t border-[var(--border-default)] bg-[var(--neutral-50)] rounded-b-xl">
                <QuizNavigation
                  currentIndex={currentSectionIndex}
                  totalSections={SECTIONS.length}
                  onPrev={prevSection}
                  onNext={nextSection}
                  onSubmit={handleSubmit}
                />
              </div>
            </>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizPage;