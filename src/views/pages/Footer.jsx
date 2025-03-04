// Footer.jsx
import React from "react";

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
                <a href="#" className="transition-colors hover:text-white">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  About
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Services
                </a>
              </li>
              <li>
                <a href="#" className="transition-colors hover:text-white">
                  Contact
                </a>
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

          {/* Newsletter */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Newsletter</h4>
            <p className="mb-4 text-sm text-gray-400">
              Subscribe to our newsletter for updates
            </p>
            <form className="flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder="Your email"
                className="rounded-md px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
              <button
                type="submit"
                className="rounded-md bg-blue-600 px-4 py-2 transition-colors hover:bg-blue-700"
              >
                Subscribe
              </button>
            </form>
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
