import React from 'react';

interface HotelRoomCardProps {
  image: string;
  title: string;
  description: string;
  price: string;
  bonus?: string;
  onClick: () => void; 
}

const HotelRoomCard: React.FC<HotelRoomCardProps> = ({ image, title, description, price, bonus, onClick }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md hover:transfrom hover:scale-105 transition-transform duration-300" onClick={onClick}>
      <img src={image} alt={title} className="w-full h-48 object-cover rounded-t-lg" />
      <div className="p-4">
        <h3 className="text-lg font-semibold border-b-2 border-slate-950 mb-2">{title}</h3>
        <p className="text-gray-700">{description}</p>
        <div className="mt-2">
          <span className="text-md font-bold">{price}</span>
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
