import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const HotelImageCardSkeleton: React.FC = () => {
  return (
    <div className="relative p-4 bg-gray-200 rounded-lg shadow-md animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded-t-lg"></div>
      <div className="p-4">
        <div className="h-6 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
        <div className="h-4 bg-gray-300 rounded-md mb-2"></div>
        <div className="flex items-center justify-between mt-2">
          <div className="h-4 bg-gray-300 rounded-md w-1/4"></div>
          <FaSpinner className="animate-spin text-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default HotelImageCardSkeleton;
