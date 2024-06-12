import React from 'react';
import { useParams } from 'react-router-dom';

const RoomDetails = () => {
  const { roomId } = useParams<{ roomId: string }>();

  return (
    <div>
      <h2>Room Details for Room ID: {roomId}</h2>
      {/* Render other room details here */}
    </div>
  );
};

export default RoomDetails;
