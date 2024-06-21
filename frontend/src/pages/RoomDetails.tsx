import React from 'react';
import { useParams } from 'react-router-dom';
import hotelRoomData, { HotelRoom } from '../data/hotelRoomData';

const RoomDetails = () => {
  const { roomId } = useParams<{ roomId?: string }>();
  const parsedRoomId = roomId ? parseInt(roomId) : undefined;
  const room: HotelRoom | undefined = parsedRoomId ? hotelRoomData.find(room => room.id === parsedRoomId) : undefined;

  if (!room) {
    return <div className="flex items-center justify-center h-screen bg-gray-100">Room not found</div>;
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg overflow-hidden shadow-md">
          <div className="flex justify-center">
            <img src={room.image} alt={room.title} className="w-full" />
          </div>
          <div className="p-6">
            <h2 className="text-2xl font-semibold mb-2">Room Details for Room ID: {room.id}</h2>
            <p className="text-gray-700 mb-2">Title: {room.title}</p>
            <p className="text-gray-700 mb-2">Description: {room.description}</p>
            <p className="text-gray-700 mb-2">Price: {room.price}</p>
            {room.bonus && <p className="text-green-600 mb-2">Bonus: {room.bonus}</p>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RoomDetails;
