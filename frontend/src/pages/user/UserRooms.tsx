import React from 'react';
import SearchBarDate from '../../components/ui/SearchBarDate';
import FilterOptions from '../../components/ui/FilterOptions';
import HotelRoomImages from '../../components/ui/HotelRoomImages';

const UserRooms = () => {
  const handleSearch = (fromDate: string, toDate: string) => {
    console.log(fromDate, toDate);
  };
  
  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <div className="w-full max-w-6xl mt-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 w-full">
          <div className="md:col-span-1">
            <FilterOptions />
          </div>
          <div className="md:col-span-3">
            <HotelRoomImages role='user'/>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserRooms;
