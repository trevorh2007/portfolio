"use client";

import React from "react";
import styled, { keyframes } from "styled-components";

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const pulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const LoadingContainer = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== "fullScreen",
})<{ fullScreen?: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  ${({ fullScreen, theme }) =>
    fullScreen &&
    `
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: ${theme.colors.background};
    z-index: 9999;
  `}
  ${({ fullScreen }) =>
    !fullScreen &&
    `
    min-height: 200px;
  `}
`;

const Spinner = styled.div`
  border: 4px solid ${({ theme }) => theme.colors.backgroundLight};
  border-top: 4px solid ${({ theme }) => theme.colors.primary};
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: ${spin} 1s linear infinite;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1rem;
  animation: ${pulse} 1.5s ease-in-out infinite;
`;

const SkeletonContainer = styled.div`
  width: 100%;
  max-width: 600px;
`;

const SkeletonLine = styled.div<{ width?: string; height?: string }>`
  background: linear-gradient(
    90deg,
    ${({ theme }) => theme.colors.backgroundLight} 25%,
    ${({ theme }) => theme.colors.background} 50%,
    ${({ theme }) => theme.colors.backgroundLight} 75%
  );
  background-size: 200% 100%;
  animation: ${pulse} 1.5s ease-in-out infinite;
  border-radius: 4px;
  height: ${({ height = "1rem" }) => height};
  width: ${({ width = "100%" }) => width};
  margin-bottom: 0.75rem;
`;

interface LoadingSpinnerProps {
  message?: string;
  fullScreen?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = "Loading...",
  fullScreen = false,
}) => (
  <LoadingContainer
    fullScreen={fullScreen}
    role="status"
    aria-label="Loading content"
  >
    <Spinner />
    <LoadingText>{message}</LoadingText>
  </LoadingContainer>
);

interface SkeletonLoaderProps {
  lines?: number;
  avatar?: boolean;
}

export const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  lines = 3,
  avatar = false,
}) => (
  <SkeletonContainer role="status" aria-label="Loading content skeleton">
    {avatar && (
      <div
        style={{ display: "flex", alignItems: "center", marginBottom: "1rem" }}
      >
        <SkeletonLine
          width="60px"
          height="60px"
          style={{ borderRadius: "50%", marginRight: "1rem", marginBottom: 0 }}
        />
        <div style={{ flex: 1 }}>
          <SkeletonLine width="40%" height="1.25rem" />
          <SkeletonLine width="60%" height="1rem" />
        </div>
      </div>
    )}
    {Array.from({ length: lines }, (_, i) => (
      <SkeletonLine
        key={i}
        data-testid={`skeleton-line-${i}`}
        width={
          i === lines - 1 && lines > 1 ? `${Math.random() * 40 + 40}%` : "100%"
        }
      />
    ))}
  </SkeletonContainer>
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
