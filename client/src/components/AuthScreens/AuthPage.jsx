import { useState } from "react";
import LoginScreen from "./LoginScreen";
import RegisterScreen from "./RegisterScreen";
import AuthLayout from "./AuthLayout";
const AuthPage = () => {
  const [view, setView] = useState("login");

  return (
    <AuthLayout>
      {view === "login" ? (
        <LoginScreen onSwitch={() => setView("register")} />
      ) : (
        <RegisterScreen onSwitch={() => setView("login")} />
      )}
    </AuthLayout>
  );
};

export default AuthPage;
