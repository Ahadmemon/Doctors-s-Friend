import React from "react";

function RegisterScreen({ onSwitch }) {
  return (
    <form className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <input
          type="text"
          required
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          required
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          required
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <button className="w-full bg-indigo-600 text-white py-3 rounded-lg">
        Create Account
      </button>

      <p className="text-center text-sm">
        Already have an account?{" "}
        <button type="button" onClick={onSwitch} className="text-indigo-600">
          Sign In
        </button>
      </p>
    </form>
  );
}

export default RegisterScreen;
