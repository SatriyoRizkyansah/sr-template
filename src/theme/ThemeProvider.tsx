import React, { useEffect, useState } from "react";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { createCustomTheme } from "./theme";
import { ThemeContext, type ThemeMode } from "./ThemeContext";

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [mode, setMode] = useState<ThemeMode>(() => {
    // Check localStorage first
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("theme-mode");
      if (saved === "light" || saved === "dark") {
        return saved;
      }
      // Fallback to system preference
      return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
    }
    return "light";
  });

  const toggleColorMode = () => {
    setMode((prevMode) => {
      const newMode = prevMode === "light" ? "dark" : "light";

      // Update localStorage
      if (typeof window !== "undefined") {
        localStorage.setItem("theme-mode", newMode);

        // Update HTML class for CSS variables
        if (newMode === "dark") {
          document.documentElement.classList.add("dark");
        } else {
          document.documentElement.classList.remove("dark");
        }
      }

      return newMode;
    });
  };

  // Apply theme class on mount and mode change
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (mode === "dark") {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
  }, [mode]);

  // Listen for system theme changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
      const handleChange = (e: MediaQueryListEvent) => {
        // Only update if no saved preference
        if (!localStorage.getItem("theme-mode")) {
          const newMode = e.matches ? "dark" : "light";
          setMode(newMode);
        }
      };

      mediaQuery.addEventListener("change", handleChange);
      return () => mediaQuery.removeEventListener("change", handleChange);
    }
  }, []);

  const theme = React.useMemo(() => createCustomTheme(mode), [mode]);

  const contextValue = React.useMemo(
    () => ({
      mode,
      toggleColorMode,
    }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={contextValue}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </ThemeContext.Provider>
  );
};
