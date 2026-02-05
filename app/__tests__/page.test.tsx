import { lightTheme } from "@/app/styles/themes";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import Home from "../page";

// Test wrapper with theme
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);

// Mock AnotherComponent to avoid styled-components complexity
jest.mock("../components/anotherComponent", () => {
  return function AnotherComponent() {
    return <div>Mocked Another Component</div>;
  };
});

describe("Home Page", () => {
  it("renders the home page", () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders AnotherComponent", () => {
    render(
      <TestWrapper>
        <Home />
      </TestWrapper>
    );

    expect(screen.getByText("Mocked Another Component")).toBeInTheDocument();
  });
});
