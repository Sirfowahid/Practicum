import React from "react";
import HotelRoomImages from "../../components/ui/HotelRoomImages";
import SearchBarDate from "../../components/ui/SearchBarDate";

const UserRooms = () => {
  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
        <div className="w-full max-w-6xl mt-6">
          <SearchBarDate onSearch={()=>console.log("Search by date.")}/>
          <HotelRoomImages role="user" />
        </div>
      </div>
    </div>
  );
};

export default UserRooms;
