"use client";

import React from "react";

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  fullScreen = false,
}) => (
  <div
    className={`flex flex-col items-center justify-center p-8 ${
      fullScreen
        ? "fixed inset-0 bg-white dark:bg-gray-800 z-[9999]"
        : "min-h-[200px]"
    }`}
    role="status"
    aria-label="Loading content"
  >
    <div className="w-10 h-10 border-4 border-gray-200 dark:border-gray-700 border-t-blue-500 rounded-full animate-spin" />
    <p className="mt-4 text-gray-900 dark:text-gray-100 animate-pulse">
      {message}
    </p>
  </div>
);

interface SkeletonLoaderProps {
  lines?: number;
  avatar?: boolean;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  lines = 3,
  avatar = false,
}) => (
  <div
    className="w-full max-w-2xl"
    role="status"
    aria-label="Loading content skeleton"
  >
    {avatar && (
      <div className="flex items-center mb-4">
        <div className="w-15 h-15 rounded-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 animate-pulse mr-4" />
        <div className="flex-1">
          <div className="h-5 w-2/5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse mb-2" />
          <div className="h-4 w-3/5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse" />
        </div>
      </div>
    )}
    {Array.from({ length: lines }, (_, i) => (
      <div
        key={i}
        data-testid={`skeleton-line-${i}`}
        className="h-4 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 dark:from-gray-700 dark:via-gray-600 dark:to-gray-700 rounded animate-pulse mb-3"
        style={{
          width:
            i === lines - 1 && lines > 1
              ? `${Math.random() * 40 + 40}%`
              : "100%",
        }}
      />
    ))}
  </div>
);

interface SuspenseFallbackProps {
  type?: "spinner" | "skeleton";
  message?: string;
  lines?: number;
  avatar?: boolean;
}

const SuspenseFallback: React.FC<SuspenseFallbackProps> = ({
  type = "spinner",
  message = "Loading content...",
  lines = 3,
  avatar = false,
}) => {
  if (type === "skeleton") {
    return <SkeletonLoader lines={lines} avatar={avatar} />;
  }

  return <LoadingSpinner message={message} />;
};

export default SuspenseFallback;
