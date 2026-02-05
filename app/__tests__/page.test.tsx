import { render, screen } from "@testing-library/react";
import Home from "../page";

// Mock AnotherComponent to avoid complexity
jest.mock("../components/anotherComponent", () => {
  return function AnotherComponent() {
    return <div>Mocked Another Component</div>;
  };
});

describe("Home Page", () => {
  it("renders the home page", () => {
    render(<Home />);

    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it("renders AnotherComponent", () => {
    render(<Home />);

    expect(screen.getByText("Mocked Another Component")).toBeInTheDocument();
  });
});
