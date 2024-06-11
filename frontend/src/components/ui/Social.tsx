import React from 'react'
import { FaFacebook, FaTwitter, FaInstagram } from 'react-icons/fa';
import Title from './Title';

const Social = () => {
  return (
    <>
    <Title>Social Contact</Title>
    <div className="flex items-center justify-center space-x-6 mb-6">
      <a href="#" className="text-gray-600 hover:text-blue-600 transition duration-300">
        <FaFacebook className="text-6xl" />
      </a>
      <a href="#" className="text-gray-600 hover:text-blue-400 transition duration-300">
        <FaTwitter className="text-6xl" />
      </a>
      <a href="#" className="text-gray-600 hover:text-pink-600 transition duration-300">
        <FaInstagram className="text-6xl" />
      </a>
    </div>
    </>
  )
}

export default Social