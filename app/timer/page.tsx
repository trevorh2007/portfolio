"use client";

import { useState } from "react";

import ErrorBoundary from "../components/shared/ErrorBoundary";
import { LoadingSpinner } from "../components/shared/Loading";
import { useLoading } from "../hooks/useAsync";
import TimerComponent from "./CountdownTimer";

const Timer = () => {
  const [userTime, setUserTime] = useState<Date>(new Date());
  const [resetTimer, setResetTimer] = useState(false);
  const [inputError, setInputError] = useState<string>("");
  const { isLoading, withLoading } = useLoading();

  const handleChange = async (event: React.FormEvent<HTMLInputElement>) => {
    try {
      const value = event.currentTarget.value;
      const seconds = parseInt(value);

      if (isNaN(seconds) || seconds <= 0) {
        setInputError("Please enter a valid positive number");
        return;
      }

      if (seconds > 86400) {
        // 24 hours in seconds
        setInputError("Timer cannot exceed 24 hours");
        return;
      }

      setInputError("");

      await withLoading(async () => {
        // Simulate async operation (could be validation API call)
        await new Promise((resolve) => setTimeout(resolve, 300));

        const userDate = new Date();
        userDate.setSeconds(userDate.getSeconds() + seconds);
        setUserTime(userDate);
      });
    } catch (error) {
      setInputError("Failed to set timer. Please try again.");
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("Timer setup error:", error);
      }
    }
  };

  const handleStartTimer = async () => {
    try {
      await withLoading(async () => {
        // Simulate async operation
        await new Promise((resolve) => setTimeout(resolve, 200));
        setResetTimer(true);
      });
    } catch (error) {
      if (process.env.NODE_ENV !== "production") {
        // eslint-disable-next-line no-console
        console.error("Failed to start timer:", error);
      }
    }
  };

  if (isLoading) {
    return <LoadingSpinner message="Setting up timer..." />;
  }

  return (
    <ErrorBoundary>
      <div className="flex justify-center items-center py-12 w-full gap-6 flex-wrap">
        {!resetTimer ? (
          <>
            <input
              onChange={handleChange}
              placeholder="Enter seconds..."
              type="number"
              min="1"
              max="86400"
              className="h-12 text-4xl px-4 border-2 border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {inputError && (
              <div className="text-red-500 ml-4 text-sm">{inputError}</div>
            )}
          </>
        ) : (
          <></>
        )}
        {resetTimer ? (
          <TimerComponent userTime={userTime} setResetTimer={setResetTimer} />
        ) : (
          <></>
        )}
        {!resetTimer && !inputError ? (
          <button
            onClick={handleStartTimer}
            disabled={isLoading}
            className="bg-gray-200 dark:bg-gray-700 ml-6 h-12 w-36 rounded-lg text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isLoading ? "Starting..." : "Start Timer"}
          </button>
        ) : (
          <></>
        )}
      </div>
    </ErrorBoundary>
  );
};

export default Timer;
