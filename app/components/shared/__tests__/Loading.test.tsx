import { render, screen } from "@testing-library/react";
import SuspenseFallback, { LoadingSpinner, SkeletonLoader } from "../Loading";

describe("Loading Components", () => {
  describe("LoadingSpinner", () => {
    it("renders with default message", () => {
      render(<LoadingSpinner />);

      expect(screen.getByText("Loading...")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("renders with custom message", () => {
      const customMessage = "Setting up timer...";
      render(<LoadingSpinner message={customMessage} />);

      expect(screen.getByText(customMessage)).toBeInTheDocument();
    });

    it("has correct accessibility attributes", () => {
      render(<LoadingSpinner />);

      const loadingElement = screen.getByRole("status");
      expect(loadingElement).toHaveAttribute("aria-label", "Loading content");
    });

    it("renders in fullScreen mode", () => {
      render(<LoadingSpinner fullScreen />);

      const loadingElement = screen.getByRole("status");
      expect(loadingElement).toBeInTheDocument();
    });
  });

  describe("SkeletonLoader", () => {
    it("renders default number of skeleton lines", () => {
      render(<SkeletonLoader />);

      // Default is 3 lines
      const skeletonLines = screen.getAllByTestId(/skeleton-line-\d+/);
      expect(skeletonLines).toHaveLength(3);
    });

    it("renders custom number of skeleton lines", () => {
      const customLines = 5;
      render(<SkeletonLoader lines={customLines} />);

      const skeletonLines = screen.getAllByTestId(/skeleton-line-\d+/);
      expect(skeletonLines).toHaveLength(customLines);
    });

    it("has correct accessibility attributes", () => {
      render(<SkeletonLoader />);

      const container = screen.getByRole("status");
      expect(container).toHaveAttribute(
        "aria-label",
        "Loading content skeleton",
      );
    });

    it("renders with avatar when requested", () => {
      render(<SkeletonLoader avatar />);

      const container = screen.getByRole("status");
      expect(container).toBeInTheDocument();
    });
  });

  describe("SuspenseFallback", () => {
    it("renders loading spinner with message", () => {
      render(<SuspenseFallback />);

      expect(screen.getByText("Loading content...")).toBeInTheDocument();
      expect(screen.getByRole("status")).toBeInTheDocument();
    });

    it("renders skeleton type when specified", () => {
      render(<SuspenseFallback type="skeleton" />);

      const skeletonLines = screen.getAllByTestId(/skeleton-line-\d+/);
      expect(skeletonLines.length).toBeGreaterThan(0);
    });

    it("renders skeleton with custom lines", () => {
      render(<SuspenseFallback type="skeleton" lines={5} />);

      const skeletonLines = screen.getAllByTestId(/skeleton-line-\d+/);
      expect(skeletonLines).toHaveLength(5);
    });

    it("renders skeleton with avatar", () => {
      render(<SuspenseFallback type="skeleton" avatar />);

      const container = screen.getByRole("status");
      expect(container).toBeInTheDocument();
    });
  });
});
