import { createTheme, type Theme } from "@mui/material/styles";

// Helper function to get CSS variable value
const getCSSVariable = (varName: string): string => {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement)
      .getPropertyValue(varName)
      .trim();
  }
  return "";
};

export const createCustomTheme = (mode: "light" | "dark"): Theme => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: getCSSVariable("--primary") || "#0ea5e9",
        contrastText: getCSSVariable("--primary-foreground") || "#ffffff",
      },
      secondary: {
        main: getCSSVariable("--secondary") || "#f1f5f9",
        contrastText: getCSSVariable("--secondary-foreground") || "#1e293b",
      },
      error: {
        main: getCSSVariable("--destructive") || "#dc2626",
        contrastText: "#ffffff",
      },
      warning: {
        main: getCSSVariable("--chart-4") || "#eab308",
        contrastText: "#ffffff",
      },
      info: {
        main: getCSSVariable("--chart-2") || "#8b5cf6",
        contrastText: "#ffffff",
      },
      success: {
        main: getCSSVariable("--chart-1") || "#0ea5e9",
        contrastText: "#ffffff",
      },
      background: {
        default: getCSSVariable("--background") || (mode === "dark" ? "#09090b" : "#fafafa"),
        paper: getCSSVariable("--card") || (mode === "dark" ? "#1a1a1e" : "#ffffff"),
      },
      text: {
        primary: getCSSVariable("--foreground") || (mode === "dark" ? "#fafafa" : "#0f172a"),
        secondary: getCSSVariable("--muted-foreground") || (mode === "dark" ? "#a1a1aa" : "#64748b"),
      },
      divider: getCSSVariable("--border") || (mode === "dark" ? "#27272a" : "#e2e8f0"),
      action: {
        hover: getCSSVariable("--accent") || (mode === "dark" ? "#27272a" : "#f1f5f9"),
        selected: getCSSVariable("--accent") || (mode === "dark" ? "#27272a" : "#f1f5f9"),
      },
    },
    typography: {
      fontFamily: "var(--font-sans)",
      h1: {
        fontFamily: "var(--font-sans)",
        fontWeight: 700,
      },
      h2: {
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
      },
      h3: {
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
      },
      h4: {
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
      },
      h5: {
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
      },
      h6: {
        fontFamily: "var(--font-sans)",
        fontWeight: 600,
      },
      body1: {
        fontFamily: "var(--font-sans)",
      },
      body2: {
        fontFamily: "var(--font-sans)",
      },
    },
    shape: {
      borderRadius: 4,
    },
    shadows: [
      "none",
      "var(--shadow-xs)",
      "var(--shadow-sm)",
      "var(--shadow)",
      "var(--shadow-md)",
      "var(--shadow-lg)",
      "var(--shadow-xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
      "var(--shadow-2xl)",
    ],
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: "var(--background)",
            color: "var(--foreground)",
            transition: "background-color 0.2s ease, color 0.2s ease",
          },
          "*": {
            transition: "background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease",
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: "none",
            borderRadius: "var(--radius)",
            fontWeight: 500,
          },
          contained: {
            boxShadow: "var(--shadow-sm)",
            "&:hover": {
              boxShadow: "var(--shadow-md)",
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--card)",
            color: "var(--card-foreground)",
            borderColor: "var(--border)",
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundColor: "var(--card)",
            color: "var(--card-foreground)",
            borderColor: "var(--border)",
            boxShadow: "var(--shadow-sm)",
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: "var(--background)",
              "& fieldset": {
                borderColor: "var(--border)",
              },
              "&:hover fieldset": {
                borderColor: "var(--border)",
              },
              "&.Mui-focused fieldset": {
                borderColor: "var(--ring)",
              },
            },
          },
        },
      },
    },
  });
};

export default createCustomTheme;
