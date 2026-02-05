"use client";

import { useDarkModeContext } from "@/app/providers";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const NavBar = () => {
  const pathname = usePathname();
  const [hoveredPath, setHoveredPath] = useState<string | null>(null);
  const { darkMode, setDarkMode } = useDarkModeContext() || {
    darkMode: false,
    setDarkMode: () => {},
  };

  const getLinkClassName = (path: string) => {
    const isActive = pathname === path;
    const isHovered = hoveredPath === path;
    const showBorder = isHovered || (isActive && !hoveredPath);

    const baseClasses =
      "px-4 h-full flex items-center hover:text-blue-600 dark:hover:text-blue-400 transition-colors duration-200 font-medium border-b-2";
    const activeClasses = showBorder
      ? "text-blue-600 dark:text-blue-400 border-blue-600 dark:border-blue-400"
      : isActive
        ? "text-blue-600 dark:text-blue-400 border-transparent"
        : "text-gray-700 dark:text-gray-200 border-transparent";
    const inactiveClasses =
      "text-gray-700 dark:text-gray-200 border-transparent";

    return `${baseClasses} ${isActive || isHovered ? activeClasses : inactiveClasses}`;
  };

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-800 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-16">
          {/* Logo/Brand */}
          <div className="flex-shrink-0">
            <Link
              href="/"
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent hover:from-blue-500 hover:to-purple-500 transition-all duration-300"
            >
              Trevor&apos;s Portfolio
            </Link>
          </div>

          {/* Navigation Links */}
          <div
            className="hidden md:flex items-center ml-8 h-full"
            onMouseLeave={() => setHoveredPath(null)}
          >
            <Link
              href="/"
              className={getLinkClassName("/")}
              onMouseEnter={() => setHoveredPath("/")}
            >
              Home
            </Link>
            <Link
              href="/contact"
              className={getLinkClassName("/contact")}
              onMouseEnter={() => setHoveredPath("/contact")}
            >
              Contact
            </Link>
            <Link
              href="/timer"
              className={getLinkClassName("/timer")}
              onMouseEnter={() => setHoveredPath("/timer")}
            >
              Timer
            </Link>
          </div>

          {/* Dark Mode Toggle */}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="group relative p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 ml-auto"
            aria-label="Toggle dark mode"
          >
            {darkMode ? (
              <svg
                className="w-6 h-6 text-yellow-500 group-hover:text-yellow-400 transition-colors"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-gray-700 group-hover:text-blue-600 transition-colors"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};

export default NavBar;
