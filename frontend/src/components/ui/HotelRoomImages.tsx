import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import HotelRoomCard from "./HotelRoomCard";
import Pagination from "./Pagination";
import axios from "axios";

const itemsPerPage = 9;

interface Props {
  role: string;
}

interface Room {
  id: number;
  image: string;
  title: string;
  price: string;
  bonus: string;
  discount: number;
  availability: boolean;
}

const HotelRoomImages = ({ role }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [hotelRoomData, setHotelRoomData] = useState<Room[]>([]);
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

  const fetchHotelRoomData = async () => {
    try {
      const { data } = await axios.get<Room[]>("http://localhost:5000/rooms");
      setHotelRoomData(data);
    } catch (error) {
      console.error("Error fetching room data:", error);
    }
  };

  useEffect(() => {
    fetchHotelRoomData();
  }, []);

  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((room) => (
          <HotelRoomCard
            key={room.id}
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
};

export default HotelRoomImages;
