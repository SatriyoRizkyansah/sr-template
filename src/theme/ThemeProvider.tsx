import React from "react";
import { CssBaseline } from "@mui/material";
import { Experimental_CssVarsProvider as CssVarsProvider, useColorScheme } from "@mui/material/styles";
import { appTheme } from "./theme";

interface ThemeProviderProps {
  children: React.ReactNode;
}

const HtmlClassSync = () => {
  const { mode } = useColorScheme();

  React.useLayoutEffect(() => {
    if (!mode || typeof document === "undefined") {
      return;
    }

    const root = document.documentElement;
    root.classList.toggle("dark", mode === "dark");
  }, [mode]);

  return null;
};

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  return (
    <CssVarsProvider theme={appTheme} defaultMode="system" modeStorageKey="theme-mode" disableTransitionOnChange enableColorScheme>
      <CssBaseline />
      <HtmlClassSync />
      {children}
    </CssVarsProvider>
  );
};
