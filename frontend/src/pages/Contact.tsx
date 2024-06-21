import React from 'react';
import { FaUser, FaEnvelope, FaPaperPlane, FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';

const Contact: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900">Contact Us</h2>
        <form action="#" method="POST">
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="text-gray-400" />
              </div>
              <input
                type="text"
                id="name"
                name="name"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Your Name"
              />
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="text-gray-400" />
              </div>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Your Email"
              />
            </div>
          </div>
          <div className="mb-6">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <textarea
                id="message"
                name="message"
                rows={4} // Ensure rows is a number
                className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="Your Message"
              ></textarea>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex items-center justify-center px-4 py-2 bg-blue-500 text-white font-semibold rounded-md shadow-sm hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              <FaPaperPlane className="mr-2" /> Send Message
            </button>
          </div>
        </form>
        <div className="mt-8">
          <h3 className="text-center text-gray-600">Follow us on</h3>
          <div className="flex justify-center space-x-4 mt-4">
            <a href="https://facebook.com" className="text-gray-500 hover:text-blue-600">
              <FaFacebook size="24" />
            </a>
            <a href="https://twitter.com" className="text-gray-500 hover:text-blue-400">
              <FaTwitter size="24" />
            </a>
            <a href="https://instagram.com" className="text-gray-500 hover:text-pink-500">
              <FaInstagram size="24" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
