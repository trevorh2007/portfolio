import { render, screen } from "@testing-library/react";
import Home from "../page";

// Mock LandingPage component
jest.mock("../components/landingPage", () => {
  return function LandingPage() {
    return <div data-testid="landing-page">Landing Page Content</div>;
  };
});

describe("Home Page (Root)", () => {
  it("renders without crashing", () => {
    render(<Home />);
    expect(screen.getByTestId("landing-page")).toBeInTheDocument();
  });

  it("renders the LandingPage component", () => {
    render(<Home />);
    expect(screen.getByText("Landing Page Content")).toBeInTheDocument();
  });
});
