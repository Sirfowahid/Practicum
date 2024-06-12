import React from 'react'
import hotelRoomData from '../../data/hotelRoomData'
import HotelRoomCard from './HotelRoomCard'
import room from '../../assets/home/room1.jpg'
const HotelRoomImages = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {hotelRoomData.map((room, index) => (
        <HotelRoomCard
          key={index}
          image={room.image}
          title={room.title}
          description={room.description}
          price={room.price}
          bonus={room.bonus}
        />
      ))}
    </div>
  )
}

export default HotelRoomImages