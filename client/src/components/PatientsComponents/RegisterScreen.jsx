import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import AuthLayout from "./AuthLayout";
import { ic, PrimaryBtn } from "./ui";

export default function RegisterScreen() {
  const { login } = useApp();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "", confirm: "" });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const set = (k) => (v) => setForm(f => ({ ...f, [k]: v }));

  const submit = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Full name is required";
    if (!form.email) e.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email";
    if (!form.password) e.password = "Password is required";
    else if (form.password.length < 6) e.password = "Min 6 characters";
    if (form.confirm !== form.password) e.confirm = "Passwords don't match";
    if (Object.keys(e).length) return setErrors(e);

    setLoading(true);
    setTimeout(() => {
      login({ email: form.email, name: form.name });
      navigate("/create-profile");
    }, 800);
  };

  const fields = [
    ["Full Name",        "name",     "text",     "John Doe"],
    ["Email Address",    "email",    "email",    "you@example.com"],
    ["Password",         "password", "password", "••••••••"],
    ["Confirm Password", "confirm",  "password", "••••••••"],
  ];

  return (
    <AuthLayout title="Create Account" subtitle="Join MediConnect to consult top doctors">
      <div className="space-y-4">
        {fields.map(([label, key, type, ph]) => (
          <div key={key}>
            <label className="block text-sm font-medium text-slate-600 mb-1.5">{label}</label>
            <input type={type} value={form[key]} onChange={e => set(key)(e.target.value)} placeholder={ph} className={ic} />
            {errors[key] && <p className="text-rose-500 text-xs mt-1">{errors[key]}</p>}
          </div>
        ))}
        <PrimaryBtn loading={loading} onClick={submit} label="Create Account" loadingLabel="Creating account..." />
        <p className="text-center text-sm text-slate-500">
          Already have an account?{" "}
          <Link to="/login" className="text-sky-500 font-semibold">Sign In</Link>
        </p>
      </div>
    </AuthLayout>
  );
}
