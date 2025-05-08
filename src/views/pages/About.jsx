import React from "react";
import seo from "./images/seo.png"
import tola from "./images/tola.jpg";
import koung from "./images/koung.jpg";
const About = () => {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="mb-8 mt-20 text-center text-4xl font-bold text-gray-800">
        About T-Store
      </h1>

      <div className="mx-auto max-w-4xl space-y-6 text-lg text-gray-700">
        <p>
          <strong>T-Store</strong> is a modern online shopping destination
          created to offer a seamless and secure experience for customers across
          Cambodia. From electronics and fashion to daily essentials, we make
          shopping simple and convenient.
        </p>

        <p>
          Our mission is to provide high-quality products at fair prices, while
          offering flexible and trusted payment methods like PayPal and Bakong
          KHQR.
        </p>

        <p>
          With fast delivery, friendly service, and a constantly growing
          catalog, we’re proud to be a store that supports both convenience and
          local innovation.
        </p>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Our Core Values
        </h2>
        <ul className="list-disc space-y-2 pl-6 text-gray-700">
          <li>✨ Customer-first service</li>
          <li>🔒 Secure & flexible payments</li>
          <li>🚚 Fast, reliable delivery</li>
          <li>🌱 Supporting local tech growth</li>
        </ul>
      </div>

      <div className="mx-auto mt-12 max-w-4xl">
        <h2 className="mb-4 text-2xl font-semibold text-gray-800">
          Meet the Team
        </h2>
        <div className="grid grid-cols-2 gap-6 sm:grid-cols-2 md:grid-cols-3">
          <div className="rounded-lg bg-white p-4 text-center shadow">
            <img
              src={tola}
              alt="John Doe"
              className="mx-auto mb-2 h-24 w-24 rounded-full"
            />
            <h3 className="font-bold">Tola</h3>
            <p className="text-sm text-gray-600">Backent Developer</p>
          </div>

          <div className="rounded-lg bg-white p-4 text-center shadow">
            <img
              src={koung}
              alt="John Doe"
              className="mx-auto mb-2 h-24 w-24 rounded-full"
            />
            <h3 className="font-bold">Koung</h3>
            <p className="text-sm text-gray-600">Frontend Developer</p>
          </div>

          <div className="rounded-lg bg-white p-4 text-center shadow">
            <img
              src={seo}
              alt="John Doe"
              className="mx-auto mb-2 h-24 w-24 rounded-full"
            />
            <h3 className="font-bold">Jonh</h3>
            <p className="text-sm text-gray-600">Founder & SEO</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
