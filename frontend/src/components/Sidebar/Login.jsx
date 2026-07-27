import React, { useEffect, useState } from "react";

import Link from "next/link";
import { HiAdjustmentsHorizontal } from "react-icons/hi2";
import { SiGoogle } from "react-icons/si";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const LoginRegister = ({ setIsLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  // ESC key close

  // Prevent body scroll while drawer is open

  const validateForm = () => {
    const newErrors = {
      email: "",
      password: "",
    };

    let valid = true;

    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Valid email is required";
      valid = false;
    }

    if (!password || password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
      valid = false;
    }

    setErrors(newErrors);

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      alert("Login successful! (Demo)");

      onClose();
    }, 1500);
  };
  return (
    <div className="h-full overflow-y-auto">
      <div className="">
        <div className="w-full max-w-sm mx-auto  sm:px-8 sm:py-6 md:px-10 md:py-8 ">
          {/* Logo */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="text-xl font-bold text-gray-900">Learn </span>
            <span className="text-xl bg-yellow-500 rounded px-2 py-1 font-bold text-gray-900">
              Hub
            </span>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
            {/* Email */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email Address
              </label>

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className={`
              w-full
              px-4
              py-2.5
              sm:py-3
              rounded-xl
              border
              ${
                errors.email
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-yellow-500"
              }
              bg-gray-50/50
              text-gray-900
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:border-transparent
              transition-all
              duration-200
              text-sm
              sm:text-base
            `}
              />

              {errors.email && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">
                  {errors.email}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <a
                  href="#"
                  className="text-xs sm:text-sm text-yellow-600 hover:text-yellow-700 font-medium transition-colors"
                >
                  Forgot password?
                </a>
              </div>

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className={`
              w-full
              px-4
              py-2.5
              sm:py-3
              rounded-xl
              border
              ${
                errors.password
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-yellow-500"
              }
              bg-gray-50/50
              text-gray-900
              placeholder-gray-400
              focus:outline-none
              focus:ring-2
              focus:border-transparent
              transition-all
              duration-200
              text-sm
              sm:text-base
            `}
              />

              {errors.password && (
                <p className="mt-1 text-xs sm:text-sm text-red-500">
                  {errors.password}
                </p>
              )}
            </div>

            {/* Remember me */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded border-gray-300 text-yellow-500 focus:ring-yellow-500 accent-yellow-500"
                />
                Remember me
              </label>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading}
              className="
            w-full
            py-2.5
            sm:py-3.5
            bg-yellow-500
            hover:bg-yellow-600
            text-black
            font-bold
            rounded-xl
            shadow-md
            shadow-yellow-500/30
            hover:shadow-yellow-500/40
            transition-all
            duration-300
            hover:scale-[1.02]
            active:scale-[0.98]
            disabled:opacity-70
            disabled:cursor-not-allowed
            text-sm
            sm:text-base
            flex
            items-center
            justify-center
            gap-2
          "
            >
              Submit
            </button>
          </form>

          {/* Divider */}
          <div className="flex items-center gap-3 my-6 sm:my-8">
            <div className="flex-1 h-px bg-gray-200" />

            <span className="text-xs text-gray-400 font-medium">
              OR CONTINUE WITH
            </span>

            <div className="flex-1 h-px bg-gray-200" />
          </div>

          {/* Social buttons */}
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <button
              type="button"
              className="
            flex items-center justify-center gap-2
            px-4 py-2.5 sm:py-3
            border border-gray-300
            rounded-xl
            hover:bg-gray-50
            transition-colors duration-200
            text-sm font-medium text-gray-700
            hover:shadow-sm
          "
            >
              <FcGoogle className="w-5 h-5 " />
              Google
            </button>

            <button
              type="button"
              className="
            flex items-center justify-center gap-2
            px-4 py-2.5 sm:py-3
            border border-gray-300
            rounded-xl
            hover:bg-gray-50
            transition-colors duration-200
            text-sm font-medium text-gray-700
            hover:shadow-sm
          "
            >
              <FaGithub className="w-5 h-5 " />
              GitHub
            </button>
          </div>

          {/* Sign up */}
          <p className="text-center text-sm text-gray-500 mt-6 sm:mt-8">
            Don't have an account?{" "}
            <button
              onClick={() => setIsLogin(false)}
              className="text-yellow-600 hover:text-yellow-700 font-semibold transition-colors hover:underline cursor-pointer"
            >
              Sign up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginRegister;
