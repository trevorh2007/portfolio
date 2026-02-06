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

    // Use getAllByText for technologies that appear in multiple projects
    const reactBadges = screen.getAllByText("React");
    const typescriptBadges = screen.getAllByText("TypeScript");

    // Both projects use React and TypeScript
    expect(reactBadges.length).toBeGreaterThanOrEqual(1);
    expect(typescriptBadges.length).toBeGreaterThanOrEqual(1);

    // Check for unique tech from first project
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

    const liveLinks = screen.getAllByRole("link", { name: /View Live/i });
    const codeLinks = screen.getAllByRole("link", { name: /View Code/i });

    // Test first project links
    expect(liveLinks[0]).toHaveAttribute(
      "href",
      "https://trevorh2007.github.io/trevor-ui/",
    );
    expect(liveLinks[0]).toHaveAttribute("target", "_blank");
    expect(liveLinks[0]).toHaveAttribute("rel", "noopener noreferrer");

    expect(codeLinks[0]).toHaveAttribute(
      "href",
      "https://github.com/trevorh2007/trevor-ui",
    );
    expect(codeLinks[0]).toHaveAttribute("target", "_blank");
    expect(codeLinks[0]).toHaveAttribute("rel", "noopener noreferrer");
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

    const prevButtons = screen.getAllByRole("button", {
      name: "Previous image",
    });
    const nextButtons = screen.getAllByRole("button", { name: "Next image" });

    // Should have arrows for each project with multiple images
    expect(prevButtons.length).toBeGreaterThan(0);
    expect(nextButtons.length).toBeGreaterThan(0);
  });

  it("shows dot indicators for multiple images", () => {
    render(<Projects />);

    const dots = screen.getAllByRole("button", { name: /Go to image \d+/ });

    // Should have dot indicators for projects with multiple images
    expect(dots.length).toBeGreaterThan(0);
  });

  it("navigates to next image when next button is clicked", () => {
    render(<Projects />);

    // Get the first project's next button
    const nextButtons = screen.getAllByRole("button", { name: "Next image" });
    fireEvent.click(nextButtons[0]!);

    const image = screen.getByAltText("Trevor Ui - Image 2");
    expect(image).toHaveAttribute("src", "/projects/trevor-ui-2.png");
  });

  it("navigates to previous image when prev button is clicked", () => {
    render(<Projects />);

    // Get the first project's prev button
    const prevButtons = screen.getAllByRole("button", {
      name: "Previous image",
    });
    fireEvent.click(prevButtons[0]!);

    // Should wrap to last image (image 3)
    const image = screen.getByAltText("Trevor Ui - Image 3");
    expect(image).toHaveAttribute("src", "/projects/trevor-ui-3.png");
  });

  it("navigates to specific image when dot indicator is clicked", () => {
    render(<Projects />);

    // Find dot indicators for first project (Trevor Ui)
    const allDots = screen.getAllByRole("button", { name: /Go to image \d+/ });
    // First project has 3 dots (images 1, 2, 3), click the 3rd one (index 2)
    fireEvent.click(allDots[2]!);

    const image = screen.getByAltText("Trevor Ui - Image 3");
    expect(image).toHaveAttribute("src", "/projects/trevor-ui-3.png");
  });

  it("cycles through all images correctly", () => {
    render(<Projects />);

    const nextButtons = screen.getAllByRole("button", { name: "Next image" });

    // Start at image 1, click next to go to image 2
    fireEvent.click(nextButtons[0]!);
    expect(screen.getByAltText("Trevor Ui - Image 2")).toBeInTheDocument();

    // Click next to go to image 3
    fireEvent.click(nextButtons[0]!);
    expect(screen.getByAltText("Trevor Ui - Image 3")).toBeInTheDocument();

    // Click next to wrap back to image 1
    fireEvent.click(nextButtons[0]!);
    expect(screen.getByAltText("Trevor Ui - Image 1")).toBeInTheDocument();
  });

  it("updates image when navigating back and forth", () => {
    render(<Projects />);

    const nextButtons = screen.getAllByRole("button", { name: "Next image" });
    const prevButtons = screen.getAllByRole("button", {
      name: "Previous image",
    });

    // Go forward
    fireEvent.click(nextButtons[0]!);
    expect(screen.getByAltText("Trevor Ui - Image 2")).toBeInTheDocument();

    // Go back
    fireEvent.click(prevButtons[0]!);
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

    const keyFeaturesHeadings = screen.getAllByText("Key Features");
    expect(keyFeaturesHeadings.length).toBeGreaterThanOrEqual(1);
  });

  it("renders Tech Stack section heading", () => {
    render(<Projects />);

    const techStackHeadings = screen.getAllByText("Tech Stack");
    expect(techStackHeadings.length).toBeGreaterThanOrEqual(1);
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
