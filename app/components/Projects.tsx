"use client";

import Image from "next/image";
import { useState } from "react";

const Projects = () => {
  const projects = [
    {
      title: "Trevor Ui",
      description:
        "A modern React component library built with TypeScript, Tailwind CSS v4, and comprehensive testing",
      images: [
        "/projects/trevor-ui.png",
        "/projects/trevor-ui-2.png",
        "/projects/trevor-ui-3.png",
      ],
      tech: ["React", "TypeScript", "Tailwind CSS", "Comprehensive Testing"],
      features: [
        "Built with React and TypeScript for type safety and developer experience",
        "Customizable components with Tailwind CSS v4 for easy styling and theming",
        "Built with Next.js for expandability and seamless integration into modern React applications",
        "Solves personal need for a modern, well-designed component library that integrates seamlessly with Tailwind CSS",
      ],
      liveUrl: "https://trevorh2007.github.io/trevor-ui/",
      githubUrl: "https://github.com/trevorh2007/trevor-ui",
    },
    {
      title: "Wordle Clone",
      description:
        "A Wordle clone built with React and TypeScript, featuring words fetched from an open-source API and responsive design",
      images: [
        "/projects/wordle-clone-1.png",
        "/projects/wordle-clone-2.png",
        "/projects/wordle-clone-3.png",
      ],
      tech: [
        "React",
        "TypeScript",
        "Styled Components",
        "Jest",
        "React Testing Library",
      ],
      features: [
        "Built with React and TypeScript for a modern development experience",
        "API integration to fetch words and definitions, providing a dynamic and engaging gameplay experience",
        "Local storage stat tracking for wins, losses, and current streak, allowing players to track their progress over time",
        "Responsive design that works seamlessly on both desktop and mobile devices, ensuring an enjoyable gaming experience for all users",
      ],
      liveUrl: "https://trevorh2007.github.io/wordle-clone/",
      githubUrl: "https://github.com/trevorh2007/wordle-clone",
    },
    // Add more projects **coming soon**
  ];

  const [currentImageIndexes, setCurrentImageIndexes] = useState<
    Record<number, number>
  >({});

  const nextImage = (projectIndex: number, totalImages: number) => {
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [projectIndex]: ((prev[projectIndex] || 0) + 1) % totalImages,
    }));
  };

  const prevImage = (projectIndex: number, totalImages: number) => {
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [projectIndex]:
        ((prev[projectIndex] || 0) - 1 + totalImages) % totalImages,
    }));
  };

  const goToImage = (projectIndex: number, imageIndex: number) => {
    setCurrentImageIndexes((prev) => ({
      ...prev,
      [projectIndex]: imageIndex,
    }));
  };

  return (
    <section
      id="projects"
      className="px-6 py-16 sm:py-24 lg:px-8 bg-white dark:bg-gray-900"
    >
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl mb-4">
            Featured Projects
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Projects I&apos;ve built that showcase my skills and passion for
            development
          </p>
        </div>

        <div className="space-y-24">
          {projects.map((project, index) => {
            const currentImageIndex = currentImageIndexes[index] || 0;
            const totalImages = project.images.length;

            return (
              <div
                key={index}
                className={`flex flex-col ${
                  index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                } gap-8 lg:gap-12 items-center`}
              >
                {/* Project Image Carousel */}
                <div className="flex-1 w-full">
                  <div className="relative group">
                    <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-25 group-hover:opacity-40 transition duration-200" />
                    <div className="relative rounded-lg overflow-hidden shadow-xl bg-gray-100 dark:bg-gray-800">
                      <Image
                        src={
                          project.images[currentImageIndex] ||
                          project.images[0] ||
                          ""
                        }
                        alt={`${project.title} - Image ${currentImageIndex + 1}`}
                        width={600}
                        height={400}
                        className="w-full h-auto aspect-video object-cover object-top"
                      />
                    </div>

                    {/* Navigation Arrows */}
                    {totalImages > 1 && (
                      <>
                        <button
                          onClick={() => prevImage(index, totalImages)}
                          className="absolute left-2 md:-left-7 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-500/90 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors opacity-10 group-hover:opacity-100 border border-black dark:border-gray-600"
                          aria-label="Previous image"
                        >
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 19l-7-7 7-7"
                            />
                          </svg>
                        </button>
                        <button
                          onClick={() => nextImage(index, totalImages)}
                          className="absolute right-2 md:-right-7 top-1/2 -translate-y-1/2 bg-white/90 dark:bg-gray-500/90 p-2 rounded-full shadow-lg hover:bg-white dark:hover:bg-gray-700 transition-colors opacity-10 group-hover:opacity-100 border border-black dark:border-gray-600"
                          aria-label="Next image"
                        >
                          <svg
                            className="w-6 h-6 text-gray-800 dark:text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 5l7 7-7 7"
                            />
                          </svg>
                        </button>
                      </>
                    )}
                    {/* Image Indicators */}
                    {totalImages > 1 && (
                      <div className="absolute -bottom-5 md:-bottom-8 left-1/2 -translate-x-1/2 flex gap-2">
                        {project.images.map((_, imgIndex) => (
                          <button
                            key={imgIndex}
                            onClick={() => goToImage(index, imgIndex)}
                            className={`w-2 h-2 rounded-full transition-all ${
                              imgIndex === currentImageIndex
                                ? "bg-white w-8"
                                : "bg-white/50 hover:bg-white/75"
                            }`}
                            aria-label={`Go to image ${imgIndex + 1}`}
                          />
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Project Details */}
                <div className="flex-1 w-full">
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                    {project.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                      Key Features
                    </h4>
                    <ul className="space-y-2">
                      {project.features.map((feature, i) => (
                        <li
                          key={i}
                          className="flex items-start text-gray-600 dark:text-gray-400"
                        >
                          <svg
                            className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5 flex-shrink-0"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clipRule="evenodd"
                            />
                          </svg>
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech Stack */}
                  <div className="mb-6">
                    <h4 className="text-sm font-semibold text-gray-900 dark:text-white mb-3 uppercase tracking-wide">
                      Tech Stack
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded-full"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Links */}
                  <div className="flex flex-wrap gap-4">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                        />
                      </svg>
                      View Live
                    </a>
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 dark:bg-gray-700 text-white rounded-lg font-semibold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-200"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                      </svg>
                      View Code
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Projects;
