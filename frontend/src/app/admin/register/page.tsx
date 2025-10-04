"use client";
import Link from "next/link";
import React, { useState } from "react";
import { motion } from "motion/react";

// SVG Icon for the admin panel
const AdminIcon = () => (
  <motion.svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-teal-300"
  >
    {/* Outer shield path */}
    <motion.path
      d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{
        duration: 1.5,
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0.5,
      }}
    />

    {/* Checkmark path */}
    <motion.path
      d="m9 12 2 2 4-4"
      initial={{ opacity: 0, pathLength: 0 }}
      animate={{ opacity: 1, pathLength: 1 }}
      transition={{
        duration: 1,
        ease: "easeInOut",
        delay: 0.2,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 1,
      }}
    />
  </motion.svg>
);

const AdminRegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setError("");
    // Handle admin login logic here
    console.log("Admin logging in with:", { email, password });
  };

  return (
    <div className="bg-slate-900 flex items-center justify-center min-h-screen font-sans text-gray-300">
      <div className="relative flex flex-col w-full max-w-4xl m-6 bg-slate-800 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left Side (Form) */}
        <div className="flex flex-col justify-center p-4 md:p-12 w-full md:w-1/2">
          <span className="mb-3 text-4xl font-bold text-white">
            Admin Access
          </span>
          <span className="font-light text-gray-400 mb-8">
            Please register to manage the platform.
          </span>
          <form onSubmit={handleLogin}>
            <div className="">
              <label
                htmlFor="email"
                className="mb-2 text-md font-medium text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 mt-2 bg-slate-900 border border-slate-700 rounded-lg placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="admin@example.com"
              />
            </div>
            <div className="py-4">
              <label
                htmlFor="firstName"
                className="mb-2 text-md font-medium text-gray-400"
              >
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                id="firstName"
                className="w-full p-3 mt-2 bg-slate-900 border border-slate-700 rounded-lg placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="py-4">
              <label
                htmlFor="lastName"
                className="mb-2 text-md font-medium text-gray-400"
              >
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                id="lastName"
                className="w-full p-3 mt-2 bg-slate-900 border border-slate-700 rounded-lg placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="py-4">
              <label
                htmlFor="pass"
                className="mb-2 text-md font-medium text-gray-400"
              >
                Password
              </label>
              <input
                type="password"
                name="pass"
                id="pass"
                className="w-full p-3 mt-2 bg-slate-900 border border-slate-700 rounded-lg placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex justify-end w-full py-4 text-sm">
              <Link
                href="/admin/login"
                className="font-semibold hover:text-white transition-colors"
              >
                Already have an account? Log In
              </Link>
            </div>
            <button
              type="submit"
              className="w-full bg-teal-600 text-white font-bold p-3 rounded-lg mb-6 hover:bg-teal-700 focus:outline-none focus:ring-4 focus:ring-teal-500/50 transition-all duration-300"
            >
              Log In
            </button>
          </form>
        </div>

        {/* Right Side (Decorative Panel) */}
        <div className="relative hidden md:flex items-center justify-center rounded-r-2xl w-1/2 bg-slate-900">
          <div className="text-center p-8 flex flex-col items-center">
            <AdminIcon />
            <h2 className="text-3xl font-bold text-white mt-4">
              Control Panel
            </h2>
            <p className="text-gray-400 mt-2 max-w-sm">
              Manage courses, users, and site settings from this centralized
              dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRegisterPage;
