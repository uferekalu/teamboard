import { motion } from "framer-motion";
import React from "react";

interface AuthLayoutProps {
  variant: "login" | "signup";
  title: string;
  subtitle: string;
  children: React.ReactNode;
}

export default function AuthLayout({ variant, title, subtitle, children }: AuthLayoutProps) {
  // Dynamic styles and messages
  const isLogin = variant === "login";

  const bgClass = isLogin
    ? "from-indigo-600 to-purple-600"
    : "from-emerald-500 to-teal-600";

  const heading = isLogin ? "Welcome Back to TeamBoard 👋" : "Join the TeamBoard Community 🚀";

  const message = isLogin
    ? "Login to continue organizing, collaborating, and managing your projects effortlessly."
    : "Sign up to plan, track, and deliver projects seamlessly with your team.";

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left section: Intro area */}
      <motion.div
        className={`flex-1 bg-gradient-to-br ${bgClass} text-white flex flex-col justify-center items-center p-10 text-center`}
        initial={{ opacity: 0, x: -40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-3">TeamBoard</h1>
        <p className="text-lg md:text-xl font-medium mb-2">{heading}</p>
        <p className="text-base md:text-lg max-w-md opacity-90">{message}</p>
      </motion.div>

      {/* Right section: Form area */}
      <div className="flex-1 flex items-center justify-center p-6 bg-slate-50">
        <motion.div
          className="w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-gray-900 mb-1">{title}</h2>
          <p className="text-gray-500 mb-6">{subtitle}</p>
          {children}
        </motion.div>
      </div>
    </div>
  );
}
