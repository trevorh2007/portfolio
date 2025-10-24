"use client";

import { isDevelopment } from "@/app/utils/env";
import { Component, ErrorInfo, ReactNode } from "react";
import styled from "styled-components";

const ErrorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  padding: 2rem;
  text-align: center;
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
`;

const ErrorTitle = styled.h2`
  color: #ef4444;
  margin-bottom: 1rem;
  font-size: 1.5rem;
`;

const ErrorMessage = styled.p`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
`;

const RetryButton = styled.button`
  background-color: ${({ theme }) => theme.colors.buttonBackground};
  color: ${({ theme }) => theme.colors.text};
  border: 2px solid ${({ theme }) => theme.colors.border};
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundLight};
  }
`;

const ErrorDetails = styled.details`
  margin-top: 1rem;
  padding: 1rem;
  background-color: ${({ theme }) => theme.colors.backgroundLight};
  border-radius: 8px;
  max-width: 500px;

  summary {
    cursor: pointer;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  pre {
    background-color: ${({ theme }) => theme.colors.background};
    padding: 1rem;
    border-radius: 4px;
    overflow-x: auto;
    font-size: 0.875rem;
    white-space: pre-wrap;
  }
`;

interface Props {
  children?: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  public override state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  override componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    if (process.env.NODE_ENV === "production") {
      // eslint-disable-next-line no-console
      console.error("Error caught by boundary:", error, errorInfo);
    } else {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary caught an error:", error, errorInfo);
    }
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  public override render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <ErrorContainer>
          <ErrorTitle>Oops! Something went wrong</ErrorTitle>
          <ErrorMessage>
            We encountered an unexpected error. Please try refreshing the page
            or contact support if the problem persists.
          </ErrorMessage>
          <RetryButton onClick={this.handleRetry}>Try Again</RetryButton>

          {isDevelopment() && this.state.error && (
            <ErrorDetails>
              <summary>Error Details (Development Only)</summary>
              <pre>
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </ErrorDetails>
          )}
        </ErrorContainer>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
