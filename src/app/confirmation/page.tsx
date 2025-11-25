"use client";

import Link from "next/link";
import { useEffect } from "react";
import confetti from "canvas-confetti";

export default function ConfirmationPage() {

    useEffect(() => {
        const duration = 3 * 1000;
        const animationEnd = Date.now() + duration;
        const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

        const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

        const interval: any = setInterval(function () {
            const timeLeft = animationEnd - Date.now();

            if (timeLeft <= 0) {
                return clearInterval(interval);
            }

            const particleCount = 50 * (timeLeft / duration);
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } });
            confetti({ ...defaults, particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } });
        }, 250);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="min-h-screen w-full bg-[var(--background-body)] flex items-center justify-center p-4">

            <div className="max-w-md w-full bg-[var(--background-surface)] rounded-2xl shadow-lg border border-[var(--border-default)] p-8 text-center animate-in fade-in zoom-in duration-500">

                {/* Success Icon */}
                <div className="w-20 h-20 bg-[var(--success-100)] rounded-full flex items-center justify-center mx-auto mb-6">
                    <svg className="w-10 h-10 text-[var(--success-500)]" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" /></svg>
                </div>

                <h1 className="text-3xl font-extrabold text-[var(--text-primary)] mb-2">
                    Application Received!
                </h1>

                <p className="text-[var(--text-secondary)] mb-8">
                    Thank you for applying to Shodh AI. We have received your assessment and resume.
                </p>

                {/* Next Steps Box */}
                <div className="bg-[var(--neutral-50)] border border-[var(--border-default)] rounded-xl p-5 mb-8 text-left">
                    <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3 uppercase tracking-wider">
                        What Happens Next?
                    </h3>
                    <ul className="space-y-3">
                        <li className="flex gap-3 text-sm text-[var(--text-secondary)]">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary-100)] text-[var(--primary-600)] flex items-center justify-center font-bold text-xs">1</span>
                            <span>Our team will review your quiz score and resume.</span>
                        </li>
                        <li className="flex gap-3 text-sm text-[var(--text-secondary)]">
                            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[var(--primary-100)] text-[var(--primary-600)] flex items-center justify-center font-bold text-xs">2</span>
                            <span>Shortlisted candidates will receive an project invite via email.</span>
                        </li>
                    </ul>
                </div>

                <Link href="/">
                    <button className="button_secondary w-full">
                        Return to Home
                    </button>
                </Link>

            </div>
        </div>
    );
}