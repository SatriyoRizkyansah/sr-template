import { Box } from "@mui/material";

interface LoginVisualSectionProps {
  imageSrc: string;
}

export function LoginVisualSection({ imageSrc }: LoginVisualSectionProps) {
  return (
    <Box
      sx={{
        position: "relative",
        display: { xs: "none", md: "block" },
        p: 2,
        backgroundColor: "var(--card)",
      }}
    >
      <Box
        sx={{
          position: "relative",
          width: "100%",
          height: "100%",
          borderRadius: "26px",
          overflow: "hidden",
        }}
      >
        <Box
          component="img"
          src={imageSrc}
          alt="Ilustrasi HRIS UNPAM"
          sx={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
          }}
        />

        <Box
          sx={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(180deg, color-mix(in srgb, var(--foreground) 6%, transparent) 10%, color-mix(in srgb, var(--foreground) 28%, transparent) 100%)",
          }}
        />
      </Box>
    </Box>
  );
}
