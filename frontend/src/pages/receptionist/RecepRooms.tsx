import React from "react";
import FilterOptions from "../../components/ui/FilterOptions";
import HotelRoomImages from "../../components/ui/HotelRoomImages";
import { useNavigate } from "react-router-dom";
const RecepRooms = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <div className="flex items-center justify-end flex-grow w-full max-w-6xl">
        <button
          onClick={() => navigate("/receotion/addroom")}
          className="px-3 py-2 mx-1 bg-blue-500 rounded text-medium font-bold text-white text-xl"
        >
          Add Room
        </button>
      </div>
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-6xl mt-6">
        <HotelRoomImages role="reception" />
      </div>
    </div>
    </div>
  )
}

export default RecepRooms