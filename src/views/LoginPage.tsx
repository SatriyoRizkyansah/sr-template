import React, { useState } from "react";
import { Box, Card, CardContent, TextField, Button, Typography, IconButton, InputAdornment, Stack, Container } from "@mui/material";
import { Visibility, VisibilityOff, LoginOutlined } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import Loader from "../components/loading/Loader";

interface LoginFormData {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleInputChange = (field: keyof LoginFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      navigate("/dashboard");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        px: { xs: 2, md: 4 },
        py: { xs: 4, md: 6 },
        backgroundColor: "var(--secondary)",
        backgroundImage: `linear-gradient(155deg, rgba(9, 9, 11, 0.02) 25%, transparent 25%), linear-gradient(335deg, rgba(9, 9, 11, 0.02) 25%, transparent 25%)`,
        backgroundSize: "28px 28px",
      }}
    >
      <Container component="main" maxWidth="xs" disableGutters sx={{ width: "100%", maxWidth: 420 }}>
        <Card
          sx={{
            position: "relative",
            maxWidth: 420,
            width: "100%",
            mx: "auto",
            borderRadius: "24px",
            backgroundColor: "var(--card)",
            border: "1px solid rgba(15, 23, 42, 0.08)",
            boxShadow: "0 18px 45px rgba(15, 23, 42, 0.12)",
            overflow: "hidden",
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
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                zIndex: 2,
              }}
            >
              <Loader label="Signing in" />
            </Box>
          )}

          <CardContent sx={{ p: { xs: 3, md: 4 } }}>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 56,
                  height: 56,
                  borderRadius: "18px",
                  backgroundColor: "var(--foreground)",
                  color: "var(--background)",
                  mb: 2,
                }}
              >
                <LoginOutlined sx={{ fontSize: 32 }} />
              </Box>

              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 700, color: "var(--foreground)", letterSpacing: "-0.02em", fontSize: { xs: "1.75rem", md: "2rem" } }}>
                Log in to your account
              </Typography>

              <Typography variant="body1" sx={{ color: "var(--muted-foreground)" }}>
                Welcome back! Please enter your details.
              </Typography>
            </Box>

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={2.5}>
                <TextField
                  fullWidth
                  label="Username"
                  type="text"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  disabled={isLoading}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      backgroundColor: "var(--card)",
                      color: "var(--foreground)",
                      transition: "border-color 150ms ease, box-shadow 150ms ease",
                      "& fieldset": {
                        borderColor: "rgba(15, 23, 42, 0.12)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(15, 23, 42, 0.24)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--foreground)",
                        boxShadow: "0 0 0 3px rgba(15, 23, 42, 0.08)",
                      },
                      "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 1000px var(--card) inset !important",
                        WebkitTextFillColor: "var(--foreground) !important",
                      },
                      "& input:-webkit-autofill:focus": {
                        WebkitBoxShadow: "0 0 0 1000px var(--card) inset !important",
                        WebkitTextFillColor: "var(--foreground) !important",
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "var(--muted-foreground)",
                      opacity: 1,
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--muted-foreground)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "var(--foreground)",
                    },
                  }}
                />

                <TextField
                  fullWidth
                  label="Password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={handleInputChange("password")}
                  required
                  autoComplete="current-password"
                  placeholder="Enter your password"
                  disabled={isLoading}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" aria-label="toggle password visibility" sx={{ color: "#94a3b8" }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "16px",
                      backgroundColor: "var(--card)",
                      color: "var(--foreground)",
                      transition: "border-color 150ms ease, box-shadow 150ms ease",
                      "& fieldset": {
                        borderColor: "rgba(15, 23, 42, 0.12)",
                      },
                      "&:hover fieldset": {
                        borderColor: "rgba(15, 23, 42, 0.24)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--foreground)",
                        boxShadow: "0 0 0 3px rgba(15, 23, 42, 0.08)",
                      },
                      "& input:-webkit-autofill": {
                        WebkitBoxShadow: "0 0 0 1000px var(--card) inset !important",
                        WebkitTextFillColor: "var(--foreground) !important",
                      },
                      "& input:-webkit-autofill:focus": {
                        WebkitBoxShadow: "0 0 0 1000px var(--card) inset !important",
                        WebkitTextFillColor: "var(--foreground) !important",
                      },
                    },
                    "& .MuiInputBase-input::placeholder": {
                      color: "var(--muted-foreground)",
                      opacity: 1,
                    },
                    "& .MuiInputLabel-root": {
                      color: "var(--muted-foreground)",
                    },
                    "& .MuiInputLabel-root.Mui-focused": {
                      color: "var(--foreground)",
                    },
                  }}
                />

                {/* <Stack direction={{ xs: "column", sm: "row" }} alignItems={{ xs: "flex-start", sm: "center" }} justifyContent="space-between">
                  <FormControlLabel
                    control={<Checkbox size="small" checked={rememberMe} onChange={(event) => setRememberMe(event.target.checked)} />}
                    label={<Typography variant="body2">Remember me</Typography>}
                    sx={{
                      m: 0,
                      "& .MuiTypography-root": {
                        color: "var(--muted-foreground)",
                        fontSize: "0.9rem",
                      },
                    }}
                  />
                </Stack> */}

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.4,
                    borderRadius: "16px",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    backgroundColor: "var(--foreground)",
                    color: "var(--background)",
                    boxShadow: "none",
                    "&:hover": {
                      backgroundColor: "#0b0b0f",
                    },
                  }}
                >
                  {isLoading ? "Signing In..." : "Sign in"}
                </Button>
              </Stack>
            </Box>
          </CardContent>
        </Card>
      </Container>
    </Box>
  );
};

export default LoginPage;
