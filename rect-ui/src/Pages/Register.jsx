import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import login from "../Pages/Login.jsx"
import {NavLink} from "react-router-dom"
import { useNavigate} from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false); 
  
  const [showForm, setShowForm] = useState(false);
  

  useEffect(() => {
    const timer = setTimeout(() => setShowForm(true), 3500); // cartoon + light duration
    return () => clearTimeout(timer);
  }, []);
  // ✅ NEW: handle input change
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
  const navigate = useNavigate();

  // ✅ NEW: handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Registration failed");
        setLoading(false);
        return;
      }
      localStorage.setItem("token", data.token);

      alert("Registration successful 🎉");
      navigate("/dashbaord")
     
    } catch (error) {
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black flex items-center justify-center overflow-hidden relative">
      {/* Cartoon Animation */}
      <AnimatePresence>
        {!showForm && (
          <motion.div
            className="absolute flex flex-col items-center"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2 }}
          >
            <motion.div
              className="w-40 h-40 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 shadow-xl"
              animate={{ y: [0, -20, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            />
            <p className="text-gray-300 mt-4 text-lg">
              ✨ Activating System...
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Light Flash */}
      {!showForm && (
        <motion.div
          className="absolute inset-0 bg-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.9, 0] }}
          transition={{ delay: 2.2, duration: 1 }}
        />
      )}

      {/* Registration Form */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            className="w-full max-w-md bg-zinc-900 text-white rounded-2xl p-8 shadow-2xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-3xl font-bold text-center mb-6">
              Create Account
            </h2>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="fullname"
                value={formData.fullname}
                onChange={handleChange}
                placeholder="Full Name"
                className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-purple-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-purple-500"
              />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 rounded-lg bg-black border border-gray-700 focus:outline-none focus:border-purple-500"
              />

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500 font-semibold hover:opacity-90"
              >
                
                Register
              </button>
            </form>

            <p className="text-sm text-gray-400 text-center mt-4">
              Already have an account?{" "}
              <NavLink to="/login">
                <span className="text-purple-400 cursor-pointer">Login</span>
              </NavLink>
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
