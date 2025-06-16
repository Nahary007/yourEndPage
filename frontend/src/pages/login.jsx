import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router";
import { motion } from "framer-motion";
import Header from "../components/Header";
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
    const [error, setError] = useState('');
    const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post('http://localhost:4000/api/auth/login', formData);
      const token = res.data.token;
      localStorage.setItem('token', token);
      setFormData({ email: '', password: '' });
      navigate('/home');
    } catch (err) {
      console.log(err.response?.data?.message || 'Erreur lors de la connexion ❌');
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-col items-center justify-center w-screen h-screen text-gray-700 bg-gradient-to-br from-gray-900 via-purple-950 to-black">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: "easeOut" }}
          className="min-w-md mx-auto p-6 bg-white rounded-lg shadow space-y-4"
        >
          <h2 className="text-2xl font-bold text-center">Connexion</h2>

          <div>
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded p-2"
              required
            />
          </div>


          {error && (
            <div className="text-red-600 text-center mb-2">{error}</div>
          )}
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
          >
            Se connecter
          </button>

          <div className="text-center text-sm text-gray-600">
            Mot de passe oublié ?{" "}
            <a href="#" className="text-blue-600 hover:underline">
              Réinitialiser
            </a>
            <br />
            Pas encore de compte ?{" "}
            <NavLink to="/register" className="text-blue-600 hover:underline">
              S'inscrire
            </NavLink>
          </div>
        </motion.form>
      </div>
    </>
  );
};

export default LoginForm;
