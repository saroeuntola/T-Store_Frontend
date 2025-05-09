import React, { useEffect, useState } from "react";
import { FaFacebook, FaGithub, FaLinkedin } from "react-icons/fa6";
import { ClipLoader } from "react-spinners"; // For the loading spinner

const Contact = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 mt-20 text-center text-4xl font-bold text-gray-800">
        Contact Us
      </h1>
      {loading ? (
        <div className="items-center justify-center text-center mb-32">
          <ClipLoader color="#0000FF" size={50} />
        </div>
      ) : (
        <div className="mx-auto grid max-w-4xl gap-8 md:grid-cols-2">
          <form className="space-y-4 rounded-lg bg-white p-6 shadow">
            <div>
              <label className="block text-gray-700">Name</label>
              <input
                type="text"
                placeholder="Your name"
                className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                placeholder="you@example.com"
                className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-gray-700">Subject</label>
              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-gray-700">Message</label>
              <textarea
                rows="5"
                placeholder="Write your message..."
                className="w-full rounded-md border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="rounded bg-blue-600 px-6 py-2 text-white hover:bg-blue-700"
            >
              Send Message
            </button>
          </form>

          {/* Contact Info */}
          <div className="space-y-4 rounded-lg bg-gray-50 p-6 shadow">
            <h2 className="mb-4 text-2xl font-semibold text-gray-800">
              Get in Touch
            </h2>
            <p className="text-gray-700">
              We'd love to hear from you. Reach out with any questions or
              feedback.
            </p>
            <div className="text-gray-600">
              <p>📍 Phnom Penh, Cambodia</p>
              <p>📞 +855 88 989 0692</p>
              <p>📧 support@tstore.com</p>
            </div>
            <div>
              <h3 className="mb-2 mt-4 font-medium text-gray-800">Follow us</h3>
              <div className="gap4 flex-wrap">
                <a
                  href="https://www.facebook.com/saroeun.tola123/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black-800 flex items-center space-x-2 hover:underline"
                >
                  <FaFacebook className="text-xl text-blue-600" />
                  <span>Facebook</span>
                </a>
                <a
                  href="https://github.com/saroeuntola"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black-600 flex items-center space-x-2 hover:underline"
                >
                  <FaGithub className="text-xl" />
                  <span>Github</span>
                </a>
                <a
                  href="https://www.linkedin.com/in/saroeun-tola-24a619285/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black-800 flex items-center space-x-2 hover:underline"
                >
                  <FaLinkedin className="text-xl text-blue-800" />
                  <span>Linkedin</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Contact;
