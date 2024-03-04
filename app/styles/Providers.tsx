"use client";
import StyledComponentsRegistry from "./registry";
import { ThemeProvider } from "styled-components";
import { createContext, useContext, useState } from "react";
import { lightTheme, darkTheme } from "./themes";

const DarkModeContext = createContext<any>(undefined);

export function Providers({ children }: { children: React.ReactNode }) {
  const [darkMode, setDarkMode] = useState(false);

  let currentTheme = !darkMode ? lightTheme : darkTheme;

  return (
    <DarkModeContext.Provider value={{ darkMode, setDarkMode }}>
      <StyledComponentsRegistry>
        <ThemeProvider theme={currentTheme}>{children}</ThemeProvider>
      </StyledComponentsRegistry>
    </DarkModeContext.Provider>
  );
}

export const useDarkModeContext = () => {
  return useContext(DarkModeContext);
};
