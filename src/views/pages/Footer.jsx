// Footer.jsx
import React from "react";
import { FaFacebook, FaFacebookF, FaGithub, FaLinkedin, FaLinkedinIn } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-900 py-10 text-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold">TStore</h3>
            <p className="text-sm text-gray-400">
              Building innovative solutions for a better tomorrow.
            </p>
            <div className="flex space-x-4">
              {/* Social Icons */}
              <a href="#" className="transition-colors hover:text-blue-400">
                <svg className="h-6 w-6" /* Twitter/X icon SVG */ />
              </a>
              <a href="#" className="transition-colors hover:text-blue-400">
                <svg className="h-6 w-6" /* Facebook icon SVG */ />
              </a>
              <a href="#" className="transition-colors hover:text-blue-400">
                <svg className="h-6 w-6" /* LinkedIn icon SVG */ />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link to="/" className="transition-colors hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="transition-colors hover:text-white"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="transition-colors hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contact Us</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Email: info@tstore.com</li>
              <li>Phone: (855) 456-7890</li>
              <li>Address: 1898 Phnom Penh St, City</li>
            </ul>
          </div>

          <div>
            <h4 className="mb-4 text-lg font-semibold">Follow us</h4>
            <div className="flex space-x-4 text-xl text-gray-600">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-blue-600  transition-colors hover:text-blue-200"
              >
                <FaFacebook/>
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray text-2xl  transition-colors hover:text-gray-100"
              >
                <FaGithub />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-2xl text-blue-600 transition-colors hover:text-blue-700"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 flex flex-col items-center justify-between border-t border-gray-800 pt-8 md:flex-row">
          <p className="text-sm text-gray-400">
            © {new Date().getFullYear()} Tola. All rights reserved.
          </p>
          <div className="mt-4 flex space-x-6 md:mt-0">
            <a
              href="#"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
