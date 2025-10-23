export const lightTheme = {
  colors: {
    primary: "#000",
    background: "#FFF",
    backgroundLight: "#999",
    buttonBackground: "#ababab",
    border: "#000",
    text: "#000",
  },
};

export const darkTheme = {
  colors: {
    primary: "#363537",
    background: "#222",
    backgroundLight: "#555",
    buttonBackground: "#999",
    border: "#FAFAFA",
    text: "#FFF",
  },
};

// Export the theme type for TypeScript
export const theme = lightTheme;
export type Theme = typeof theme;
