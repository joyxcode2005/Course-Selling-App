"use client";
import React, { useState } from "react";

// SVG Icon for the decorative side panel
const KeyIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="80"
    height="80"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-indigo-300"
  >
    <path d="M21 2l-2 2m-7.61 7.61a5.5 5.5 0 1 1-7.778 7.778 5.5 5.5 0 0 1 7.777-7.777zm0 0L15.5 7.5m0 0l3 3L22 7l-3-3m-3.5 3.5L19 4" />
  </svg>
);

const App = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords don't match!");
      return;
    }
    setError("");
    // Handle login logic here
    console.log("Logging in with:", { email, password });
  };

  return (
    <div className="bg-slate-900 flex items-center justify-center min-h-screen font-sans text-gray-300">
      <div className="relative flex flex-col w-full max-w-4xl m-6 bg-slate-800 shadow-2xl rounded-2xl md:flex-row md:space-y-0">
        {/* Left Side (Form) */}
        <div className="flex flex-col justify-center p-8 md:p-14 w-full md:w-1/2">
          <span className="mb-3 text-4xl font-bold text-white">Log In</span>
          <span className="font-light text-gray-400 mb-8">
            Welcome back! Please enter your details.
          </span>
          <form onSubmit={handleLogin}>
            <div className="py-4">
              <label
                htmlFor="email"
                className="mb-2 text-md font-medium text-gray-400"
              >
                Email
              </label>
              <input
                type="email"
                className="w-full p-3 mt-2 bg-slate-900 border border-slate-700 rounded-lg placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="you@example.com"
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
                className="w-full p-3 mt-2 bg-slate-900 border border-slate-700 rounded-lg placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="Enter your password"
              />
            </div>
            <div className="py-4">
              <label
                htmlFor="confirmPass"
                className="mb-2 text-md font-medium text-gray-400"
              >
                Confirm Password
              </label>
              <input
                type="password"
                name="confirmPass"
                id="confirmPass"
                className="w-full p-3 mt-2 bg-slate-900 border border-slate-700 rounded-lg placeholder:font-light placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  if (error) setError("");
                }}
                required
                placeholder="Confirm your password"
              />
            </div>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="flex justify-between w-full py-4 text-sm">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="ch"
                  id="ch"
                  className="mr-2 w-4 h-4 text-indigo-600 bg-gray-700 border-gray-600 rounded focus:ring-indigo-500"
                />
                <span>Remember Me</span>
              </div>
              <a
                href="#"
                className="font-semibold hover:text-white transition-colors"
              >
                Forgot password?
              </a>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold p-3 rounded-lg mb-6 hover:bg-indigo-700 focus:outline-none focus:ring-4 focus:ring-indigo-500/50 transition-all duration-300"
            >
              Log in
            </button>
          </form>
          <div className="text-center text-gray-400 text-sm">
            Don&apos;t have an account?
            <a
              href="#"
              className="font-semibold text-indigo-400 hover:underline ml-1"
            >
              Sign up
            </a>
          </div>
        </div>

        {/* Right Side (Image) */}
        <div className="relative hidden md:flex items-center justify-center rounded-r-2xl w-1/2 bg-slate-900">
          <div className="text-center p-8 flex flex-col items-center">
            <KeyIcon />
            <h2 className="text-3xl font-bold text-white mt-4">
              Learn Without Limits
            </h2>
            <p className="text-gray-400 mt-2 max-w-sm">
              Gain access to our curated library of courses and start your
              learning adventure today.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
