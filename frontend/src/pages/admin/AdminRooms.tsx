import React, { useEffect } from "react";
import HotelRoomImages from "../../components/ui/HotelRoomImages";
import { useNavigate } from "react-router-dom";
import { useGetBookingsQuery } from "../../slices/bookingsApiSlice";
import { useUpdateRoomMutation } from "../../slices/roomsApiSlice";
import { toast } from "react-toastify";

const AdminRooms = () => {
  const navigate = useNavigate();

  // Fetch all bookings
  const { data: bookingsRes, isLoading: isLoadingBookings } = useGetBookingsQuery();

  // Update room mutation
  const [updateRoom] = useUpdateRoomMutation();

  useEffect(() => {
    const updateRoomAvailability = async () => {
      if (bookingsRes?.bookings) {
        const now = new Date();
    
        // Loop through all bookings
        for (const booking of bookingsRes.bookings) {
          const bookingFrom = new Date(booking.from);
          const bookingTo = new Date(booking.to);
          const isCurrentlyBooked = bookingFrom <= now && now <= bookingTo;
    
          // Only update room availability if booking status is Confirmed
          if (booking.status === "Confirmed") {
            // Check if booking has a checkOut date
            const roomAvailable = booking.checkOut ? true : !isCurrentlyBooked;
    
            await updateRoom({
              _id: booking.room,
              availability: roomAvailable,
            });
          }
        }
      }
    };
    

    updateRoomAvailability().catch((error) =>
      toast.error("Failed to update room availability")
    );
  }, [bookingsRes, updateRoom]);

  if (isLoadingBookings) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="flex flex-col items-center min-h-screen p-4 bg-gray-50">
      <div className="flex items-center justify-end flex-grow w-full max-w-6xl">
        <button
          onClick={() => navigate("/admin/addroom")}
          className="px-3 py-2 mx-1 bg-blue-500 rounded text-medium font-bold text-white text-xl"
        >
          Add Room
        </button>
      </div>
      <div className="w-full max-w-6xl mt-6">
        <HotelRoomImages role="admin" />
      </div>
    </div>
  );
};

export default AdminRooms;
