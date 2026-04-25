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
        backgroundColor: "#ececec",
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
            background: "linear-gradient(180deg, rgba(10, 16, 35, 0.06) 10%, rgba(10, 16, 35, 0.28) 100%)",
          }}
        />
      </Box>
    </Box>
  );
}
