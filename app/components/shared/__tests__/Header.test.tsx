import { fireEvent, render, screen } from "@testing-library/react";
import Header from "../Header";

// Mock the dark mode context
const mockSetDarkMode = jest.fn();
const mockUseDarkModeContext = jest.fn(() => ({
  darkMode: false,
  setDarkMode: mockSetDarkMode,
}));

jest.mock("@/app/providers", () => ({
  useDarkModeContext: () => mockUseDarkModeContext(),
}));

describe("Header", () => {
  beforeEach(() => {
    mockSetDarkMode.mockClear();
    mockUseDarkModeContext.mockReturnValue({
      darkMode: false,
      setDarkMode: mockSetDarkMode,
    });
  });

  it("renders the portfolio title", () => {
    render(<Header />);

    expect(screen.getByText("Trevor's Portfolio")).toBeInTheDocument();
  });

  it("calls setDarkMode when theme toggle button is clicked", () => {
    render(<Header />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    fireEvent.click(button);

    expect(mockSetDarkMode).toHaveBeenCalledWith(true);
  });

  it("handles null context with fallback values", () => {
    mockUseDarkModeContext.mockReturnValueOnce(
      null as unknown as { darkMode: boolean; setDarkMode: jest.Mock },
    );

    render(<Header />);

    const darkModeButton = screen.getByRole("button", {
      name: "Toggle dark mode",
    });
    fireEvent.click(darkModeButton);

    expect(mockSetDarkMode).not.toHaveBeenCalled();
  });

  it("renders sun icon when dark mode is enabled", () => {
    mockUseDarkModeContext.mockReturnValueOnce({
      darkMode: true,
      setDarkMode: mockSetDarkMode,
    });

    render(<Header />);

    const darkModeButton = screen.getByRole("button", {
      name: "Toggle dark mode",
    });
    const svgElement = darkModeButton.querySelector("svg");
    const pathWithFillRule = svgElement?.querySelector(
      'path[fill-rule="evenodd"]',
    );

    expect(pathWithFillRule).toBeInTheDocument();
  });

  it("renders moon icon when dark mode is disabled", () => {
    render(<Header />);

    const darkModeButton = screen.getByRole("button", {
      name: "Toggle dark mode",
    });
    const svgElement = darkModeButton.querySelector("svg");
    const paths = svgElement?.querySelectorAll("path");

    expect(paths?.length).toBe(1);
  });
});
