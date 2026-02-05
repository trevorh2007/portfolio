"use client";

import { useEffect } from "react";

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
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <h1 className="text-4xl font-bold text-red-500 mb-4">
        Something went wrong!
      </h1>
      <p className="text-lg mb-8 opacity-80">
        We encountered an unexpected error. Please try again or contact support
        if the problem persists.
      </p>
      <button
        onClick={reset}
        className="px-8 py-4 bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100 border-2 border-gray-300 dark:border-gray-600 rounded-lg cursor-pointer transition-all hover:bg-gray-300 dark:hover:bg-gray-600"
      >
        Try Again
      </button>

      {process.env.NODE_ENV === "development" && (
        <details className="mt-8 text-left">
          <summary className="cursor-pointer font-semibold">
            Error Details (Development Only)
          </summary>
          <pre className="whitespace-pre-wrap mt-4 p-4 bg-gray-100 dark:bg-gray-800 rounded">
            {error.message}
            {error.stack}
          </pre>
        </details>
      )}
    </div>
  );
}
