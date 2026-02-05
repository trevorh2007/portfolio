import { lightTheme } from "@/app/styles/themes";
import { render, screen } from "@testing-library/react";
import { ThemeProvider } from "styled-components";
import AnotherComponent from "../anotherComponent";

// Test wrapper with theme
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider theme={lightTheme}>{children}</ThemeProvider>
);

describe("AnotherComponent", () => {
  it("renders the component text", () => {
    render(
      <TestWrapper>
        <AnotherComponent />
      </TestWrapper>
    );

    expect(screen.getByText("Just another component")).toBeInTheDocument();
  });

  it("renders with correct styling", () => {
    const { container } = render(
      <TestWrapper>
        <AnotherComponent />
      </TestWrapper>
    );

    const styledDiv = container.querySelector("div");
    expect(styledDiv).toBeInTheDocument();
  });
});
