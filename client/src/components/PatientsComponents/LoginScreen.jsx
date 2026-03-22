import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AuthLayout from "./AuthLayout";
import { ic, PrimaryBtn } from "./ui";

export default function LoginScreen() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const submit = () => {
    const e = {};
    if (!email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) e.email = "Invalid email";
    if (!password) e.password = "Password is required";
    else if (password.length < 6) e.password = "Min 6 characters";
    if (Object.keys(e).length) return setErrors(e);

    setLoading(true);
    setTimeout(() => {
      login({ email, name: email.split("@")[0] });
      navigate("/create-profile");
    }, 800);
  };

  return (
    <AuthLayout title="Welcome Back" subtitle="Sign in to your MediConnect account">
      <div className="space-y-5">
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Email Address</label>
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" className={ic} />
          {errors.email && <p className="text-rose-500 text-xs mt-1">{errors.email}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">Password</label>
          <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" className={ic} />
          {errors.password && <p className="text-rose-500 text-xs mt-1">{errors.password}</p>}
        </div>
        <div className="text-right">
          <span className="text-sm text-sky-500 cursor-pointer font-medium">Forgot password?</span>
        </div>
        <PrimaryBtn loading={loading} onClick={submit} label="Sign In" loadingLabel="Signing in..." />
        <p className="text-center text-sm text-slate-500">
          Don't have an account?{" "}
          <Link to="/register" className="text-sky-500 font-semibold">Register</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
