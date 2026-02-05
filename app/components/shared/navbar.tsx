"use client";

import { useDarkModeContext } from "@/app/providers";
import Link from "next/link";

const NavBar = () => {
  const { darkMode, setDarkMode } = useDarkModeContext() || {
    darkMode: false,
    setDarkMode: () => {},
  };

  return (
    <nav className="flex items-center gap-8 p-4 bg-gray-100 dark:bg-gray-700">
      <Link
        href="/"
        className="text-3xl text-white no-underline hover:text-blue-400 transition-colors"
      >
        Home
      </Link>
      <Link
        href="/contact"
        className="text-3xl text-white no-underline hover:text-blue-400 transition-colors"
      >
        Contact page
      </Link>
      <Link
        href="/timer"
        className="text-3xl text-white no-underline hover:text-blue-400 transition-colors"
      >
        Timer
      </Link>
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="ml-auto px-4 py-2 bg-gray-200 dark:bg-gray-600 border-2 border-gray-300 dark:border-gray-500 rounded-lg text-gray-900 dark:text-gray-100 hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors"
      >
        {darkMode ? "Turn on the Lights" : "Turn off the lights"}
      </button>
    </nav>
  );
};

export default NavBar;
