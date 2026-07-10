import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaRobot,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import api from "../services/api";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const register = async () => {
    if (!username || !email || !password) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setLoading(true);

      await api.post("/auth/register", {
        username,
        email,
        password,
      });

      alert("Registration Successful!");

      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center">

      {/* Background Glow */}

      <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20 top-0 left-0 animate-pulse"></div>

      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20 bottom-0 right-0 animate-pulse"></div>

      {/* Card */}

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl w-[430px] p-10 z-10"
      >
        {/* Logo */}

        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="flex justify-center"
        >
          <div className="bg-cyan-500 p-5 rounded-full shadow-xl">
            <FaRobot className="text-white text-5xl" />
          </div>
        </motion.div>

        <h1 className="text-4xl font-bold text-center text-white mt-6">
          Create Account
        </h1>

        <p className="text-center text-gray-300 mt-3">
          Join AI Interview Coach and ace your dream job.
        </p>

        {/* Username */}

        <div className="relative mt-10">

          <FaUser className="absolute left-4 top-4 text-cyan-400" />

          <input
            type="text"
            placeholder="Username"
            className="w-full bg-slate-800/60 border border-slate-600 rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-cyan-400 transition"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

        </div>

        {/* Email */}

        <div className="relative mt-5">

          <FaEnvelope className="absolute left-4 top-4 text-cyan-400" />

          <input
            type="email"
            placeholder="Email Address"
            className="w-full bg-slate-800/60 border border-slate-600 rounded-xl pl-12 pr-4 py-4 text-white outline-none focus:border-cyan-400 transition"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

        </div>

        {/* Password */}

        <div className="relative mt-5">

          <FaLock className="absolute left-4 top-4 text-cyan-400" />

          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="w-full bg-slate-800/60 border border-slate-600 rounded-xl pl-12 pr-12 py-4 text-white outline-none focus:border-cyan-400 transition"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-4 text-gray-300"
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>

        </div>

        {/* Button */}

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.96 }}
          onClick={register}
          disabled={loading}
          className="mt-8 w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg shadow-lg"
        >
          {loading ? "Creating Account..." : "🚀 Register"}
        </motion.button>

        {/* Login Link */}

        <div className="text-center mt-7 text-gray-300">

          Already have an account?

          <Link
            to="/"
            className="text-cyan-400 ml-2 font-semibold hover:underline"
          >
            Login
          </Link>

        </div>

        {/* Badges */}

        <div className="flex justify-center gap-3 mt-8">

          <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
            AI
          </span>

          <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
            Voice
          </span>

          <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
            Resume
          </span>

        </div>

      </motion.div>
    </div>
  );
}

export default Register;