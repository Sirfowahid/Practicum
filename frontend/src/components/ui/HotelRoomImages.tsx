import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HotelRoomCard from "./HotelRoomCard";
import Pagination from "./Pagination";
import { useGetRoomsQuery } from "../../slices/roomsApiSlice";
import Error from "./Error";
import HotelImageCardSkeleton from "./HotelRoomCardSkeleton";

const itemsPerPage = 9;

interface Props {
  role: string;
}

interface Room {
  _id: string;
  image: string;
  title: string;
  price: number;
  bonus: string;
  discount: number;
  availability: boolean;
}

const HotelRoomImages = ({ role }: Props) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 10000]);
  const [availability, setAvailability] = useState<boolean | null>(null);
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

  // Apply filters
  const filteredRooms = hotelRoomData.filter((room: Room) => {
    const withinPriceRange =
      room.price >= priceRange[0] && room.price <= priceRange[1];
    const matchesAvailability =
      availability === null || room.availability === availability;
    return withinPriceRange && matchesAvailability;
  });

  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentItems = filteredRooms.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleRoomClick = (roomId: string) => {
    navigate(`/${role}/rooms/${roomId}`);
  };

  return (
    <div>
      {/* Filter Options */}
      <div className="flex flex-wrap justify-between items-center bg-white p-4 rounded-lg shadow-md mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 w-full">
          <div className="flex items-center w-full sm:w-auto">
            <label className="text-gray-700 font-semibold">Price Range:</label>
            <input
              type="range"
              min="0"
              max="10000"
              value={priceRange[1]}
              onChange={(e) =>
                setPriceRange([priceRange[0], Number(e.target.value)])
              }
              className="ml-4 w-full sm:w-48"
            />
            <span className="ml-4 text-gray-700">{`Up to ${priceRange[1]} Taka`}</span>
          </div>

          <div className="flex items-center w-full sm:w-auto">
            <label className="text-gray-700 font-semibold">Availability:</label>
            <select
              value={availability === null ? "" : availability ? "available" : "unavailable"}
              onChange={(e) =>
                setAvailability(
                  e.target.value === "available"
                    ? true
                    : e.target.value === "unavailable"
                    ? false
                    : null
                )
              }
              className="ml-4 border border-gray-300 rounded-md p-2 text-gray-700 bg-white w-full sm:w-48"
            >
              <option value="">All</option>
              <option value="available">Available</option>
              <option value="unavailable">Unavailable</option>
            </select>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {currentItems.map((room: Room) => (
          <HotelRoomCard
            key={room._id}
            image={room.image}
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
