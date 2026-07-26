"use client";

import React, { useEffect, useState, useRef } from "react";

const Navbar = () => {
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navRef = useRef();
  const menuRef = useRef();
  const searchInputRef = useRef();

  // Handle scroll: hide navbar on down, show on up, close mobile & search on scroll down
  const handleScroll = () => {
    const currentScrollY = window.scrollY;
    if (currentScrollY > lastScrollY && currentScrollY > 100) {
      setShowNavbar(false);
      if (mobileMenuOpen) setMobileMenuOpen(false);
      if (searchOpen) setSearchOpen(false);
    } else {
      setShowNavbar(true);
    }
    setLastScrollY(currentScrollY);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY, mobileMenuOpen, searchOpen]);

  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        mobileMenuOpen &&
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        navRef.current &&
        !navRef.current.contains(event.target)
      ) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [mobileMenuOpen]);

  // Close search on Escape key
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape" && searchOpen) {
        setSearchOpen(false);
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [searchOpen]);

  //    When search opens, focus the input
  useEffect(() => {
    if (searchOpen && searchInputRef.current) {
      setTimeout(() => searchInputRef.current.focus(), 200);
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) setMobileMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      {/* Overlay for mobile menu */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 md:hidden transition-opacity duration-300"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* Navbar */}
      <nav
        ref={navRef}
        className={`bg-white backdrop-blur-md shadow-lg border-b border-gray-100/50 px-4 sm:px-6 py-3 flex items-center justify-between fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          showNavbar ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        {/* Logo */}
        <div className="flex items-center gap-2 shrink-0">
          <div className="text-2xl font-bold text-yellow-500 tracking-tight">
            EduHub
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8">
          <a
            href="#"
            className="text-gray-700 font-medium transition-colors duration-200 py-1 px-2 rounded-lg hover:bg-gray-100 hover:text-yellow-600"
          >
            All Courses
          </a>
          <a
            href="#"
            className="text-gray-700 font-medium transition-colors duration-200 py-1 px-2 rounded-lg hover:bg-gray-100 hover:text-yellow-600"
          >
            Free Courses
          </a>
        </div>

        {/* Right side: Login/Register + Search Icon + Hamburger */}
        <div className="flex items-center gap-2 sm:gap-3 shrink-0">
          {/* Login & Register Buttons */}
          <button className="px-3 sm:px-5 py-1.5 sm:py-2 text-gray-700 font-medium rounded-md hover:bg-gray-100 transition-colors duration-200 cursor-pointer text-sm sm:text-base">
            Login
          </button>
          <button className="px-3 sm:px-5 py-1.5 sm:py-2 bg-yellow-500 text-black font-medium rounded-md hover:bg-yellow-600 transition-colors duration-200 shadow-sm cursor-pointer text-sm sm:text-base">
            Register
          </button>

          {/* Search Icon - visible on all screens, placed before hamburger */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-gray-600 hover:text-yellow-500 transition-colors focus:outline-none"
            aria-label="Open search"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>

          {/* Hamburger Menu Button (mobile only) */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden flex flex-col items-center justify-center w-8 h-8 ml-1 text-gray-600 hover:text-yellow-500 focus:outline-none"
            aria-label="Toggle menu"
          >
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "rotate-45 translate-y-1.5" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "opacity-0" : ""
              }`}
            />
            <span
              className={`block w-5 h-0.5 bg-current transition-all duration-300 ${
                mobileMenuOpen ? "-rotate-45 -translate-y-1.5" : ""
              }`}
            />
          </button>
        </div>
      </nav>

      {/* Slide-down Search Bar  */}
      <div
        className={`fixed top-0 left-0 right-0 z-40 bg-white shadow-lg transition-all duration-300 ease-in-out ${
          searchOpen
            ? "translate-y-0 opacity-100 pointer-events-auto"
            : "-translate-y-full opacity-0 pointer-events-none"
        }`}
        style={{ marginTop: "64px" }}
      >
        <div className="max-w-4xl mx-auto px-4 py-6 flex items-center gap-4">
          <div className="relative flex-1">
            <input
              ref={searchInputRef}
              type="text"
              placeholder="What do you want to learn?"
              className="w-full px-2 py-2 pl-12 text-lg border border-yellow-400 rounded-md focus:outline-none focus:ring-0 outline-yellow-400 transition-all "
            />
            <svg
              className="absolute left-3 top-3 h-6 w-6 text-yellow-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <button
            onClick={() => setSearchOpen(false)}
            className="p-2 text-gray-500 hover:text-gray-700 transition-colors"
            aria-label="Close search"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu (slide-in from right) */}
      <div
        ref={menuRef}
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-2xl z-50 md:hidden transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-6 pt-20 space-y-4">
          <div className="space-y-2">
            <a
              href="#"
              className="block text-gray-800 font-medium py-2 px-3 rounded-lg hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              All Courses
            </a>
            <a
              href="#"
              className="block text-gray-800 font-medium py-2 px-3 rounded-lg hover:bg-yellow-50 hover:text-yellow-600 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              Free Courses
            </a>
          </div>
          <div className="pt-4 border-t border-gray-100">
            <button className="w-full py-2 text-center text-gray-600 font-medium rounded-lg hover:bg-gray-50 transition-colors">
              Login
            </button>
            <button className="w-full py-2 mt-2 text-center bg-yellow-500 text-black font-medium rounded-lg hover:bg-yellow-600 transition-colors">
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
