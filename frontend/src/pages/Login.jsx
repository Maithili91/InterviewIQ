import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FaEnvelope, FaLock, FaRobot, FaEye, FaEyeSlash } from "react-icons/fa";
import api from "../services/api";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const login = async () => {
    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email,
        password,
      });

      localStorage.setItem("token", res.data.access_token);
      localStorage.setItem("username", res.data.username);
      localStorage.setItem("email", res.data.email);
      localStorage.setItem("user_id", res.data.id);

      navigate("/dashboard");
    } catch (err) {
      alert("Invalid Email or Password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-slate-950 via-slate-900 to-cyan-950 flex items-center justify-center">

      {/* Background Glow */}
      <div className="absolute w-96 h-96 bg-cyan-500 rounded-full blur-[120px] opacity-20 top-0 left-0 animate-pulse"></div>

      <div className="absolute w-96 h-96 bg-purple-600 rounded-full blur-[120px] opacity-20 bottom-0 right-0 animate-pulse"></div>

      <motion.div
        initial={{ opacity: 0, y: 80 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="backdrop-blur-xl bg-white/10 border border-white/20 shadow-2xl rounded-3xl w-[430px] p-10 z-10"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{
            repeat: Infinity,
            duration: 3,
          }}
          className="flex justify-center"
        >
          <div className="bg-cyan-500 p-5 rounded-full">
            <FaRobot className="text-white text-5xl" />
          </div>
        </motion.div>

        <h1 className="text-4xl font-bold text-center text-white mt-6">
          AI Interview Coach
        </h1>

        <p className="text-center text-gray-300 mt-3">
          Ace your interviews with AI-powered mock sessions
        </p>

        {/* Email */}

        <div className="relative mt-10">

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

        <motion.button
          whileHover={{ scale: 1.04 }}
          whileTap={{ scale: 0.95 }}
          onClick={login}
          disabled={loading}
          className="mt-8 w-full py-4 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-white font-bold text-lg shadow-lg"
        >
          {loading ? "Signing In..." : "🚀 Login"}
        </motion.button>

        <div className="text-center mt-7 text-gray-300">

          Don't have an account?

          <Link
            to="/register"
            className="text-cyan-400 font-semibold ml-2 hover:underline"
          >
            Register
          </Link>

        </div>

        <div className="flex justify-center gap-3 mt-8">

          <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm">
            AI
          </span>

          <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm">
            Voice
          </span>

          <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm">
            Analytics
          </span>

        </div>

      </motion.div>

    </div>
  );
}

export default Login;