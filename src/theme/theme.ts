import { createTheme, type Theme } from "@mui/material/styles";
import { formatHex, oklch } from "culori";

// Utility function to get CSS variable value
const getCSSVariable = (varName: string): string => {
  if (typeof window !== "undefined") {
    return getComputedStyle(document.documentElement).getPropertyValue(varName).trim();
  }
  return "";
};

// Convert OKLCH string to HEX format that MUI understands
const oklchToHex = (oklchString: string, fallback: string): string => {
  try {
    if (!oklchString || oklchString === "") return fallback;

    // Parse OKLCH string like "oklch(0.62 0.14 39.15)"
    const match = oklchString.match(/oklch\(([\d.]+)\s+([\d.]+)\s+([\d.]+)\)/);
    if (!match) return fallback;

    const [, l, c, h] = match;
    const color = oklch({
      l: parseFloat(l),
      c: parseFloat(c),
      h: parseFloat(h),
    });

    return formatHex(color) || fallback;
  } catch (error) {
    console.warn(`Failed to convert OKLCH color: ${oklchString}`, error);
    return fallback;
  }
};

export const createCustomTheme = (mode: "light" | "dark"): Theme => {
  return createTheme({
    palette: {
      mode,
      primary: {
        main: oklchToHex(getCSSVariable("--primary"), mode === "dark" ? "#60a5fa" : "#2563eb"),
        contrastText: oklchToHex(getCSSVariable("--primary-foreground"), "#ffffff"),
      },
      secondary: {
        main: oklchToHex(getCSSVariable("--secondary"), mode === "dark" ? "#fafafa" : "#64748b"),
        contrastText: oklchToHex(getCSSVariable("--secondary-foreground"), mode === "dark" ? "#1e1e1e" : "#0f172a"),
      },
      error: {
        main: oklchToHex(getCSSVariable("--destructive"), mode === "dark" ? "#ef4444" : "#dc2626"),
        contrastText: oklchToHex(getCSSVariable("--primary-foreground"), "#ffffff"),
      },
      warning: {
        main: oklchToHex(getCSSVariable("--chart-4"), "#f59e0b"),
        contrastText: oklchToHex(getCSSVariable("--primary-foreground"), "#ffffff"),
      },
      info: {
        main: oklchToHex(getCSSVariable("--chart-2"), "#3b82f6"),
        contrastText: oklchToHex(getCSSVariable("--primary-foreground"), "#ffffff"),
      },
      success: {
        main: oklchToHex(getCSSVariable("--chart-1"), "#10b981"),
        contrastText: oklchToHex(getCSSVariable("--primary-foreground"), "#ffffff"),
      },
      background: {
        default: oklchToHex(getCSSVariable("--background"), mode === "dark" ? "#1a1a1a" : "#ffffff"),
        paper: oklchToHex(getCSSVariable("--card"), mode === "dark" ? "#1a1a1a" : "#ffffff"),
      },
      text: {
        primary: oklchToHex(getCSSVariable("--foreground"), mode === "dark" ? "#fafafa" : "#09090b"),
        secondary: oklchToHex(getCSSVariable("--muted-foreground"), mode === "dark" ? "#a1a1aa" : "#71717a"),
      },
      divider: oklchToHex(getCSSVariable("--border"), mode === "dark" ? "#27272a" : "#e4e4e7"),
      action: {
        hover: oklchToHex(getCSSVariable("--accent"), mode === "dark" ? "#27272a" : "#f4f4f5"),
        selected: oklchToHex(getCSSVariable("--accent"), mode === "dark" ? "#27272a" : "#f4f4f5"),
      },
    },
    typography: {
      fontFamily: getCSSVariable("--font-sans") || '"Inter", "Geist", ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif',
      h1: {
        fontFamily: getCSSVariable("--font-sans"),
        fontWeight: 700,
      },
      h2: {
        fontFamily: getCSSVariable("--font-sans"),
        fontWeight: 600,
      },
      h3: {
        fontFamily: getCSSVariable("--font-sans"),
        fontWeight: 600,
      },
      h4: {
        fontFamily: getCSSVariable("--font-sans"),
        fontWeight: 600,
      },
      h5: {
        fontFamily: getCSSVariable("--font-sans"),
        fontWeight: 600,
      },
      h6: {
        fontFamily: getCSSVariable("--font-sans"),
        fontWeight: 600,
      },
      body1: {
        fontFamily: getCSSVariable("--font-sans"),
      },
      body2: {
        fontFamily: getCSSVariable("--font-sans"),
      },
    },
    shape: {
      borderRadius: 8, // matches var(--radius)
    },
    shadows: [
      "none",
      getCSSVariable("--shadow-xs") || "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      getCSSVariable("--shadow-sm") || "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      getCSSVariable("--shadow") || "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
      getCSSVariable("--shadow-md") || "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
      getCSSVariable("--shadow-lg") || "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      getCSSVariable("--shadow-xl") || "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
      getCSSVariable("--shadow-2xl") || "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
      "0 25px 50px -12px rgb(0 0 0 / 0.25)",
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
            borderRadius: getCSSVariable("--radius") || "8px",
            fontWeight: 500,
          },
          contained: {
            boxShadow: getCSSVariable("--shadow-sm") || "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
            "&:hover": {
              boxShadow: getCSSVariable("--shadow-md") || "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
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
            boxShadow: getCSSVariable("--shadow-sm") || "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
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
