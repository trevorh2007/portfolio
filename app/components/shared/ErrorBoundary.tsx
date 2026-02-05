"use client";

import { isDevelopment } from "@/app/utils/env";
import { Component, ErrorInfo, ReactNode } from "react";

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
        <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100">
          <h2 className="text-2xl font-semibold text-red-500 mb-4">
            Oops! Something went wrong
          </h2>
          <p className="mb-6 opacity-80">
            We encountered an unexpected error. Please try refreshing the page
            or contact support if the problem persists.
          </p>
          <button
            onClick={this.handleRetry}
            className="px-6 py-3 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-all hover:bg-gray-300 dark:hover:bg-gray-600"
          >
            Try Again
          </button>

          {isDevelopment() && this.state.error && (
            <details className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded-lg max-w-lg">
              <summary className="cursor-pointer font-bold mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="bg-white dark:bg-gray-800 p-4 rounded overflow-x-auto text-sm whitespace-pre-wrap">
                {this.state.error.toString()}
                {this.state.errorInfo?.componentStack}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
