import { Box, TextField, Button, Typography, IconButton, InputAdornment, Stack, FormControlLabel, Checkbox, Link } from "@mui/material";
import { Visibility, VisibilityOff, LoginOutlined } from "@mui/icons-material";
import type { FormEvent } from "react";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginFormSectionProps {
  formData: LoginFormData;
  rememberMe: boolean;
  showPassword: boolean;
  isLoading: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onRememberMeChange: (checked: boolean) => void;
  onTogglePassword: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const textFieldSx = {
  "& .MuiInputLabel-root": {
    color: "#5c6575",
    fontWeight: 500,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "#ea3500",
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: "rgba(92, 101, 117, 0.7)",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "rgba(255, 255, 255, 0.72)",
    "& fieldset": {
      borderColor: "rgba(23, 27, 36, 0.14)",
    },
    "&:hover fieldset": {
      borderColor: "rgba(23, 27, 36, 0.35)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#ea3500",
      boxShadow: "0 0 0 3px rgba(234, 53, 0, 0.14)",
    },
    "&.Mui-disabled": {
      backgroundColor: "rgba(241, 241, 241, 0.9)",
    },
  },
  "& .MuiInputBase-input": {
    color: "#171b24",
    WebkitTextFillColor: "#171b24",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#6f7787",
    opacity: 1,
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "rgba(23, 27, 36, 0.75)",
  },
};

export function LoginFormSection({ formData, rememberMe, showPassword, isLoading, onUsernameChange, onPasswordChange, onRememberMeChange, onTogglePassword, onSubmit }: LoginFormSectionProps) {
  return (
    <Box
      sx={{
        px: { xs: 3, sm: 4.5, md: 5.5 },
        py: { xs: 4, sm: 5.5, md: 6 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "#ececec",
        fontFamily: "Poppins, Plus Jakarta Sans, Nunito Sans, sans-serif",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.1, mb: { xs: 2.5, md: 4 } }}>
        <Box sx={{ width: 12, height: 12, borderRadius: "999px", backgroundColor: "#ea3500" }} />
        <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "#171b24", letterSpacing: "0.01em" }}>HRIS UNPAM</Typography>
      </Box>

      <Typography
        component="h1"
        sx={{
          fontWeight: 800,
          color: "#171b24",
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          mb: 1,
        }}
      >
        Selamat Datang,
      </Typography>
      <Typography
        sx={{
          fontWeight: 800,
          color: "#ea3500",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          mb: 2,
        }}
      >
        HRIS Portal
      </Typography>

      <Typography sx={{ color: "#636b7a", mb: { xs: 3, md: 4 }, fontSize: "0.95rem" }}>Masuk untuk mengakses data karyawan, dashboard, dan layanan internal kampus.</Typography>

      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={2.1}>
          <TextField
            fullWidth
            label="Username"
            type="text"
            value={formData.username}
            onChange={(event) => onUsernameChange(event.target.value)}
            required
            autoComplete="username"
            placeholder="contoh@unpam.ac.id"
            disabled={isLoading}
            size="small"
            sx={textFieldSx}
          />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(event) => onPasswordChange(event.target.value)}
            required
            autoComplete="current-password"
            placeholder="Masukkan password"
            disabled={isLoading}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onTogglePassword} edge="end" aria-label="toggle password visibility" sx={{ color: "#6f7787" }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldSx}
          />

          <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
            <FormControlLabel
              control={<Checkbox size="small" checked={rememberMe} onChange={(event) => onRememberMeChange(event.target.checked)} />}
              label={<Typography sx={{ fontSize: "0.85rem", color: "#6f7787" }}>Remember me</Typography>}
              sx={{ m: 0 }}
            />
            <Link href="#" underline="hover" sx={{ color: "#6f7787", fontWeight: 600, fontSize: "0.84rem" }}>
              Forgot Password?
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={isLoading}
            startIcon={<LoginOutlined />}
            sx={{
              py: 1.2,
              borderRadius: "11px",
              textTransform: "none",
              fontSize: "0.95rem",
              fontWeight: 700,
              backgroundColor: "#ea3500",
              color: "#ffffff",
              boxShadow: "0 12px 22px rgba(234, 53, 0, 0.28)",
              "&:hover": {
                backgroundColor: "#d22f00",
                boxShadow: "0 16px 28px rgba(210, 47, 0, 0.3)",
              },
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          <Typography sx={{ mt: 1, color: "#6f7787", fontSize: "0.83rem" }}>
            Belum punya akun?{" "}
            <Link href="#" underline="hover" sx={{ color: "#ea3500", fontWeight: 700 }}>
              Hubungi Admin
            </Link>
          </Typography>
        </Stack>
      </Box>
    </Box>
  );
}
