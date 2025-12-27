import { createContext } from "react";

type ThemeMode = "light" | "dark";

export interface ThemeContextType {
  mode: ThemeMode;
  toggleColorMode: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  mode: "light",
  toggleColorMode: () => {},
});

export type { ThemeMode };
