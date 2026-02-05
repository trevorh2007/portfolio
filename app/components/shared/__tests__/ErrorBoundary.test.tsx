import { lightTheme } from "@/app/styles/themes";
import { fireEvent, render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import ErrorBoundary from "../ErrorBoundary";

// Mock the isDevelopment utility
jest.mock("@/app/utils/env", () => ({
  isDevelopment: jest.fn(() => false),
}));

// Test wrapper with theme
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);

// Component that throws an error
const ThrowError = ({ shouldThrow }: { shouldThrow: boolean }) => {
  if (shouldThrow) {
    throw new Error("Test error");
  }
  return <div>No error</div>;
};

// Mock console.error to avoid noise in tests
const originalError = console.error;
beforeAll(() => {
  console.error = jest.fn();
});

afterAll(() => {
  console.error = originalError;
});

describe("ErrorBoundary", () => {
  it("renders children when there is no error", () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow={false} />
        </ErrorBoundary>
      </TestWrapper>,
    );

    expect(screen.getByText("No error")).toBeInTheDocument();
  });

  it("displays error UI when child component throws", () => {
    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow />
        </ErrorBoundary>
      </TestWrapper>,
    );

    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();
    expect(
      screen.getByText(
        "We encountered an unexpected error. Please try refreshing the page or contact support if the problem persists.",
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Try Again" }),
    ).toBeInTheDocument();
  });

  it("displays custom fallback when provided", () => {
    const customFallback = <div>Custom error message</div>;

    render(
      <TestWrapper>
        <ErrorBoundary fallback={customFallback}>
          <ThrowError shouldThrow />
        </ErrorBoundary>
      </TestWrapper>,
    );

    expect(screen.getByText("Custom error message")).toBeInTheDocument();
    expect(
      screen.queryByText("Oops! Something went wrong"),
    ).not.toBeInTheDocument();
  });

  it("allows retry functionality", () => {
    let shouldThrow = true;

    const TestComponent = () => {
      if (shouldThrow) {
        throw new Error("Test error");
      }
      return <div>No error</div>;
    };

    render(
      <TestWrapper>
        <ErrorBoundary>
          <TestComponent />
        </ErrorBoundary>
      </TestWrapper>,
    );

    // Error should be displayed
    expect(screen.getByText("Oops! Something went wrong")).toBeInTheDocument();

    // Fix the component so it won't throw again
    shouldThrow = false;

    // Click retry button
    fireEvent.click(screen.getByRole("button", { name: "Try Again" }));

    // Component should render successfully now
    expect(screen.getByText("No error")).toBeInTheDocument();
  });

  it("logs error in production mode", () => {
    const originalEnv = process.env.NODE_ENV;
    Object.defineProperty(process.env, "NODE_ENV", {
      value: "production",
      configurable: true,
    });

    const mockConsoleError = jest.fn();
    console.error = mockConsoleError;

    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow />
        </ErrorBoundary>
      </TestWrapper>,
    );

    expect(mockConsoleError).toHaveBeenCalled();
    Object.defineProperty(process.env, "NODE_ENV", {
      value: originalEnv,
      configurable: true,
    });
  });

  it("displays error details in development mode", () => {
    // Mock isDevelopment to return true
    const { isDevelopment } = require("@/app/utils/env");
    isDevelopment.mockReturnValue(true);

    render(
      <TestWrapper>
        <ErrorBoundary>
          <ThrowError shouldThrow />
        </ErrorBoundary>
      </TestWrapper>,
    );

    const details = screen.getByText("Error Details (Development Only)");
    expect(details).toBeInTheDocument();

    // Reset mock
    isDevelopment.mockReturnValue(false);
  });
});
