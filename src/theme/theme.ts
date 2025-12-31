import { extendTheme } from "@mui/material/styles";

const paletteTokens = {
  light: {
    primary: {
      main: "#0284c7",
      contrastText: "#ffffff",
    },
    secondary: {
      main: "#e9eef5",
      contrastText: "#1e293b",
    },
    error: {
      main: "#dc2626",
      contrastText: "#ffffff",
    },
    background: {
      default: "#f8fafc",
      paper: "#ffffff",
    },
    text: {
      primary: "#0f172a",
      secondary: "#64748b",
    },
    divider: "#dbe3ec",
  },
  dark: {
    primary: {
      main: "#38bdf8",
      contrastText: "#020617",
    },
    secondary: {
      main: "#1f1f23",
      contrastText: "#e5e7eb",
    },
    error: {
      main: "#ef4444",
      contrastText: "#020617",
    },
    background: {
      default: "#09090b",
      paper: "#111113",
    },
    text: {
      primary: "#fafafa",
      secondary: "#9ca3af",
    },
    divider: "#2a2a30",
  },
} as const;

const buildPalette = (scheme: keyof typeof paletteTokens) => paletteTokens[scheme];

export const appTheme = extendTheme({
  cssVarPrefix: "mui",
  colorSchemes: {
    light: {
      palette: buildPalette("light"),
    },
    dark: {
      palette: buildPalette("dark"),
    },
  },
  shape: {
    borderRadius: 8,
  },
  typography: {
    fontFamily: "var(--font-sans)",
  },
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

export default appTheme;
