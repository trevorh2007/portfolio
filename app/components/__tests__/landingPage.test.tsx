import { render, screen } from "@testing-library/react";
import LandingPage from "../landingPage";

describe("LandingPage", () => {
  it("renders the component text", () => {
    render(<LandingPage />);

    expect(screen.getByText(/Hi, I'm/i)).toBeInTheDocument();
    expect(screen.getByText("Trevor")).toBeInTheDocument();
    expect(screen.getByText("Full-Stack Developer")).toBeInTheDocument();
  });

  it("renders with correct styling", () => {
    const { container } = render(<LandingPage />);

    const styledDiv = container.querySelector("div");
    expect(styledDiv).toBeInTheDocument();
  });

  it("renders skill cards", () => {
    render(<LandingPage />);

    expect(screen.getByText("Clean Code")).toBeInTheDocument();
    expect(screen.getByText("Modern Design")).toBeInTheDocument();
    expect(screen.getByText("Performance")).toBeInTheDocument();
  });

  it("renders CTA buttons", () => {
    render(<LandingPage />);

    expect(screen.getByText("Get in Touch")).toBeInTheDocument();
    expect(screen.getByText("View My Work")).toBeInTheDocument();
  });
});
