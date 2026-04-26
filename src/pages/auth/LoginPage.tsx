import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { set_login_response, set_selected_token } from "@Signal/use-signal/auth-init-signal";
import { show_alert_snackbar } from "@Signal/use-signal/snackbar_signal";
import { LoginCardLayout, LoginFormSection, LoginVisualSection } from "./components";
import use_mutation from "@Hooks/api-use-mutation";

interface LoginFormData {
  username: string;
  password: string;
}

export function LoginPage() {
  const [formData, setFormData] = useState<LoginFormData>({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmittingLogin, setIsSubmittingLogin] = useState(false);
  const navigate = useNavigate();

  const loginMutation = use_mutation({
    api_tag: "auth",
    api_method: "login",
    options: {
      should_disable_loading: true,
      should_disable_success_message: true,
      should_disable_error_message: false,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      will_exec_after_success: (response: any) => {
        if (!response?.data?.data) {
          setIsSubmittingLogin(false);
          return;
        }

        const loginData = response.data.data;
        set_login_response(loginData);

        const akses = loginData.akses;
        if (akses && akses.length >= 1) {
          const authToken = akses[0];
          try {
            set_selected_token(authToken);
            setTimeout(() => {
              navigate("/dashboard", { replace: true });
            }, 100);
            return;
          } catch (error) {
            console.error("Error setting token:", error);
            show_alert_snackbar({
              message: "Terjadi kesalahan saat memproses token. Silakan coba lagi.",
              severity: "error",
              anchorOrigin: { vertical: "bottom", horizontal: "center" },
            });
          }
        }

        setIsSubmittingLogin(false);
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      will_exec_after_error: (error: any) => {
        setIsSubmittingLogin(false);
        show_alert_snackbar({
          message: error?.error?.message || "Terjadi kesalahan saat login",
          severity: "error",
          anchorOrigin: { vertical: "bottom", horizontal: "center" },
        });
      },
    },
  });

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmittingLogin(true);

    try {
      await loginMutation([{ username: formData.username, password: formData.password }]);
    } catch (error) {
      console.error("Login error:", error);
      setIsSubmittingLogin(false);
    }
  };

  return (
    <LoginCardLayout
      isLoading={isSubmittingLogin}
      formSection={
        <LoginFormSection
          formData={formData}
          showPassword={showPassword}
          isLoading={isSubmittingLogin}
          onUsernameChange={(value) => setFormData((prev) => ({ ...prev, username: value }))}
          onPasswordChange={(value) => setFormData((prev) => ({ ...prev, password: value }))}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
          onSubmit={handleSubmit}
        />
      }
      visualSection={<LoginVisualSection imageSrc={"./../../assets/images/login.png"} />}
    />
  );
}

export default LoginPage;
