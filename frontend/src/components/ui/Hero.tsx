import React from 'react';
import SearchBarDate from './SearchBarDate';
interface Props {
    image: string;
    title: string;
    descripton: string;
  }
const Hero = ({ image, title, descripton}:Props) => {
  const handleSearch = (fromDate:string,toDate:string) => {
  };
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background image */}
      <img
        src={image}
        className="absolute inset-0 w-full h-full object-cover"
        alt="Background"
      />
      {/* Text on top */}
      <div className="relative z-10 flex items-center justify-center h-full">
        <div className="text-white text-center">
          <h1 className="text-5xl font-bold mb-4">{title}</h1>
          <p className="text-lg">{descripton}</p>
          <div className='my-4'>

          </div>
        </div>
      </div>
      {/* Optional overlay */}
      
        <div className="absolute inset-0 bg-black opacity-50 z-0 flex items-center justify-center">
        </div>
     
    </div>
  );
};

export default Hero;
