import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

export default function Login() {
  const [showPass, setShowPass] = useState(false);

  return (
    <div className="min-h-screen w-full flex items-center justify-center 
      bg-gradient-to-br from-green-100 via-emerald-100 to-white 
      dark:from-black dark:via-[#0a0a0a] dark:to-green-900/10 px-4 py-10 relative">

      {/* Glowing Floating Orbs */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-green-400/20 blur-3xl rounded-full animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-emerald-500/20 blur-3xl rounded-full animate-ping"></div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md backdrop-blur-2xl
        bg-white/30 dark:bg-white/5 shadow-2xl rounded-3xl p-10
        border border-white/40 dark:border-green-400/20 relative overflow-hidden"
      >

        {/* Shine Sweep */}
        <div className="absolute inset-0 opacity-20 bg-gradient-to-r 
          from-transparent via-white/60 to-transparent 
          animate-[shine_2.5s_linear_infinite] pointer-events-none"></div>

        {/* Header */}
        <div className="text-center mb-10 relative">
          <h2 className="text-4xl font-extrabold bg-gradient-to-r 
            from-green-600 to-emerald-500 bg-clip-text text-transparent">
            Welcome Back
          </h2>
          <p className="text-gray-700 dark:text-gray-300 mt-2">
            Login to your EcoInsight AI account
          </p>
        </div>

        {/* FORM */}
        <form className="space-y-6">
          {/* Email */}
          <div>
            <label className="text-gray-800 dark:text-gray-200 font-semibold">
              Email Address
            </label>
            <input
              type="email"
              required
              className="w-full px-4 py-3 mt-2 rounded-xl bg-white/70 dark:bg-white/10 
              backdrop-blur-xl border border-green-300/40 dark:border-green-400/20 
              focus:ring-4 focus:ring-green-300/50 outline-none transition shadow-md"
              placeholder="example@mail.com"
            />
          </div>

          {/* Password */}
          <div>
            <label className="text-gray-800 dark:text-gray-200 font-semibold">
              Password
            </label>
            <div className="relative mt-2">
              <input
                type={showPass ? "text" : "password"}
                required
                className="w-full px-4 py-3 rounded-xl bg-white/70 dark:bg-white/10 
                backdrop-blur-xl border border-green-300/40 dark:border-green-400/20 
                focus:ring-4 focus:ring-green-300/50 outline-none transition shadow-md"
                placeholder="••••••••"
              />

              <span
                onClick={() => setShowPass(!showPass)}
                className="absolute top-1/2 right-4 -translate-y-1/2 cursor-pointer 
                text-xl text-gray-700 dark:text-gray-200"
              >
                {showPass ? "👁️" : "👁️‍🗨️"}
              </span>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full py-3 rounded-xl text-lg font-semibold text-white 
            bg-gradient-to-r from-green-500 to-emerald-600 
            shadow-xl hover:shadow-2xl hover:scale-[1.02] transition"
          >
            Login
          </button>

          {/* Divider */}
          <div className="flex items-center gap-4 my-2">
            <div className="h-[1px] bg-gray-300 dark:bg-gray-600 flex-1"></div>
            <p className="text-gray-500 dark:text-gray-300 text-sm">OR</p>
            <div className="h-[1px] bg-gray-300 dark:bg-gray-600 flex-1"></div>
          </div>

          {/* Continue with Google */}
          <button
            type="button"
            className="w-full py-3 rounded-xl text-lg font-semibold 
            bg-white dark:bg-white/10 text-gray-700 dark:text-white 
            shadow-md flex items-center justify-center gap-3 border hover:scale-[1.02] transition"
          >
            <img
              src="https://www.svgrepo.com/show/475656/google-color.svg"
              className="w-6 h-6"
              alt=""
            />
            Continue with Google
          </button>
        </form>

        {/* Bottom Links */}
        <p className="text-center text-gray-700 dark:text-gray-300 mt-6">
          New here?{" "}
          <Link to="/signup" className="text-green-600 dark:text-green-400 font-semibold">
            Create Account
          </Link>
        </p>
      </motion.div>

      {/* Keyframes */}
      <style>{`
        @keyframes shine {
          0% { transform: translateX(-120%); }
          100% { transform: translateX(120%); }
        }
      `}</style>
    </div>
  );
}
