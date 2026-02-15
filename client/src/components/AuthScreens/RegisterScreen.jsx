import React, { useState } from "react";
import { registerUser } from "../../api/auth.api";

function RegisterScreen({ onSwitch }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
    registrationNumber: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      console.log(response.data);
    } catch (error) {
      console.log(`Error ${error}`);
    }
  };
  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label className="block text-sm font-medium mb-2">Full Name</label>
        <input
          type="text"
          name="fullName"
          placeholder="John Doe"
          onChange={handleChange}
          required
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="email"
          name="email"
          placeholder="example@gmail.com"
          required
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Email</label>
        <input
          type="text"
          name="registrationNumber"
          placeholder="ABC 123 456"
          required
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-2">Password</label>
        <input
          type="password"
          name="password"
          required
          onChange={handleChange}
          className="w-full px-4 py-3 border rounded-lg"
        />
      </div>

      <button
        className="w-full bg-indigo-600 text-white py-3 rounded-lg"
        type="submit"
      >
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
