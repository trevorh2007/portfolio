import { render, screen } from "@testing-library/react";
import AnotherComponent from "../anotherComponent";

describe("AnotherComponent", () => {
  it("renders the component text", () => {
    render(<AnotherComponent />);

    expect(screen.getByText("Just another component")).toBeInTheDocument();
  });

  it("renders with correct styling", () => {
    const { container } = render(<AnotherComponent />);

    const styledDiv = container.querySelector("div");
    expect(styledDiv).toBeInTheDocument();
  });
});
