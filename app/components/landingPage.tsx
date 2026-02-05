"use client";

import Link from "next/link";
import SkillCard from "./SkillCard";

const LandingPage = () => {
  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-gray-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Hero Section */}
      <section className="relative px-6 py-20 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          {/* Main Heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl lg:text-7xl">
            Hi, I&apos;m{" "}
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
              Trevor
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mb-4 text-2xl font-semibold text-gray-700 dark:text-gray-300 sm:text-3xl">
            Full-Stack Developer
          </p>

          {/* Description */}
          <p className="mx-auto mb-10 max-w-2xl text-lg leading-8 text-gray-600 dark:text-gray-400">
            I build exceptional digital experiences that combine clean code,
            modern design, and user-centered thinking. Passionate about creating
            scalable solutions that make a difference.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/contact"
              className="rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              Get in Touch
            </Link>
            <a
              href="#projects"
              className="rounded-lg bg-gray-100 dark:bg-gray-800 px-8 py-3 text-base font-semibold text-gray-900 dark:text-white shadow-md ring-1 ring-inset ring-gray-300 dark:ring-gray-700 transition-all duration-200 hover:bg-gray-200 dark:hover:bg-gray-700 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
            >
              View My Work
            </a>
          </div>
        </div>

        {/* Decorative gradient orbs */}
        <div
          className="absolute left-1/2 top-0 -z-10 -translate-x-1/2 blur-3xl xl:-top-6"
          aria-hidden="true"
        >
          <div
            className="aspect-[1155/678] w-[36rem] sm:w-[72.1875rem] bg-gradient-to-tr from-blue-400 to-purple-400 opacity-20 dark:opacity-10"
            style={{
              clipPath:
                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
            }}
          />
        </div>
      </section>

      {/* Skills Highlights */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            What I Bring to the Table
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <SkillCard
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              }
              iconBgColor="bg-blue-100 dark:bg-blue-900/30"
              iconColor="text-blue-600 dark:text-blue-400"
              title="Clean Code"
              description="Writing maintainable, scalable, and well-documented code that stands the test of time."
            />
            <SkillCard
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01"
                  />
                </svg>
              }
              iconBgColor="bg-purple-100 dark:bg-purple-900/30"
              iconColor="text-purple-600 dark:text-purple-400"
              title="Modern Design"
              description="Creating beautiful, intuitive interfaces that users love and businesses value."
            />
            <SkillCard
              icon={
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              }
              iconBgColor="bg-green-100 dark:bg-green-900/30"
              iconColor="text-green-600 dark:text-green-400"
              title="Performance"
              description="Optimizing every aspect to deliver fast, responsive experiences that exceed expectations."
            />
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 py-16 lg:px-8">
        <div className="mx-auto max-w-5xl text-center">
          <h3 className="mb-8 text-xl font-semibold text-gray-600 dark:text-gray-400">
            Technologies I work with
          </h3>
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              "React",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Node.js",
              "MS SQL",
              ".NET",
              "C#",
            ].map((tech) => (
              <div
                key={tech}
                className="rounded-lg bg-gray-50 dark:bg-gray-800 px-6 py-3 text-sm font-medium text-gray-700 dark:text-gray-300 shadow-md ring-1 ring-gray-200 dark:ring-gray-700 transition-all duration-200 hover:shadow-lg hover:-translate-y-0.5"
              >
                {tech}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="px-6 py-16 sm:py-24 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="mb-6 text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            Let&apos;s Build Something Amazing
          </h2>
          <p className="mb-10 text-lg text-gray-600 dark:text-gray-400">
            I&apos;m always interested in hearing about new opportunities and
            exciting projects. Whether you have a question or just want to say
            hi, I&apos;ll try my best to get back to you!
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 px-8 py-3 text-base font-semibold text-white shadow-lg transition-all duration-200 hover:shadow-xl hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:focus:ring-offset-gray-900"
          >
            Start a Conversation
            <svg
              className="ml-2 h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;
