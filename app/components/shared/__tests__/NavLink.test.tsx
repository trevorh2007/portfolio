import { render, screen } from "@testing-library/react";
import NavLink from "../NavLink";

// Mock Next.js Link component
jest.mock("next/link", () => {
  return function Link({
    children,
    href,
    ...props
  }: {
    children: React.ReactNode;
    href: string;
  }) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    );
  };
});

describe("NavLink", () => {
  describe("Desktop variant", () => {
    it("renders an active link without hover", () => {
      render(
        <NavLink
          href="/"
          label="Home"
          pathname="/"
          variant="desktop"
          hoveredPath={null}
        />,
      );

      const link = screen.getByText("Home");
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass("text-blue-600");
      expect(link).toHaveClass("border-blue-600");
    });

    it("renders an active link when another link is hovered", () => {
      // This tests line 32 - active link with hoveredPath set to different path
      render(
        <NavLink
          href="/"
          label="Home"
          pathname="/"
          variant="desktop"
          hoveredPath="/contact"
        />,
      );

      const link = screen.getByText("Home");
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass("text-blue-600");
      expect(link).toHaveClass("border-transparent");
    });

    it("renders an inactive link without hover", () => {
      render(
        <NavLink
          href="/projects"
          label="Projects"
          pathname="/"
          variant="desktop"
          hoveredPath={null}
        />,
      );

      const link = screen.getByText("Projects");
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass("text-gray-700");
      expect(link).toHaveClass("border-transparent");
    });

    it("renders a hovered link", () => {
      render(
        <NavLink
          href="/projects"
          label="Projects"
          pathname="/"
          variant="desktop"
          hoveredPath="/projects"
        />,
      );

      const link = screen.getByText("Projects");
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass("text-blue-600");
      expect(link).toHaveClass("border-blue-600");
    });
  });

  describe("Mobile variant", () => {
    it("renders an active mobile link", () => {
      render(<NavLink href="/" label="Home" pathname="/" variant="mobile" />);

      const link = screen.getByText("Home");
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass("bg-blue-50");
      expect(link).toHaveClass("font-semibold");
    });

    it("renders an inactive mobile link", () => {
      render(
        <NavLink
          href="/projects"
          label="Projects"
          pathname="/"
          variant="mobile"
        />,
      );

      const link = screen.getByText("Projects");
      expect(link).toBeInTheDocument();
      expect(link).toHaveClass("text-gray-700");
    });
  });
});
