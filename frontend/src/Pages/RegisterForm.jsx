import React, { useState } from "react";
import { motion } from "framer-motion";
import { NavLink } from "react-router-dom";
import Header from "../Components/Header";

const RegisterForm = () => {
  const [form, setForm] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordStrength, setPasswordStrength] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (name === "password") {
      checkPasswordStrength(value);
    }

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const checkPasswordStrength = (password) => {
    const strongRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/;
    if (password.length === 0) {
      setPasswordStrength("");
    } else if (!strongRegex.test(password)) {
      setPasswordStrength("weak");
    } else {
      setPasswordStrength("strong");
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.firstname.trim()) newErrors.firstname = "First name is required";
    if (!form.lastname.trim()) newErrors.lastname = "Last name is required";
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (passwordStrength === "weak") {
      newErrors.password = "Password must be stronger";
    }
    if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return (
    <>
      <Header />
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-80px)] p-6">
            <motion.form
            // onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.6 }}
            className="w-full max-w-md p-6 bg-white rounded-lg shadow space-y-4"
            encType="multipart/form-data"
            >
          <h2 className="text-4xl font-extrabold text-center text-purple-700">Sign Up</h2>
          <p className="text-center text-gray-500">Create your account to get started</p>

          {errorMessage && (
            <div className="text-red-600 text-center p-2 rounded bg-red-100">
              {errorMessage}
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {["firstname", "lastname"].map((field) => (
              <div key={field}>
                <label className="block text-gray-700">{field}</label>
                <input
                  type="text"
                  name={field}
                  value={form[field]}
                  onChange={handleChange}
                  className="w-full border rounded p-2"
                />
                {errors[field] && <p className="text-red-500 text-sm">{errors[field]}</p>}
              </div>
            ))}
          </div>

          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Image</label>
            <input
              type="file"
              name="image"
              accept="image/*"
              className="w-full"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {passwordStrength && (
              <p className={`text-sm mt-1 ${passwordStrength === "weak" ? "text-red-500" : "text-green-500"}`}>
                {passwordStrength === "weak"
                  ? "Password too weak (min 8 chars, 1 uppercase, 1 number)"
                  : "Strong password"}
              </p>
            )}
            {errors.password && <p className="text-red-500 text-sm">{errors.password}</p>}
          </div>

          <div>
            <label className="block text-gray-700">Confirm Password</label>
            <input
              type="password"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 px-4 rounded transition"
          >
            {isSubmitting ? "Signing up..." : "Sign Up"}
          </button>

          <p className="text-center mt-4 text-sm text-gray-600">
            Already have an account?{" "}
            <NavLink to="/login" className="text-purple-600 hover:underline">
              Login here
            </NavLink>
          </p>
        </motion.form>
      </div>
    </>
  );
};

export default RegisterForm;
