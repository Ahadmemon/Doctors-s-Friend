import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/auth.api";
import AuthLayout from "./AuthLayout";
import Input from "../UI/InputBox";
import { useAuth } from "../../context/AuthContext";

function RegisterScreen() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    registrationNumber: "",
    qualification: "",
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
        navigate("/dashboard", { replace: true });
      } else {
        setError(data.message || "Registration failed");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || err.message || "Registration failed",
      );
      const statusCode = err.response?.status;
      if (statusCode >= 400 && statusCode < 500) {
        setError("Registration failed");
      } else {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Registration failed. Please try again.",
        );
      }
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <form className="space-y-6" onSubmit={handleSubmit}>
        {error && <div className="text-red-600 text-sm">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Full Name"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            placeholder="Enter your name"
            required
          />

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="example@gmail.com"
            required
          />

          <Input
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <Input
            label="Qualification"
            type="text"
            name="qualification"
            value={formData.qualification}
            onChange={handleChange}
            placeholder="MBBS, MD"
            required
          />
        </div>
        <div className="max-w-sm mx-auto">
          <Input
            label="Registration Number"
            name="registrationNumber"
            value={formData.registrationNumber}
            onChange={handleChange}
            placeholder="ABC 123 456"
            required
          />
        </div>
        <button
          className="w-full bg-indigo-600 text-white py-3 rounded-lg"
          type="submit"
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Account"}
        </button>

        <p className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-600">
            Sign In
          </Link>
        </p>
      </form>
    </AuthLayout>
  );
}

export default RegisterScreen;
