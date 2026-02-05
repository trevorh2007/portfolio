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
jest.mock("@/app/providers", () => ({
  useDarkModeContext: () => ({
    darkMode: false,
    setDarkMode: mockSetDarkMode,
  }),
}));

describe("NavBar", () => {
  beforeEach(() => {
    mockSetDarkMode.mockClear();
  });

  it("renders all navigation links", () => {
    render(<NavBar />);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Contact")).toBeInTheDocument();
    expect(screen.getByText("Timer")).toBeInTheDocument();
  });

  it("renders theme toggle button with aria-label", () => {
    render(<NavBar />);

    expect(
      screen.getByRole("button", { name: "Toggle dark mode" }),
    ).toBeInTheDocument();
  });

  it("calls setDarkMode when theme toggle button is clicked", () => {
    render(<NavBar />);

    const button = screen.getByRole("button", { name: "Toggle dark mode" });
    fireEvent.click(button);

    expect(mockSetDarkMode).toHaveBeenCalledTimes(1);
    expect(mockSetDarkMode).toHaveBeenCalledWith(true);
  });

  it("has correct href attributes for links", () => {
    render(<NavBar />);

    const homeLink = screen.getByText("Home").closest("a");
    const contactLink = screen.getByText("Contact").closest("a");
    const timerLink = screen.getByText("Timer").closest("a");

    expect(homeLink).toHaveAttribute("href", "/");
    expect(contactLink).toHaveAttribute("href", "/contact");
    expect(timerLink).toHaveAttribute("href", "/timer");
  });

  it("handles mouse hover events on navigation links", () => {
    render(<NavBar />);

    const contactLink = screen.getByText("Contact");

    // Hover over contact link
    fireEvent.mouseEnter(contactLink);
    expect(contactLink).toBeInTheDocument();

    // Leave the nav area
    const navContainer = screen.getByText("Contact").parentElement;
    if (navContainer) {
      fireEvent.mouseLeave(navContainer);
    }
  });
});
