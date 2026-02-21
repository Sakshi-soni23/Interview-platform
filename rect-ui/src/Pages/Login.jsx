import React, { useState } from "react";
import { motion } from "framer-motion";
import { RiLoginBoxFill } from "react-icons/ri";
import Robot from "../assets/Images/Ro.jpg";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [otp, setOtp] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);
  const [userId, setUserId] = useState(null);
  const [loading, setLoading] = useState(false);

  // Step 1: Login → Send OTP
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Login failed");
        return;
      }

      setUserId(data.userId);
      setShowOtpInput(true);
      alert("OTP sent to your email 📧");
      
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (!otp) {
      alert("Enter OTP");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/auth/verify-otp", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, otp }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message || "Invalid OTP");
        return;
      }

      localStorage.setItem("token", data.token);
      alert("Login successful 🎉");
      navigate("/dashbaord");
    } catch (err) {
      alert("Server error ❌");
    } finally {
      setLoading(false);
    }
  };

  return (
    <header className="min-h-screen flex items-center justify-center">
      <div className="flex items-center justify-evenly w-full max-w-6xl">
        <motion.img
          src={Robot}
          alt="Robot"
          className="w-80 drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]"
          initial={{ x: -100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        />

        <motion.div
          className="bg-gray-900/70 backdrop-blur-xl p-10 rounded-2xl 
                     shadow-[0_20px_50px_rgba(0,0,0,0.9)]
                     border border-gray-700 w-96"
          initial={{ x: 100, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <div className="flex items-center justify-center gap-3 mb-8">
            <RiLoginBoxFill color="white" size={35} />
            <h1 className="text-white text-3xl font-semibold">
              {showOtpInput ? "Verify OTP" : "Login"}
            </h1>
          </div>

          {!showOtpInput ? (
            <form className="space-y-5" onSubmit={handleLogin}>
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white"
              />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white"
              />
              <button className="w-full py-3 bg-purple-600 rounded-lg text-white">
                {loading ? "Sending OTP..." : "Login"}
              </button>
            </form>
          ) : (
            <form className="space-y-5" onSubmit={handleVerifyOtp}>
              <input
                type="number"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-gray-800 text-white"
              />
              <button className="w-full py-3 bg-purple-600 rounded-lg text-white">
                {loading ? "Verifying..." : "Verify OTP"}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </header>
  );
};

export default Login;
