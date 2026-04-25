import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import loginImage from "../../assets/images/login.png";
import { LoginCardLayout, LoginFormSection, LoginVisualSection } from "./components";

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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
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
    <LoginCardLayout
      isLoading={isLoading}
      formSection={
        <LoginFormSection
          formData={formData}
          showPassword={showPassword}
          isLoading={isLoading}
          onUsernameChange={(value) => setFormData((prev) => ({ ...prev, username: value }))}
          onPasswordChange={(value) => setFormData((prev) => ({ ...prev, password: value }))}
          onTogglePassword={() => setShowPassword((prev) => !prev)}
          onSubmit={handleSubmit}
        />
      }
      visualSection={<LoginVisualSection imageSrc={loginImage} />}
    />
  );
}

export default LoginPage;
