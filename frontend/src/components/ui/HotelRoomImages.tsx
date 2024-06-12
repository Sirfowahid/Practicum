import React, { useState } from 'react';
import hotelRoomData from '../../data/hotelRoomData';
import HotelRoomCard from './HotelRoomCard';
import Pagination from './Pagination'; 

const itemsPerPage = 9;

const HotelRoomImages = () => {
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(hotelRoomData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = hotelRoomData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRoomClick = (title:string) => {
    console.log(title);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((room, index) => (
          <HotelRoomCard
            key={index}
            image={room.image}
            title={room.title}
            description={room.description}
            price={room.price}
            bonus={room.bonus}
            onClick={() => handleRoomClick(room.title)}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default HotelRoomImages;