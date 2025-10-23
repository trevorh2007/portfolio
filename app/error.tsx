"use client";

import { useEffect } from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
`;

const ErrorTitle = styled.h1`
  color: #ef4444;
  margin-bottom: 1rem;
  font-size: 2rem;
`;

const ErrorMessage = styled.p`
  margin-bottom: 2rem;
  font-size: 1.1rem;
  opacity: 0.8;
`;

const RetryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 1rem 2rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    if (process.env.NODE_ENV === "production") {
      // eslint-disable-next-line no-console
      console.error("Global error:", error);
    } else {
      // eslint-disable-next-line no-console
      console.error("Global error:", error);
    }
  }, [error]);

  return (
    <ErrorContainer>
      <ErrorTitle>Something went wrong!</ErrorTitle>
      <ErrorMessage>
        We encountered an unexpected error. Please try again or contact support
        if the problem persists.
      </ErrorMessage>
      <RetryButton onClick={reset}>Try Again</RetryButton>

      {process.env.NODE_ENV === "development" && (
        <details style={{ marginTop: "2rem", textAlign: "left" }}>
          <summary>Error Details (Development Only)</summary>
          <pre style={{ whiteSpace: "pre-wrap", marginTop: "1rem" }}>
            {error.message}
            {error.stack}
          </pre>
        </details>
      )}
    </ErrorContainer>
  );
}
