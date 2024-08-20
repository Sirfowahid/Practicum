import React from "react";
import HotelRoomImages from "../../components/ui/HotelRoomImages";

const UserRooms = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-6xl mt-6">
          <HotelRoomImages role="user" />
        </div>
      </div>
    </div>
  );
};

export default UserRooms;
