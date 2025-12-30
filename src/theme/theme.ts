import { createTheme, type Theme } from "@mui/material/styles";

// Helper function to get CSS variable value
const getCSSVariable = (varName: string): string => {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }
  return "";
};

export const createCustomTheme = (mode: "light" | "dark"): Theme => {
  return createTheme({
    palette: {
      mode,
      // Primary color - ganti di CSS variables
      primary: {
        main: getCSSVariable("--primary") || "#0ea5e9",
        contrastText: getCSSVariable("--primary-foreground") || "#ffffff",
      },
      // Secondary color - ganti di CSS variables
      secondary: {
        main: getCSSVariable("--secondary") || "#f1f5f9",
        contrastText: getCSSVariable("--secondary-foreground") || "#1e293b",
      },
      // Error/Destructive color - ganti di CSS variables
      error: {
        main: getCSSVariable("--destructive") || "#dc2626",
        contrastText: "#ffffff",
      },
      // Background colors - ganti di CSS variables
      background: {
        default: getCSSVariable("--background") || (mode === "dark" ? "#09090b" : "#fafafa"),
        paper: getCSSVariable("--card") || (mode === "dark" ? "#1a1a1e" : "#ffffff"),
      },
      // Text colors - ganti di CSS variables
      text: {
        primary: getCSSVariable("--foreground") || (mode === "dark" ? "#fafafa" : "#0f172a"),
        secondary: getCSSVariable("--muted-foreground") || (mode === "dark" ? "#a1a1aa" : "#64748b"),
      },
      // Border color - ganti di CSS variables
      divider: getCSSVariable("--border") || (mode === "dark" ? "#27272a" : "#e2e8f0"),
    },
    // Typography menggunakan CSS variable untuk font family
    typography: {
      fontFamily: "var(--font-sans)",
    },
    // Border radius default - bisa override di component level
    shape: {
      borderRadius: 8,
    },
    // Component overrides - minimal, hanya yang penting
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            fontWeight: 500,
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--card)",
            color: "var(--card-foreground)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--card)",
            color: "var(--card-foreground)",
            border: "1px solid var(--border)",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          paper: {
            backgroundColor: "var(--card)",
            borderColor: "var(--border)",
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
          },
        },
      },
    },
  });
};

export default createCustomTheme;
