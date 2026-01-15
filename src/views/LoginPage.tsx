import React, { useState } from "react";
import { Box, Card, CardContent, TextField, Button, Typography, IconButton, InputAdornment, Stack, Link, Alert, Container } from "@mui/material";
import { Visibility, VisibilityOff, LoginOutlined } from "@mui/icons-material";

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
  const [error, setError] = useState<string | null>(null);

  const handleInputChange = (field: keyof LoginFormData) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [field]: event.target.value });
    if (error) setError(null);
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Simulate login logic
      if (formData.email === "demo@example.com" && formData.password === "password") {
        console.log("Login successful!");
        alert("Login successful! 🎉");
      } else {
        setError("Invalid email or password. Try demo@example.com / password");
      }
    } catch {
      setError("An error occurred during login. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
          backgroundColor: "var(--background)",
          transition: "background-color 0.3s ease",
        }}
      >
        <Card
          sx={{
            maxWidth: 480,
            width: "100%",
            mx: "auto",
            boxShadow: "var(--shadow-lg)",
            backgroundColor: "var(--card)",
            border: "1px solid var(--border)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            {/* Header */}
            <Box sx={{ textAlign: "center", mb: 4 }}>
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 64,
                  height: 64,
                  borderRadius: "var(--radius-lg)",
                  backgroundColor: "var(--primary)",
                  color: "var(--primary-foreground)",
                  mb: 2,
                }}
              >
                <LoginOutlined sx={{ fontSize: 32 }} />
              </Box>

              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600, color: "var(--foreground)" }}>
                Welcome Back
              </Typography>

              <Typography variant="body1" sx={{ color: "var(--muted-foreground)" }}>
                Sign in to your account to continue
              </Typography>
            </Box>

            {/* Error Alert */}
            {error && (
              <Alert severity="error" sx={{ mb: 3 }}>
                {error}
              </Alert>
            )}

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit}>
              <Stack spacing={3}>
                <TextField
                  fullWidth
                  label="Email Address"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange("email")}
                  required
                  autoComplete="email"
                  placeholder="Enter your email"
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--input)",
                      color: "var(--foreground)",
                      "& fieldset": {
                        borderColor: "var(--border)",
                      },
                      "&:hover fieldset": {
                        borderColor: "var(--border)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--primary)",
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
                      color: "var(--primary)",
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" aria-label="toggle password visibility" sx={{ color: "var(--muted-foreground)" }}>
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "var(--radius-md)",
                      backgroundColor: "var(--input)",
                      color: "var(--foreground)",
                      "& fieldset": {
                        borderColor: "var(--border)",
                      },
                      "&:hover fieldset": {
                        borderColor: "var(--border)",
                      },
                      "&.Mui-focused fieldset": {
                        borderColor: "var(--primary)",
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
                      color: "var(--primary)",
                    },
                  }}
                />

                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  size="large"
                  disabled={isLoading}
                  sx={{
                    py: 1.5,
                    borderRadius: "var(--radius-md)",
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                  }}
                >
                  {isLoading ? "Signing In..." : "Sign In"}
                </Button>
              </Stack>
            </Box>

            {/* Forgot Password */}
            <Box sx={{ textAlign: "center", mt: 2 }}>
              <Link
                href="#"
                variant="body2"
                sx={{
                  color: "var(--primary)",
                  textDecoration: "none",
                  "&:hover": {
                    textDecoration: "underline",
                  },
                }}
              >
                Forgot your password?
              </Link>
            </Box>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }}>
                Don't have an account?{" "}
                <Link
                  href="#"
                  sx={{
                    color: "var(--primary)",
                    textDecoration: "none",
                    fontWeight: 600,
                    "&:hover": {
                      textDecoration: "underline",
                    },
                  }}
                >
                  Sign up
                </Link>
              </Typography>
            </Box>

            {/* Demo Credentials */}
            <Box
              sx={{
                mt: 4,
                p: 2,
                borderRadius: "var(--radius-md)",
                backgroundColor: "var(--muted)",
                border: "1px solid var(--border)",
              }}
            >
              <Typography variant="body2" sx={{ color: "var(--foreground)", mb: 1, fontWeight: 600 }}>
                Demo Credentials:
              </Typography>
              <Typography variant="body2" sx={{ color: "var(--muted-foreground)" }} component="div">
                Email: demo@example.com
                <br />
                Password: password
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default LoginPage;
