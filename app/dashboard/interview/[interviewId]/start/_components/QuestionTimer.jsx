"use client";
import React, { useEffect, useRef, useState } from "react";
import { TimerIcon } from "lucide-react";

/**
 * Per-question countdown timer.
 * Resets whenever `resetKey` changes (i.e. when the active question changes).
 * Calls onExpire() once when the countdown hits zero, so the parent can
 * auto-advance to the next question or nudge the user to wrap up.
 */
const QuestionTimer = ({ seconds = 120, resetKey, onExpire, isPaused = false }) => {
  const [timeLeft, setTimeLeft] = useState(seconds);
  const expiredRef = useRef(false);

  useEffect(() => {
    setTimeLeft(seconds);
    expiredRef.current = false;
  }, [resetKey, seconds]);

  useEffect(() => {
    if (isPaused) return;
    if (timeLeft <= 0) {
      if (!expiredRef.current) {
        expiredRef.current = true;
        onExpire && onExpire();
      }
      return;
    }
    const id = setTimeout(() => setTimeLeft((t) => t - 1), 1000);
    return () => clearTimeout(id);
  }, [timeLeft, isPaused, onExpire]);

  const minutes = Math.floor(Math.max(timeLeft, 0) / 60);
  const secs = Math.max(timeLeft, 0) % 60;
  const isLow = timeLeft <= 15;

  return (
    <div
      className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium border w-fit ${
        isLow ? "bg-red-50 text-red-600 border-red-300 animate-pulse" : "bg-secondary text-gray-700"
      }`}
      aria-live="polite"
    >
      <TimerIcon className="h-4 w-4" />
      <span>
        {String(minutes).padStart(2, "0")}:{String(secs).padStart(2, "0")}
      </span>
    </div>
  );
};

export default QuestionTimer;
