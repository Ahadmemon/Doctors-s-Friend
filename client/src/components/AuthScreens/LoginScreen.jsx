import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import AuthLayout from "./AuthLayout";
import { loginUser } from "../../api/auth.api";
import { useAuth } from "../../context/AuthContext";
import InputBox from "../UI/InputBox";

function LoginScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({ email: "", password: "" });
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleChange = (e) => {
    setError("");
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const response = await loginUser(formData);
      const data = response.data || {};
      const statusCode = data.statusCode ?? response.status ?? 200;
      if (statusCode >= 200 && statusCode < 300) {
        const user = data.user || data.data?.user || {};
        const token = data.accessToken || data.data?.accessToken || "";
        // const user = data.data || {};
        // const token = data.accessToken || data.data?.accessToken || "";
        if (!token) {
          setError("Login succeeded but no access token was returned");
          return;
        }
        login(user, token);
        navigate("/dashboard", { replace: true });
      } else {
        setError(data.message || "Login failed");
      }
    } catch (err) {
      const statusCode = err.response?.status;
      if (statusCode === 401) {
        setError("Invalid email or password");
      } else if (statusCode === 400) {
        setError(
          err.response?.data?.message ||
            "Invalid input. Please check your email and password.",
        );
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Login failed. Please try again.",
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div>
          <InputBox
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 border rounded-lg"
          ></InputBox>
        </div>

        <div>
          <div className="relative">
            <InputBox
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border rounded-lg"
            ></InputBox>

            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-11"
            >
              {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
        </div>

        <button
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        >
          {loading ? "Signing in..." : "Sign In"}
        </button>

        <p className="text-center text-sm">
          Don’t have an account?{" "}
          <Link to="/register" className="text-indigo-600">
            Register
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default LoginScreen;
