import React from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

interface HotelRoomCardProps {
  image: string;
  title: string;
  price: string;
  bonus?: string;
  discount?: number;
  availability: boolean;
  onClick: () => void; 
}

const HotelRoomCard: React.FC<HotelRoomCardProps> = ({ 
  image, 
  title, 
  price, 
  bonus,
  discount, 
  availability, 
  onClick 
}) => {
  return (
    <div 
      className="relative p-4 bg-white rounded-lg shadow-md hover:transform hover:scale-105 transition-transform duration-300 cursor-pointer" 
      onClick={onClick}
    >
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      {discount && (
        <div className="absolute top-2 left-2 bg-red-500 text-white text-xs font-bold py-1 px-2 rounded-full">
          {discount}% OFF
        </div>
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold border-b-2 border-slate-950 mb-2">{title}</h3>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-md font-bold">{price}</span>
          <span className={`flex items-center text-sm font-semibold ${availability ? 'text-green-500' : 'text-red-500'}`}>
            {availability ? <FaCheckCircle className="mr-1" /> : <FaTimesCircle className="mr-1" />}
            {availability ? 'Available' : 'Unavailable'}
          </span>
        </div>
        {bonus && (
          <div className="mt-2 text-green-500 font-semibold">
            {bonus}
          </div>
        )}
      </div>
    </div>
  );
};

export default HotelRoomCard;
