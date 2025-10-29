"use client";

import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast, ToastContainer, Bounce } from "react-toastify";
import { useQuizStore } from "@/features/test/test.store";
import { useApplicationFormStore } from "@/features/application/application.store";
import { SECTIONS } from "@/data/questions";
import QuizSection from "@/components/test/QuizSection";
import Header from "@/components/test/Header";
import Introduction from "@/components/test/Introduction";
import ProgressBar from "@/components/test/ProgressBar";
import Navigation from "@/components/test/Navigation";
import { QuizStatus } from "@/features/test/test.model";

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

  // Enter fullscreen
  const enterFullscreen = async () => {
    try {
      if (containerRef.current && document.fullscreenEnabled) {
        await containerRef.current.requestFullscreen();
      }
    } catch (error) {
      console.error("Error entering fullscreen:", error);
      toast.error("Fullscreen mode is required to start the quiz.", {
        position: "top-center",
        autoClose: 3000,
        toastId: "fullscreen-error",
      });
    }
  };

  // Handle quiz start/resume with fullscreen
  const handleStartQuiz = async () => {
    await enterFullscreen();
    startQuiz();
  };

  // YOUR ORIGINAL FUNCTIONS
  const handleSuccess = (score: number) => {
    // Exit fullscreen before navigation
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    }

    toast.success("Quiz Successfully Submitted!", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
    setScore(score);
    router.push("/confirmation");
  };

  const handleError = (errorMessage: string) => {
    toast.error(`Submission Failed: ${errorMessage}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce,
    });
  };

  const handleSubmit = async () => {
    await submitQuiz({
      onSuccess: handleSuccess,
      onError: handleError,
    });
  };

  useEffect(() => {
    if (quizStarted && timeLeft === 0) {
      toast.info("Time's up! Submitting your quiz...", {
        position: "top-center",
        autoClose: 2000,
        toastId: "time-up",
      });
      setTimeout(() => {
        handleSubmit();
      }, 2000);
    }
  }, [quizStarted, timeLeft, handleSubmit]);

  // Detect fullscreen exit - pause quiz but keep progress
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (quizStarted && !document.fullscreenElement) {
        toast.warning(
          "⚠️ You exited fullscreen mode. Click 'Start Quiz' to resume.",
          {
            position: "top-center",
            autoClose: 4000,
            toastId: "fullscreen-exit",
          }
        );

        // Pause the quiz - Zustand persist keeps all progress
        useQuizStore.setState({ status: QuizStatus.NOT_STARTED });
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener(
        "webkitfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "mozfullscreenchange",
        handleFullscreenChange
      );
      document.removeEventListener(
        "MSFullscreenChange",
        handleFullscreenChange
      );
    };
  }, [quizStarted]);

  // Detect tab switching and window blur
  useEffect(() => {
    if (!quizStarted) return;

    const handleVisibilityChange = () => {
      if (document.hidden) {
        const newViolationCount = violations + 1;
        setViolations(newViolationCount);

        // Single toast with unique ID to prevent duplicates
        toast.warning(
          `⚠️ Warning: Tab switching detected! Violation ${newViolationCount}/3`,
          {
            position: "top-center",
            autoClose: 4000,
            closeOnClick: false,
            toastId: `violation-${newViolationCount}`,
          }
        );

        // Auto-submit after 3 violations
        if (newViolationCount >= 3) {
          toast.error("Too many violations. Quiz will be auto-submitted.", {
            position: "top-center",
            autoClose: 3000,
            toastId: "auto-submit",
          });
          setTimeout(() => {
            handleSubmit();
          }, 3000);
        }
      }
    };

    // Prevent right-click
    const handleContextMenu = (e: MouseEvent) => {
      if (quizStarted) {
        e.preventDefault();
      }
    };

    // Detect common cheat key combinations
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!quizStarted) return;

      // Prevent F12 (DevTools)
      if (e.key === "F12") {
        e.preventDefault();
        return;
      }

      // Prevent Ctrl+Shift+I/J/C (DevTools, Console, Inspect)
      if (
        (e.ctrlKey || e.metaKey) &&
        e.shiftKey &&
        (e.key === "I" || e.key === "J" || e.key === "C")
      ) {
        e.preventDefault();
        return;
      }

      // Prevent Ctrl+U (View Source)
      if ((e.ctrlKey || e.metaKey) && e.key === "u") {
        e.preventDefault();
        return;
      }

      // Prevent Ctrl+S (Save)
      if ((e.ctrlKey || e.metaKey) && e.key === "s") {
        e.preventDefault();
        return;
      }

      // Prevent Ctrl+P (Print)
      if ((e.ctrlKey || e.metaKey) && e.key === "p") {
        e.preventDefault();
        return;
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    document.addEventListener("contextmenu", handleContextMenu);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [quizStarted, violations, handleSubmit]);

  // Cleanup fullscreen on unmount
  useEffect(() => {
    return () => {
      if (document.fullscreenElement) {
        document.exitFullscreen().catch(() => {});
      }
    };
  }, []);

  // Check if there's existing progress
  const hasProgress =
    Object.keys(answers).length > 0 || currentSectionIndex > 0;

  return (
    <div
      ref={containerRef}
      className="font-display relative flex min-h-screen w-full flex-col bg-white"
    >
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

      <Header />
      <main className="flex flex-1 justify-center p-4 sm:p-6 lg:p-8 overflow-y-auto m-8">
        <div className="w-full max-w-4xl">
          {!quizStarted ? (
            <div>
              <Introduction onStartQuiz={handleStartQuiz} />
              {hasProgress && (
                <div className="mt-6 p-4 bg-blue-50 border-2 border-blue-300 rounded-lg text-center">
                  <p className="text-blue-900 font-semibold text-lg">
                    📝 You have saved progress on Section{" "}
                    {currentSectionIndex + 1}!
                  </p>
                  <p className="text-blue-700 mt-2">
                    Click Start Quiz to resume from where you left off.
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="space-y-8">
              <ProgressBar currentSection={currentSectionIndex + 1} />
              <QuizSection
                section={SECTIONS[currentSectionIndex]}
                sectionIndex={currentSectionIndex}
                answers={answers}
                onAnswerChange={setAnswer}
              />
              <Navigation
                currentIndex={currentSectionIndex}
                onPrev={prevSection}
                onNext={nextSection}
                onSubmit={handleSubmit}
              />
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
