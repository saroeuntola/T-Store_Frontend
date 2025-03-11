import React from 'react';
import { Card, TextInput, Textarea, Button } from 'flowbite-react';

const Contact = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-600 p-6">
      <Card className="max-w-3xl w-full shadow-xl p-8 rounded-lg bg-white">
        <h2 className="text-3xl font-bold text-center text-gray-900">Contact Us</h2>
        <p className="text-gray-600 text-center mt-2">
          Have questions or need support? Fill out the form below and we'll get back to you as soon as possible.
        </p>
        
        <form className="mt-6">
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Name</label>
            <TextInput type="text" placeholder="Your Name" required className="mt-2 w-full" />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Email</label>
            <TextInput type="email" placeholder="Your Email" required className="mt-2 w-full" />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 font-semibold">Message</label>
            <Textarea placeholder="Write your message here..." required className="mt-2 w-full" rows={5} />
          </div>
          
          <div className="flex justify-center mt-6">
            <Button gradientDuoTone="purpleToBlue" type="submit" className="w-full md:w-auto px-6 py-2 text-lg">
              Send Message
            </Button>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Contact;
