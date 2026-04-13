import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, Lock } from "lucide-react";
import { registerUser } from "../../api/auth.api";
import AuthLayout from "./AuthLayout";
import Input from "../UI/InputBox";
import { useAuth } from "../../context/AuthContext";

function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { register } = useAuth();

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await registerUser(formData);
      const data = response.data || {};
      const statusCode = data.statusCode ?? response.status ?? 200;

      if (statusCode >= 200 && statusCode < 300) {
        const user = data.data || {};
        const token = data.accessToken || data.data?.accessToken || "";

        if (!token) {
          setError("Registration succeeded but no access token was returned");
          console.warn("No token in register response:", response);
          return;
        }

        register(user, token);
        navigate("/profile", { replace: true });
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      const statusCode = err.response?.status;
      setError(
        statusCode >= 400 && statusCode < 500
          ? "Registration failed. Check your details."
          : err.response?.data?.message || err.message || "Please try again.",
      );
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      label: "Full Name",
      name: "fullName",
      type: "text",
      placeholder: "Dr. Rahul Patel",
      icon: User,
      required: true,
    },
    {
      label: "Email Address",
      name: "email",
      type: "email",
      placeholder: "doctor@clinic.com",
      icon: Mail,
      required: true,
    },
    {
      label: "Password",
      name: "password",
      type: "password",
      placeholder: "Min. 8 characters",
      icon: Lock,
      required: true,
    },
  ];

  return (
    <AuthLayout>
      {/* Greeting */}
      <div className="mb-7">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          Welcome to Doctor's Friend
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Start managing your patients securely
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
            <Lock size={14} className="text-red-400 shrink-0" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Fields */}
        {fields.map(
          ({ label, name, type, placeholder, icon: Icon, required }) => (
            <div key={name}>
              <label className="block text-sm font-medium text-slate-600 mb-1.5">
                {label}
              </label>
              <div className="relative">
                <Icon
                  size={14}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
                />
                <Input
                  type={type}
                  name={name}
                  value={formData[name]}
                  onChange={handleChange}
                  placeholder={placeholder}
                  required={required}
                  className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 pl-9 pr-4 py-2.5 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-3 focus:ring-sky-100 transition-all"
                />
              </div>
            </div>
          ),
        )}

        {/* Terms */}
        <p className="text-xs text-slate-400 leading-relaxed">
          By registering you agree to our{" "}
          <span className="text-sky-600 font-medium cursor-pointer hover:underline">
            Terms of Service
          </span>{" "}
          and{" "}
          <span className="text-sky-600 font-medium cursor-pointer hover:underline">
            Privacy Policy
          </span>
          .
        </p>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm shadow-sky-200 transition-all duration-150 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Creating account...
            </>
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Login link */}
      <p className="text-center text-sm text-slate-400 mt-6">
        Already have an account?{" "}
        <Link
          to="/login"
          className="text-sky-600 hover:text-sky-700 font-semibold"
        >
          Sign in
        </Link>
      </p>
    </AuthLayout>
  );
}

export default RegisterScreen;
