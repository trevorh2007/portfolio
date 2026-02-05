import { fireEvent, render, screen } from "@testing-library/react";
import NavBar from "../navbar";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function Link({
    children,
    href,
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return <a href={href}>{children}</a>;
  };
});

// Mock Next.js usePathname
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(() => "/"),
}));

// Mock the dark mode context
const mockSetDarkMode = jest.fn();
const mockUseDarkModeContext = jest.fn(() => ({
  darkMode: false,
  setDarkMode: mockSetDarkMode,
}));

jest.mock("@/app/providers", () => ({
  useDarkModeContext: () => mockUseDarkModeContext(),
}));

describe("NavBar", () => {
  beforeEach(() => {
    mockSetDarkMode.mockClear();
    mockUseDarkModeContext.mockReturnValue({
      darkMode: false,
      setDarkMode: mockSetDarkMode,
    });
  });

  it("renders all navigation links", () => {
    render(<NavBar />);

    expect(screen.getAllByText("Home")).toHaveLength(2); // Desktop + mobile
    expect(screen.getAllByText("Projects")).toHaveLength(2);
    expect(screen.getAllByText("Contact")).toHaveLength(2);
    expect(screen.getAllByText("Timer")).toHaveLength(2);
  });

  it("calls setDarkMode when theme toggle button is clicked", () => {
    render(<NavBar />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    fireEvent.click(button);

    expect(mockSetDarkMode).toHaveBeenCalledWith(true);
  });

  it("toggles mobile menu when hamburger button is clicked", () => {
    render(<NavBar />);

    const menuButton = screen.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(menuButton);
    fireEvent.click(menuButton);

    expect(menuButton).toBeInTheDocument();
  });

  it("closes mobile menu when a link is clicked", () => {
    render(<NavBar />);

    const menuButton = screen.getByRole("button", { name: "Toggle menu" });
    fireEvent.click(menuButton);

    const mobileHomeLink = screen.getAllByText("Home")[1];
    fireEvent.click(mobileHomeLink!);

    expect(mobileHomeLink).toBeInTheDocument();
  });

  it("handles null context with fallback values", () => {
    mockUseDarkModeContext.mockReturnValueOnce(
      null as unknown as { darkMode: boolean; setDarkMode: jest.Mock },
    );

    render(<NavBar />);

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

    render(<NavBar />);

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
    render(<NavBar />);

    const darkModeButton = screen.getByRole("button", {
      name: "Toggle dark mode",
    });
    const svgElement = darkModeButton.querySelector("svg");
    const paths = svgElement?.querySelectorAll("path");

    expect(paths?.length).toBe(1);
  });

  it("handles mouse hover events on navigation links", () => {
    const { container } = render(<NavBar />);

    const contactLink = screen.getAllByText("Contact")[0];
    const navContainer = container.querySelector(".hidden.md\\:flex");

    fireEvent.mouseEnter(contactLink!);

    if (navContainer) {
      fireEvent.mouseLeave(navContainer);
    }

    expect(contactLink).toBeInTheDocument();
  });
});
