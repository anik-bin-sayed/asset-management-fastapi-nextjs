"use client";

import React, { useState } from "react";

const RegisterComponent = () => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeTerms: "",
  });

  const validateForm = () => {
    const newErrors = {
      fullName: "",
      email: "",
      password: "",
      confirmPassword: "",
      agreeTerms: "",
    };
    let valid = true;

    if (!fullName.trim()) {
      newErrors.fullName = "Full name is required";
      valid = false;
    }

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Valid email is required";
      valid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
      valid = false;
    }

    if (!agreeTerms) {
      newErrors.agreeTerms = "You must agree to the terms";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      alert("Registration successful! (Demo)");
    }, 1500);
  };

  return (
    <div className="h-screen flex items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 p-2 sm:p-4 overflow-hidden">
      <div className="max-w-sm mx-auto w-full mt-3">
        <div className="mb-3 sm:mb-4">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
            Create Account
          </h2>
          <p className="text-xs sm:text-sm text-gray-500 mt-0.5">
            Fill in your details to get started
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-2.5 sm:space-y-3">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5"
            >
              Full Name
            </label>
            <input
              id="fullName"
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="John Doe"
              className={`w-full px-3 py-2 sm:py-2.5 rounded-xl border ${
                errors.fullName
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-yellow-500"
              } bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm`}
            />
            {errors.fullName && (
              <p className="mt-0.5 text-xs text-red-500">{errors.fullName}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5"
            >
              Email Address
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className={`w-full px-3 py-2 sm:py-2.5 rounded-xl border ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-yellow-500"
              } bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm`}
            />
            {errors.email && (
              <p className="mt-0.5 text-xs text-red-500">{errors.email}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-3 py-2 sm:py-2.5 rounded-xl border ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-yellow-500"
              } bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm`}
            />
            {errors.password && (
              <p className="mt-0.5 text-xs text-red-500">{errors.password}</p>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-xs sm:text-sm font-medium text-gray-700 mb-0.5"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              className={`w-full px-3 py-2 sm:py-2.5 rounded-xl border ${
                errors.confirmPassword
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-yellow-500"
              } bg-gray-50/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:border-transparent transition-all duration-200 text-sm`}
            />
            {errors.confirmPassword && (
              <p className="mt-0.5 text-xs text-red-500">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          {/* Terms */}
          <div className="flex items-start gap-1.5">
            <input
              type="checkbox"
              checked={agreeTerms}
              onChange={(e) => setAgreeTerms(e.target.checked)}
              className="mt-0.5 w-3.5 h-3.5 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 accent-yellow-500"
            />
            <label className="text-xs text-gray-600 cursor-pointer leading-tight">
              I agree to the{" "}
              <a
                href="#"
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Terms of Service
              </a>{" "}
              and{" "}
              <a
                href="#"
                className="text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Privacy Policy
              </a>
            </label>
          </div>
          {errors.agreeTerms && (
            <p className="text-xs text-red-500">{errors.agreeTerms}</p>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2 sm:py-2.5 bg-yellow-500 hover:bg-yellow-600 text-black font-bold rounded-xl shadow-md shadow-yellow-500/30 hover:shadow-yellow-500/40 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] disabled:opacity-70 disabled:cursor-not-allowed text-sm flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-black"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  />
                </svg>
                Creating account...
              </>
            ) : (
              "Create Account"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="flex items-center gap-3 my-4 sm:my-5">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-[10px] sm:text-xs text-gray-400 font-medium">
            OR SIGN UP WITH
          </span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-2 sm:gap-3">
          <button className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-xs sm:text-sm font-medium text-gray-700 hover:shadow-sm">
            <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 48 48">
              <path
                fill="#EA4335"
                d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
              />
              <path
                fill="#4285F4"
                d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
              />
              <path
                fill="#FBBC05"
                d="M10.53 28.59A14.5 14.5 0 019.5 24c0-1.59.28-3.14.76-4.59l-7.98-6.19A23.99 23.99 0 000 24c0 3.77.87 7.35 2.56 10.56l7.97-5.97z"
              />
              <path
                fill="#34A853"
                d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 5.97C6.51 42.62 14.62 48 24 48z"
              />
            </svg>
            Google
          </button>
          <button className="flex items-center justify-center gap-1.5 px-3 py-2 sm:py-2.5 border border-gray-300 rounded-xl hover:bg-gray-50 transition-colors duration-200 text-xs sm:text-sm font-medium text-gray-700 hover:shadow-sm">
            <svg
              className="w-4 h-4 sm:w-5 sm:h-5"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.302 3.438 9.8 8.205 11.387.6.113.82-.26.82-.58 0-.287-.01-1.05-.015-2.06-3.338.726-4.042-1.416-4.042-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.838 1.237 1.838 1.237 1.07 1.834 2.807 1.304 3.492.997.108-.775.418-1.305.762-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.468-2.38 1.235-3.22-.123-.3-.535-1.52.117-3.16 0 0 1.008-.322 3.3 1.23.96-.267 1.98-.4 3-.405 1.02.005 2.04.138 3 .405 2.29-1.552 3.297-1.23 3.297-1.23.653 1.64.24 2.86.118 3.16.768.84 1.233 1.91 1.233 3.22 0 4.61-2.804 5.62-5.476 5.92.43.37.824 1.102.824 2.22 0 1.602-.015 2.894-.015 3.287 0 .322.216.698.83.578C20.565 21.795 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            GitHub
          </button>
        </div>

        {/* Login link */}
        <p className="text-center text-xs text-gray-500 mt-4 sm:mt-5">
          Already have an account?{" "}
          <a
            href="#"
            className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors"
          >
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default RegisterComponent;
