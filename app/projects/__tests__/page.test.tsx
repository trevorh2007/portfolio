import { render, screen } from "@testing-library/react";
import ProjectsPage from "../page";

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

describe("ProjectsPage", () => {
  it("renders the coming soon heading", () => {
    render(<ProjectsPage />);

    expect(screen.getByText("Coming Soon")).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<ProjectsPage />);

    expect(
      screen.getByText(/I'm working on showcasing my projects/i),
    ).toBeInTheDocument();
  });

  it("renders back to home link with correct href", () => {
    render(<ProjectsPage />);

    const backLink = screen.getByText("Back to Home").closest("a");
    expect(backLink).toHaveAttribute("href", "/");
  });

  it("renders with correct layout classes", () => {
    const { container } = render(<ProjectsPage />);

    const mainDiv = container.firstChild as HTMLElement;
    expect(mainDiv).toHaveClass("min-h-screen");
    expect(mainDiv).toHaveClass("flex");
    expect(mainDiv).toHaveClass("items-center");
    expect(mainDiv).toHaveClass("justify-center");
  });
});
