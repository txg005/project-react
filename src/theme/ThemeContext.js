import React, { createContext, useMemo, useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";

export const ThemeContext = createContext();

export const CustomThemeProvider = ({ children }) => {
  const storedMode = localStorage.getItem("themeMode") || "light";
  const [mode, setMode] = useState(storedMode);

  useEffect(() => {
    document.body.classList.toggle("dark-mode", mode === "dark");
    localStorage.setItem("themeMode", mode);
    document.body.style.transition = "background-color 0.3s ease, color 0.3s ease";
    if (mode === "dark") {
      document.body.style.backgroundColor = "#1c1c1c";
      document.body.style.color = "#f5f5f5";
    } else {
      document.body.style.backgroundColor = "#f9f9f9";
      document.body.style.color = "#000";
    }
  }, [mode]);

  const toggleTheme = () => {
    setMode((prev) => (prev === "light" ? "dark" : "light"));
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: { default: "#f9f9f9", paper: "#fff" },
                text: { primary: "#000" },
              }
            : {
                background: { default: "#1c1c1c", paper: "#2a2a2a" },
                text: { primary: "#f5f5f5" },
              }),
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};
