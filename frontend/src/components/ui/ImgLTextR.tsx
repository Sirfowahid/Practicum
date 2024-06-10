import React from 'react'
import Heading from './Heading';
import Paragraph from './Paragraph';
interface Props {
    imageUrl: string;
    title: string;
    description: string;
  }
const ImgLTextR = ({ imageUrl, title, description }:Props) => {
  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left side with image */}
      <div className="md:w-1/2 w-full h-64 md:h-auto">
        <img
          src={imageUrl}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      {/* Right side with text */}
      <div className="md:w-1/2 w-full flex items-center justify-center p-8 bg-gray-100">
        <div className="text-center md:text-left">
          <Heading>{title}</Heading>
          <Paragraph>{description}</Paragraph>
        </div>
      </div>
    </div>
  )
}

export default ImgLTextR