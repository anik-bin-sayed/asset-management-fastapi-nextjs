import React from "react";

import { FaFacebookF, FaYoutube, FaGithub, FaLinkedinIn } from "react-icons/fa";

import { FiMail, FiPhone, FiMapPin } from "react-icons/fi";

import { SiGoogledisplayandvideo360 } from "react-icons/si";

const Footer = () => {
  return (
    <footer className="border-t border-gray-200 bg-gray-800 text-gray-300">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-yellow-400">
                <SiGoogledisplayandvideo360 className="h-5 w-5 text-gray-950" />
              </div>

              <h2 className="text-xl font-bold text-white">
                Learn<span className="text-yellow-400">Hub</span>
              </h2>
            </div>

            <p className="mt-4 max-w-sm text-sm leading-6 text-gray-400">
              Learn new skills, improve your knowledge and grow your career with
              our free and premium video courses.
            </p>

            <div className="mt-5 flex gap-3">
              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 transition hover:bg-yellow-400 hover:text-gray-950"
              >
                <FaFacebookF className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 transition hover:bg-yellow-400 hover:text-gray-950"
              >
                <FaYoutube className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 transition hover:bg-yellow-400 hover:text-gray-950"
              >
                <FaGithub className="h-4 w-4" />
              </a>

              <a
                href="#"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-gray-800 transition hover:bg-yellow-400 hover:text-gray-950"
              >
                <FaLinkedinIn className="h-4 w-4" />
              </a>
            </div>
          </div>
          {/* Courses */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Courses
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="#" className="transition hover:text-yellow-400">
                  Free Courses
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-yellow-400">
                  Paid Courses
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-yellow-400">
                  Programming
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-yellow-400">
                  Web Development
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-yellow-400">
                  Data Structures
                </a>
              </li>
            </ul>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 text-sm">
              <li>
                <a href="#" className="transition hover:text-yellow-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-yellow-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-yellow-400">
                  All Courses
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-yellow-400">
                  Instructors
                </a>
              </li>
              <li>
                <a href="#" className="transition hover:text-yellow-400">
                  Contact
                </a>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-white">
              Get In Touch
            </h3>

            <div className="mt-5 space-y-4 text-sm">
              <div className="flex items-start gap-3">
                <FiMail className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
                <span>support@learnhub.com</span>
              </div>

              <div className="flex items-start gap-3">
                <FiPhone className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
                <span>+880 1234-567890</span>
              </div>

              <div className="flex items-start gap-3">
                <FiMapPin className="mt-0.5 h-5 w-5 shrink-0 text-yellow-400" />
                <span>Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>
        {/* Bottom */}
        <div className="mt-10 border-t border-gray-800 pt-6">
          <div className="flex flex-col items-center justify-between gap-4 text-sm md:flex-row">
            <p className="text-gray-500">
              © {new Date().getFullYear()} LearnHub. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a href="#" className="transition hover:text-yellow-400">
                Privacy Policy
              </a>

              <a href="#" className="transition hover:text-yellow-400">
                Terms & Conditions
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
