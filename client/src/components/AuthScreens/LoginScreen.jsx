import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Eye, EyeOff, Mail, Lock, AlertCircle } from "lucide-react";
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
      {/* Greeting */}
      <div className="mb-7">
        <h1 className="text-xl font-bold text-slate-800 tracking-tight">
          Welcome back, Doctor
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Sign in to access your patient records
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Error */}
        {error && (
          <div className="flex items-center gap-2 bg-red-50 border border-red-200 rounded-lg px-3.5 py-2.5">
            <AlertCircle size={14} className="text-red-400 shrink-0" />
            <p className="text-red-600 text-sm">{error}</p>
          </div>
        )}

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-600 mb-1.5">
            Email address
          </label>
          <div className="relative ">
            <Mail
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <InputBox
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="doctor@clinic.com"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 pl-9 pr-4 py-2.5 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-3 focus:ring-sky-100 transition-all"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label className="block text-sm font-medium text-slate-600">
              Password
            </label>
            <button
              type="button"
              className="text-xs text-sky-600 hover:text-sky-700 font-medium"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative">
            <Lock
              size={14}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none"
            />
            <InputBox
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Enter your password"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl text-slate-800 text-sm placeholder-slate-400 pl-9 pr-10 py-2.5 focus:outline-none focus:bg-white focus:border-sky-400 focus:ring-3 focus:ring-sky-100 transition-all"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
            >
              {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          disabled={loading}
          className="w-full bg-sky-600 hover:bg-sky-700 active:bg-sky-800 disabled:bg-slate-300 disabled:cursor-not-allowed text-white text-sm font-semibold py-2.5 rounded-xl shadow-sm shadow-sky-200 transition-all duration-150 flex items-center justify-center gap-2 mt-1"
        >
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              Signing in...
            </>
          ) : (
            "Sign In"
          )}
        </button>
      </form>

      {/* Register link */}
      <p className="text-center text-sm text-slate-400 mt-6">
        New to MediRecord?{" "}
        <Link
          to="/register"
          className="text-sky-600 hover:text-sky-700 font-semibold"
        >
          Create your account
        </Link>
      </p>
    </AuthLayout>
  );
}

export default LoginScreen;

// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Eye, EyeOff } from "lucide-react";
// import AuthLayout from "./AuthLayout";
// import { loginUser } from "../../api/auth.api";
// import { useAuth } from "../../context/AuthContext";
// import InputBox from "../UI/InputBox";

// function LoginScreen() {
//   const [showPassword, setShowPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const navigate = useNavigate();
//   const { login } = useAuth();

//   const handleChange = (e) => {
//     setError("");
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError("");
//     try {
//       const response = await loginUser(formData);
//       const data = response.data || {};
//       const statusCode = data.statusCode ?? response.status ?? 200;
//       if (statusCode >= 200 && statusCode < 300) {
//         const user = data.user || data.data?.user || {};
//         const token = data.accessToken || data.data?.accessToken || "";
//         // const user = data.data || {};
//         // const token = data.accessToken || data.data?.accessToken || "";
//         if (!token) {
//           setError("Login succeeded but no access token was returned");
//           return;
//         }
//         login(user, token);
//         navigate("/dashboard", { replace: true });
//       } else {
//         setError(data.message || "Login failed");
//       }
//     } catch (err) {
//       const statusCode = err.response?.status;
//       if (statusCode === 401) {
//         setError("Invalid email or password");
//       } else if (statusCode === 400) {
//         setError(
//           err.response?.data?.message ||
//             "Invalid input. Please check your email and password.",
//         );
//       } else {
//         setError(
//           err.response?.data?.message ||
//             err.message ||
//             "Login failed. Please try again.",
//         );
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <AuthLayout>
//       <form className="space-y-6" onSubmit={handleSubmit}>
//         {error && <div className="text-red-600 text-sm">{error}</div>}
//         <div>
//           <InputBox
//             label="Email"
//             type="email"
//             name="email"
//             value={formData.email}
//             onChange={handleChange}
//             required
//             className="w-full px-4 py-3 border rounded-lg"
//           ></InputBox>
//         </div>

//         <div>
//           <div className="relative">
//             <InputBox
//               label="Password"
//               type={showPassword ? "text" : "password"}
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               required
//               className="w-full px-4 py-3 border rounded-lg"
//             ></InputBox>

//             <button
//               type="button"
//               onClick={() => setShowPassword(!showPassword)}
//               className="absolute right-3 top-11"
//             >
//               {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//             </button>
//           </div>
//         </div>

//         <button
//           disabled={loading}
//           className="w-full bg-indigo-600 text-white py-3 rounded-lg"
//         >
//           {loading ? "Signing in..." : "Sign In"}
//         </button>

//         <p className="text-center text-sm">
//           Don’t have an account?{" "}
//           <Link to="/register" className="text-indigo-600">
//             Register
//           </Link>
//         </p>
//       </form>
//     </AuthLayout>
//   );
// }

// export default LoginScreen;
