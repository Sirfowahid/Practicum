import React, { useState } from 'react';
import hotelRoomData from '../../data/hotelRoomData';
import { useNavigate } from 'react-router-dom';
import HotelRoomCard from './HotelRoomCard';
import Pagination from './Pagination'; 

const itemsPerPage = 9;
interface Props {
  role:string
}
const HotelRoomImages = ({role}:Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();

  const totalPages = Math.ceil(hotelRoomData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = hotelRoomData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRoomClick = (roomId: number) => {
    navigate(`/${role}/rooms/${roomId}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((room, index) => (
          <HotelRoomCard
            key={index}
            image={room.image}
            title={room.title}
            price={room.price}
            bonus={room.bonus}
            discount={room.discount}
            availability={room.availability}
            onClick={() => handleRoomClick(room.id)}
          />
        ))}
      </div>
      <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
};

export default HotelRoomImages;
