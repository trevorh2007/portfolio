import { render, screen } from "@testing-library/react";

// Simple test component
const TestComponent = () => <div>Hello World</div>;

describe("Basic Test Suite", () => {
  it("should render hello world", () => {
    render(<TestComponent />);
    expect(screen.getByText("Hello World")).toBeInTheDocument();
  });

  it("should do basic math", () => {
    expect(2 + 2).toBe(4);
  });
});
