"use client";

import { useState } from "react";
import styled from "styled-components";

import ErrorBoundary from "../components/shared/ErrorBoundary";
import { LoadingSpinner } from "../components/shared/Loading";
import { useLoading } from "../hooks/useAsync";
import TimerComponent from "./CountdownTimer";

const TimerWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px 0;
  width: 100%;

  input {
    height: 50px;
    font-size: 36px;
  }

  button {
    background-color: #e3e3e3;
    margin-left: 25px;
    height: 50px;
    width: 150px;
  }
`;

const ErrorMessage = styled.div`
  color: #ef4444;
  margin-left: 1rem;
  font-size: 0.875rem;
`;

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
        await new Promise(resolve => setTimeout(resolve, 300));

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
        await new Promise(resolve => setTimeout(resolve, 200));
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
      <TimerWrapper>
        {!resetTimer ? (
          <>
            <input
              onChange={handleChange}
              placeholder="Enter seconds..."
              type="number"
              min="1"
              max="86400"
            />
            {inputError && <ErrorMessage>{inputError}</ErrorMessage>}
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
          <button onClick={handleStartTimer} disabled={isLoading}>
            {isLoading ? "Starting..." : "Start Timer"}
          </button>
        ) : (
          <></>
        )}
      </TimerWrapper>
    </ErrorBoundary>
  );
};

export default Timer;
