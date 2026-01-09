import React from "react";
import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

function LoginScreen({ onSwitch }) {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <form className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          required
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            required
            className="w-full px-4 py-3 border rounded-lg"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3.5"
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>
      </div>

      <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
        Sign In
      </button>

      <p className="text-center text-sm">
        Don’t have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-indigo-600">
          Register
        </button>
      </p>
    </form>
  );
}

export default LoginScreen;
