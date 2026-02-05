import { render, screen } from "@testing-library/react";
import Contact from "../page";

describe("Contact Page", () => {
  it("renders the contact page", () => {
    render(<Contact />);

    expect(screen.getByText("Contact page")).toBeInTheDocument();
  });
});
