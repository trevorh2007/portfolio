import { fireEvent, render, screen } from "@testing-library/react";
import Projects from "../Projects";

// Mock Next.js Image component
jest.mock("next/image", () => ({
  __esModule: true,
  default: (props: React.ImgHTMLAttributes<HTMLImageElement>) => {
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    return <img {...props} />;
  },
}));

describe("Projects", () => {
  it("renders the projects section", () => {
    render(<Projects />);

    expect(screen.getByText("Featured Projects")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Projects I've built that showcase my skills and passion for development",
      ),
    ).toBeInTheDocument();
  });

  it("renders project details", () => {
    render(<Projects />);

    expect(screen.getByText("Trevor Ui")).toBeInTheDocument();
    expect(
      screen.getByText(
        /A modern React component library built with TypeScript/i,
      ),
    ).toBeInTheDocument();
  });

  it("renders tech stack badges", () => {
    render(<Projects />);

    expect(screen.getByText("React")).toBeInTheDocument();
    expect(screen.getByText("TypeScript")).toBeInTheDocument();
    expect(screen.getByText("Tailwind CSS")).toBeInTheDocument();
    expect(screen.getByText("Comprehensive Testing")).toBeInTheDocument();
  });

  it("renders project features", () => {
    render(<Projects />);

    expect(
      screen.getByText(/Built with React and TypeScript for type safety/i),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Customizable components with Tailwind CSS v4/i),
    ).toBeInTheDocument();
  });

  it("renders project links with correct attributes", () => {
    render(<Projects />);

    const liveLink = screen.getByRole("link", { name: /View Live/i });
    const codeLink = screen.getByRole("link", { name: /View Code/i });

    expect(liveLink).toHaveAttribute(
      "href",
      "https://trevorh2007.github.io/trevor-ui/",
    );
    expect(liveLink).toHaveAttribute("target", "_blank");
    expect(liveLink).toHaveAttribute("rel", "noopener noreferrer");

    expect(codeLink).toHaveAttribute(
      "href",
      "https://github.com/trevorh2007/trevor-ui",
    );
    expect(codeLink).toHaveAttribute("target", "_blank");
    expect(codeLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("renders image with correct attributes", () => {
    render(<Projects />);

    const image = screen.getByAltText("Trevor Ui - Image 1");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/projects/trevor-ui.png");
    expect(image).toHaveAttribute("width", "600");
    expect(image).toHaveAttribute("height", "400");
  });

  it("shows navigation arrows for multiple images", () => {
    render(<Projects />);

    const prevButton = screen.getByRole("button", { name: "Previous image" });
    const nextButton = screen.getByRole("button", { name: "Next image" });

    expect(prevButton).toBeInTheDocument();
    expect(nextButton).toBeInTheDocument();
  });

  it("shows dot indicators for multiple images", () => {
    render(<Projects />);

    const dot1 = screen.getByRole("button", { name: "Go to image 1" });
    const dot2 = screen.getByRole("button", { name: "Go to image 2" });
    const dot3 = screen.getByRole("button", { name: "Go to image 3" });

    expect(dot1).toBeInTheDocument();
    expect(dot2).toBeInTheDocument();
    expect(dot3).toBeInTheDocument();
  });

  it("navigates to next image when next button is clicked", () => {
    render(<Projects />);

    const nextButton = screen.getByRole("button", { name: "Next image" });
    fireEvent.click(nextButton);

    const image = screen.getByAltText("Trevor Ui - Image 2");
    expect(image).toHaveAttribute("src", "/projects/trevor-ui-2.png");
  });

  it("navigates to previous image when prev button is clicked", () => {
    render(<Projects />);

    const prevButton = screen.getByRole("button", { name: "Previous image" });
    fireEvent.click(prevButton);

    // Should wrap to last image (image 3)
    const image = screen.getByAltText("Trevor Ui - Image 3");
    expect(image).toHaveAttribute("src", "/projects/trevor-ui-3.png");
  });

  it("navigates to specific image when dot indicator is clicked", () => {
    render(<Projects />);

    const dot3 = screen.getByRole("button", { name: "Go to image 3" });
    fireEvent.click(dot3);

    const image = screen.getByAltText("Trevor Ui - Image 3");
    expect(image).toHaveAttribute("src", "/projects/trevor-ui-3.png");
  });

  it("cycles through all images correctly", () => {
    render(<Projects />);

    const nextButton = screen.getByRole("button", { name: "Next image" });

    // Start at image 1, click next to go to image 2
    fireEvent.click(nextButton);
    expect(screen.getByAltText("Trevor Ui - Image 2")).toBeInTheDocument();

    // Click next to go to image 3
    fireEvent.click(nextButton);
    expect(screen.getByAltText("Trevor Ui - Image 3")).toBeInTheDocument();

    // Click next to wrap back to image 1
    fireEvent.click(nextButton);
    expect(screen.getByAltText("Trevor Ui - Image 1")).toBeInTheDocument();
  });

  it("updates image when navigating back and forth", () => {
    render(<Projects />);

    const nextButton = screen.getByRole("button", { name: "Next image" });
    const prevButton = screen.getByRole("button", { name: "Previous image" });

    // Go forward
    fireEvent.click(nextButton);
    expect(screen.getByAltText("Trevor Ui - Image 2")).toBeInTheDocument();

    // Go back
    fireEvent.click(prevButton);
    expect(screen.getByAltText("Trevor Ui - Image 1")).toBeInTheDocument();
  });

  it("renders the gradient border effect", () => {
    const { container } = render(<Projects />);

    const gradientDiv = container.querySelector(
      ".bg-gradient-to-r.from-blue-600.to-purple-600",
    );
    expect(gradientDiv).toBeInTheDocument();
  });

  it("renders Key Features section heading", () => {
    render(<Projects />);

    expect(screen.getByText("Key Features")).toBeInTheDocument();
  });

  it("renders Tech Stack section heading", () => {
    render(<Projects />);

    expect(screen.getByText("Tech Stack")).toBeInTheDocument();
  });

  it("applies correct styling classes to project image", () => {
    render(<Projects />);

    const image = screen.getByAltText("Trevor Ui - Image 1");
    expect(image).toHaveClass(
      "w-full",
      "h-auto",
      "aspect-video",
      "object-cover",
      "object-top",
    );
  });
});
