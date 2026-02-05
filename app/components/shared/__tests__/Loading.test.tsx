import { lightTheme } from "@/app/styles/themes";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import SuspenseFallback, { LoadingSpinner, SkeletonLoader } from "../Loading";

// Test wrapper with theme
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);

describe("Loading Components", () => {
  describe("LoadingSpinner", () => {
    it("renders with default message", () => {
      render(
        <TestWrapper>
          <LoadingSpinner />
        </TestWrapper>
      );

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("renders with custom message", () => {
      const customMessage = "Setting up timer...";
      render(
        <TestWrapper>
          <LoadingSpinner message={customMessage} />
        </TestWrapper>
      );

      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it("has correct accessibility attributes", () => {
      render(
        <TestWrapper>
          <LoadingSpinner />
        </TestWrapper>
      );

      const loadingElement = screen.getByRole("status");
      expect(loadingElement).toHaveAttribute("aria-label", "Loading content");
    });

    it("renders in fullScreen mode", () => {
      render(
        <TestWrapper>
          <LoadingSpinner fullScreen />
        </TestWrapper>
      );

      const loadingElement = screen.getByRole("status");
      expect(loadingElement).toBeInTheDocument();
    });
  });

  describe("SkeletonLoader", () => {
    it("renders default number of skeleton lines", () => {
      render(
        <TestWrapper>
          <SkeletonLoader />
        </TestWrapper>
      );

      // Default is 3 lines
      const skeletonLines = screen.getAllByTestId(/skeleton-line-\d+/);
      expect(skeletonLines).toHaveLength(3);
    });

    it("renders custom number of skeleton lines", () => {
      const customLines = 5;
      render(
        <TestWrapper>
          <SkeletonLoader lines={customLines} />
        </TestWrapper>
      );

      const skeletonLines = screen.getAllByTestId(/skeleton-line-\d+/);
      expect(skeletonLines).toHaveLength(customLines);
    });

    it("has correct accessibility attributes", () => {
      render(
        <TestWrapper>
          <SkeletonLoader />
        </TestWrapper>
      );

      const container = screen.getByRole("status");
      expect(container).toHaveAttribute(
        "aria-label",
        "Loading content skeleton"
      );
    });

    it("renders with avatar when requested", () => {
      render(
        <TestWrapper>
          <SkeletonLoader avatar />
        </TestWrapper>
      );

      const container = screen.getByRole("status");
      expect(container).toBeInTheDocument();
    });
  });

  describe("SuspenseFallback", () => {
    it("renders loading spinner with message", () => {
      render(
        <TestWrapper>
          <SuspenseFallback />
        </TestWrapper>
      );

      expect(screen.getByText("Loading content...")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("renders skeleton type when specified", () => {
      render(
        <TestWrapper>
          <SuspenseFallback type="skeleton" />
        </TestWrapper>
      );

      const skeletonLines = screen.getAllByTestId(/skeleton-line-\d+/);
      expect(skeletonLines.length).toBeGreaterThan(0);
    });

    it("renders skeleton with custom lines", () => {
      render(
        <TestWrapper>
          <SuspenseFallback type="skeleton" lines={5} />
        </TestWrapper>
      );

      const skeletonLines = screen.getAllByTestId(/skeleton-line-\d+/);
      expect(skeletonLines).toHaveLength(5);
    });

    it("renders skeleton with avatar", () => {
      render(
        <TestWrapper>
          <SuspenseFallback type="skeleton" avatar />
        </TestWrapper>
      );

      const container = screen.getByRole("status");
      expect(container).toBeInTheDocument();
    });
  });
});
