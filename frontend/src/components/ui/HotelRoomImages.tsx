import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HotelRoomCard from "./HotelRoomCard";
import Pagination from "./Pagination";
import { useGetRoomsQuery } from "../../slices/roomsApiSlice";
import Error from "./Error";
import roomImg from "../../assets/home/room1.jpg";
import HotelImageCardSkeleton from "./HotelRoomCardSkeleton";

const itemsPerPage = 9;

interface Props {
  role: string;
}

interface Room {
  _id: string;
  image: string;
  title: string;
  price: string;
  bonus: string;
  discount: number;
  availability: boolean;
}

const HotelRoomImages = ({ role }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetRoomsQuery();
  
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: itemsPerPage }).map((_, index) => (
          <HotelImageCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (isError) {
    return <Error message="Rooms Not Found" />;
  }

  const { rooms } = data;
  const hotelRoomData = rooms || [];

  const totalPages = Math.ceil(hotelRoomData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = hotelRoomData.slice(startIndex, startIndex + itemsPerPage);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRoomClick = (roomId: string) => {
    navigate(`/${role}/rooms/${roomId}`);
  };

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((room: Room) => (
          <HotelRoomCard
            key={room._id}
            image={roomImg}
            title={room.title}
            price={room.price}
            bonus={room.bonus}
            discount={room.discount}
            availability={room.availability}
            onClick={() => handleRoomClick(room._id)}
          />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HotelRoomImages;
