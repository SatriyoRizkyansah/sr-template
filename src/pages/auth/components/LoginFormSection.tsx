import { Box, TextField, Button, Typography, IconButton, InputAdornment, Stack } from "@mui/material";
import { Visibility, VisibilityOff, LoginOutlined } from "@mui/icons-material";
import type { FormEvent } from "react";

interface LoginFormData {
  username: string;
  password: string;
}

interface LoginFormSectionProps {
  formData: LoginFormData;
  showPassword: boolean;
  isLoading: boolean;
  onUsernameChange: (value: string) => void;
  onPasswordChange: (value: string) => void;
  onTogglePassword: () => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
}

const textFieldSx = {
  "& .MuiInputLabel-root": {
    color: "var(--muted-foreground)",
    fontWeight: 500,
  },
  "& .MuiInputLabel-root.Mui-focused": {
    color: "var(--primary)",
  },
  "& .MuiInputLabel-root.Mui-disabled": {
    color: "color-mix(in srgb, var(--muted-foreground) 70%, transparent)",
  },
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "color-mix(in srgb, var(--background) 72%, transparent)",
    "& fieldset": {
      borderColor: "var(--border)",
    },
    "&:hover fieldset": {
      borderColor: "var(--muted-foreground)",
    },
    "&.Mui-focused fieldset": {
      borderColor: "var(--ring)",
      boxShadow: "0 0 0 3px color-mix(in srgb, var(--ring) 16%, transparent)",
    },
    "&.Mui-disabled": {
      backgroundColor: "color-mix(in srgb, var(--muted) 90%, transparent)",
    },
  },
  "& .MuiInputBase-input": {
    color: "var(--foreground)",
    WebkitTextFillColor: "var(--foreground)",
  },
  "& .MuiInputBase-input::placeholder": {
    color: "var(--muted-foreground)",
    opacity: 1,
  },
  "& .MuiInputBase-input.Mui-disabled": {
    WebkitTextFillColor: "color-mix(in srgb, var(--foreground) 75%, transparent)",
  },
};

export function LoginFormSection({ formData, showPassword, isLoading, onUsernameChange, onPasswordChange, onTogglePassword, onSubmit }: LoginFormSectionProps) {
  return (
    <Box
      sx={{
        px: { xs: 3, sm: 4.5, md: 5.5 },
        py: { xs: 4, sm: 5.5, md: 6 },
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        backgroundColor: "var(--card)",
        fontFamily: "Poppins, Plus Jakarta Sans, Nunito Sans, sans-serif",
      }}
    >
      {/* <Box sx={{ display: "flex", alignItems: "center", gap: 1.1, mb: { xs: 2.5, md: 4 } }}>
        <Box sx={{ width: 12, height: 12, borderRadius: "999px", backgroundColor: "var(--primary)" }} />
        <Typography sx={{ fontWeight: 700, fontSize: "0.95rem", color: "var(--foreground)", letterSpacing: "0.01em" }}>HRIS UNPAM</Typography>
      </Box> */}

      <Typography
        component="h1"
        sx={{
          fontWeight: 800,
          color: "var(--foreground)",
          lineHeight: 1.15,
          letterSpacing: "-0.03em",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          mb: 1,
        }}
      >
        Selamat Datang,
      </Typography>
      {/* <Typography
        sx={{
          fontWeight: 800,
          color: "var(--primary)",
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
          fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
          mb: 2,
        }}
      >
        HRMS SJ
      </Typography> */}

      <Typography sx={{ color: "var(--muted-foreground)", mb: { xs: 3, md: 4 }, fontSize: "0.95rem" }}>Masuk untuk mengakses data karyawan, dashboard, dan layanan internal kampus.</Typography>

      <Box component="form" onSubmit={onSubmit}>
        <Stack spacing={2.1}>
          <TextField fullWidth label="Username" type="text" value={formData.username} onChange={(event) => onUsernameChange(event.target.value)} required autoComplete="off" disabled={isLoading} size="small" sx={textFieldSx} />

          <TextField
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(event) => onPasswordChange(event.target.value)}
            required
            autoComplete="current-password"
            placeholder=""
            disabled={isLoading}
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={onTogglePassword} edge="end" aria-label="toggle password visibility" sx={{ color: "var(--muted-foreground)" }}>
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
            sx={textFieldSx}
          />

          {/* <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 1 }}>
            <FormControlLabel
              control={<Checkbox size="small" checked={rememberMe} onChange={(event) => onRememberMeChange(event.target.checked)} />}
              label={<Typography sx={{ fontSize: "0.85rem", color: "var(--muted-foreground)" }}>Remember me</Typography>}
              sx={{ m: 0 }}
            />
            <Link href="#" underline="hover" sx={{ color: "var(--muted-foreground)", fontWeight: 600, fontSize: "0.84rem" }}>
              Forgot Password?
            </Link>
          </Box> */}

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
              backgroundColor: "var(--primary)",
              color: "var(--primary-foreground)",
              boxShadow: "0 12px 22px color-mix(in srgb, var(--primary) 28%, transparent)",
              "&:hover": {
                backgroundColor: "color-mix(in srgb, var(--primary) 90%, black)",
                boxShadow: "0 16px 28px color-mix(in srgb, var(--primary) 30%, transparent)",
              },
            }}
          >
            {isLoading ? "Signing In..." : "Sign In"}
          </Button>

          {/* <Typography sx={{ mt: 1, color: "var(--muted-foreground)", fontSize: "0.83rem" }}>
            Belum punya akun?{" "}
            <Link href="#" underline="hover" sx={{ color: "var(--primary)", fontWeight: 700 }}>
              Hubungi Admin
            </Link>
          </Typography> */}
        </Stack>
      </Box>
    </Box>
  );
}
