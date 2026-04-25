import { Box, Card } from "@mui/material";
import type { ReactNode } from "react";
import { Loader } from "../../../components";

interface LoginCardLayoutProps {
  isLoading: boolean;
  formSection: ReactNode;
  visualSection: ReactNode;
}

export function LoginCardLayout({ isLoading, formSection, visualSection }: LoginCardLayoutProps) {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 4, lg: 6 },
        py: { xs: 3, md: 5 },
        backgroundColor: "var(--background)",
      }}
    >
      <Card
        sx={{
          position: "relative",
          width: "min(1200px, 100%)",
          minHeight: { xs: "auto", md: 700 },
          borderRadius: { xs: "22px", md: "34px" },
          overflow: "hidden",
          backgroundColor: "var(--card)",
          border: "1px solid var(--border)",
          boxShadow: "0 30px 70px rgba(4, 8, 23, 0.45)",
          display: "grid",
          gridTemplateColumns: { xs: "1fr", md: "minmax(0, 44%) minmax(0, 56%)" },
        }}
      >
        {isLoading && (
          <Box
            sx={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "color-mix(in srgb, var(--card) 82%, transparent)",
              zIndex: 20,
            }}
          >
            <Loader label="Signing in" />
          </Box>
        )}

        {formSection}
        {visualSection}
      </Card>
    </Box>
  );
}
