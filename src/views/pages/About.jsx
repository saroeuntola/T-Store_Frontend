import React from 'react';
import { Card } from 'flowbite-react';

const About = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <Card className="max-w-4xl w-full shadow-xl p-8 rounded-lg bg-white">
        <h2 className="text-4xl font-extrabold text-center text-gray-900">About Us</h2>
        <p className="mt-4 text-gray-700 text-center text-lg">
          Welcome to our platform! We are passionate about delivering the best experience to our users.
          Our mission is to create innovative solutions that drive engagement and efficiency.
        </p>
        
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="text-center p-6 border rounded-lg shadow-md bg-gray-50">
            <h3 className="text-2xl font-semibold text-gray-800">Our Mission</h3>
            <p className="text-gray-600 mt-2">
              We strive for excellence by continuously improving and adapting to the ever-changing landscape of technology and user needs.
            </p>
          </div>
          <div className="text-center p-6 border rounded-lg shadow-md bg-gray-50">
            <h3 className="text-2xl font-semibold text-gray-800">Our Vision</h3>
            <p className="text-gray-600 mt-2">
              To be a leader in the industry by empowering our users with cutting-edge solutions that redefine convenience and efficiency.
            </p>
          </div>
        </div>

        <div className="mt-10 text-center">
          <h3 className="text-2xl font-semibold text-gray-900">Meet Our Team</h3>
          <p className="text-gray-600 mt-2">Our dedicated professionals work tirelessly to bring you the best experience.</p>
          <div className="mt-6 flex flex-wrap justify-center gap-6">
            <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">CEO</div>
            <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">CTO</div>
            <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">Designer</div>
            <div className="w-40 h-40 bg-gray-200 rounded-full flex items-center justify-center text-gray-700 font-bold">Developer</div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default About;
