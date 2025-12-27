import React from "react";
import { Box, Container, Typography, Button, Paper } from "@mui/material";
import { Home, SearchOff } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            p: 6,
            textAlign: "center",
            boxShadow: "var(--shadow-lg)",
            borderRadius: "var(--radius-lg)",
          }}
        >
          <Box
            sx={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 120,
              height: 120,
              borderRadius: "50%",
              backgroundColor: "var(--muted)",
              color: "var(--muted-foreground)",
              mb: 3,
            }}
          >
            <SearchOff sx={{ fontSize: 60 }} />
          </Box>

          <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: 700, mb: 2 }}>
            404
          </Typography>

          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
            Page Not Found
          </Typography>

          <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
            Oops! The page you're looking for doesn't exist. It might have been moved or deleted.
          </Typography>

          <Button
            variant="contained"
            size="large"
            startIcon={<Home />}
            onClick={() => navigate("/")}
            sx={{
              px: 4,
              py: 1.5,
              borderRadius: "var(--radius-md)",
            }}
          >
            Go Back Home
          </Button>
        </Paper>
      </Box>
    </Container>
  );
};

export default NotFoundPage;
