"use client";

import { createContext, useContext, useEffect, useState } from "react";

const DarkModeContext = createContext<
  | {
      darkMode: boolean;
      setDarkMode: React.Dispatch<React.SetStateAction<boolean>>;
    }
  | undefined
>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(true);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      if (darkMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [darkMode, mounted]);

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      {children}
    </DarkModeContext.Provider>
  );
}

export const useDarkModeContext = () => {
  return useContext(DarkModeContext);
};
