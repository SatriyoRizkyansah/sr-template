import React, { useState } from "react";
import { Box, Card, CardContent, TextField, Button, Typography, IconButton, InputAdornment, Divider, Stack, Link, Alert, Container } from "@mui/material";
import { Visibility, VisibilityOff, Google, GitHub, LoginOutlined } from "@mui/icons-material";

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

  const handleSocialLogin = (provider: string) => {
    console.log(`Login with ${provider}`);
    alert(`${provider} login clicked! (Not implemented)`);
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
        }}
      >
        <Card
          sx={{
            maxWidth: 480,
            width: "100%",
            mx: "auto",
            boxShadow: "var(--shadow-lg)",
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

              <Typography variant="h4" component="h1" gutterBottom sx={{ fontWeight: 600 }}>
                Welcome Back
              </Typography>

              <Typography variant="body1" color="text.secondary">
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
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" aria-label="toggle password visibility">
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      borderRadius: "var(--radius-md)",
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

            {/* Divider */}
            <Box sx={{ my: 3 }}>
              <Divider>
                <Typography variant="body2" color="text.secondary">
                  Or continue with
                </Typography>
              </Divider>
            </Box>

            {/* Social Login */}
            <Stack direction="row" spacing={2}>
              <Button
                fullWidth
                variant="outlined"
                startIcon={<Google />}
                onClick={() => handleSocialLogin("Google")}
                sx={{
                  py: 1.5,
                  borderRadius: "var(--radius-md)",
                  textTransform: "none",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  "&:hover": {
                    borderColor: "var(--border)",
                    backgroundColor: "var(--accent)",
                  },
                }}
              >
                Google
              </Button>

              <Button
                fullWidth
                variant="outlined"
                startIcon={<GitHub />}
                onClick={() => handleSocialLogin("GitHub")}
                sx={{
                  py: 1.5,
                  borderRadius: "var(--radius-md)",
                  textTransform: "none",
                  borderColor: "var(--border)",
                  color: "var(--foreground)",
                  "&:hover": {
                    borderColor: "var(--border)",
                    backgroundColor: "var(--accent)",
                  },
                }}
              >
                GitHub
              </Button>
            </Stack>

            {/* Sign Up Link */}
            <Box sx={{ textAlign: "center", mt: 3 }}>
              <Typography variant="body2" color="text.secondary">
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
              <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 600 }}>
                Demo Credentials:
              </Typography>
              <Typography variant="body2" color="text.secondary" component="div">
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
