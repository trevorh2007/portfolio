"use client";

import Link from "next/link";
import * as styles from "./styles";
import { useDarkModeContext } from "@/app/styles/Providers";

const NavBar = () => {
  const { darkMode, setDarkMode } = useDarkModeContext();
  return (
    <styles.NavBarWrapper>
      <Link href="/">Home</Link>
      <Link href="/contact">Contact page</Link>
      <button onClick={() => setDarkMode(!darkMode)}>
        {darkMode ? "Turn on the Lights" : "Turn off the lights"}
      </button>
    </styles.NavBarWrapper>
  );
};

export default NavBar;
