import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

function Footer() {
  return (
    <footer className="bg-[linear-gradient(135deg,#0f2027,#203a43,#2c5364)] text-white py-6">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center">
        <div className="text-2xl font-bold mb-4 md:mb-0 text-yellow-300">
          Todo Manager
        </div>

        <ul className="flex flex-wrap justify-center md:justify-end gap-10 md:gap-6">
          <li>
            <a
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-teal-400 transition"
            >
              <FaFacebook className="w-6 h-6" />
              <span className="hidden md:inline">Facebook</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-teal-400 transition"
            >
              <FaTwitter className="w-6 h-6" />
              <span className="hidden md:inline">Twitter</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-teal-400 transition"
            >
              <FaInstagram className="w-6 h-6" />
              <span className="hidden md:inline">Instagram</span>
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 hover:text-teal-400 transition"
            >
              <FaLinkedin className="w-6 h-6" />
              <span className="hidden md:inline">LinkedIn</span>
            </a>
          </li>
        </ul>
      </div>

      <div className="mt-4 text-center text-sm text-gray-300">
        © {new Date().getFullYear()} Todo Manager. All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
