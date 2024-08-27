import React, { useState, useEffect } from "react";
import hotel from "../../assets/home/hotel3.jpg";
import Hero from "../../components/ui/Hero";
import Rooms from "../../components/ui/Rooms";
import TeamMembers from "../../components/ui/TeamMembers";
import OtherServices from "../../components/ui/OtherServices";
import Social from "../../components/ui/Social";
import { useGetBookingsQuery } from "../../slices/bookingsApiSlice";
import { useGetRoomsQuery } from "../../slices/roomsApiSlice";
import { useSelector } from "react-redux";

const UserHome: React.FC = () => {
  const { userInfo } = useSelector((state: any) => state.auth);

  const {
    data: bookings,
    isLoading: isBookingsLoading,
    isError: isBookingsError,
    refetch: refetchBookings,
  } = useGetBookingsQuery();

  const {
    data: roomsData,
    isLoading: isRoomLoading,
    isError: isRoomError,
  } = useGetRoomsQuery();

  const [showModal, setShowModal] = useState(false);
  const [todayBooking, setTodayBooking] = useState<any>(null);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  useEffect(() => {
    if (bookings && userInfo) {
      const today = new Date().toISOString().split("T")[0];
      const bookingEndingToday = bookings.bookings.find((booking:any) => {
        const bookingDate = new Date(booking.to).toISOString().split("T")[0];
        return (
          booking.user === userInfo._id &&
          bookingDate === today &&
          booking.status === "Confirmed"
        );
      });
      if (bookingEndingToday) {
        setTodayBooking(bookingEndingToday);
        setShowModal(true);
      }
    }
  }, [bookings, userInfo]);

  const room = roomsData?.rooms.find((room:any) => room._id === todayBooking?.room);

  return (
    <>
      <Hero
        title="Welcome to Ascillia"
        descripton="Experience luxury and comfort in the heart of the city. Your perfect getaway awaits."
        image={hotel}
      />
      <Rooms />
      <OtherServices />
      <TeamMembers />
      <Social />
      {showModal && todayBooking && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4">Booking Notification</h2>
            <p>
              <strong>Room:</strong> {room?.title}
            </p>
            <p>
              <strong>From:</strong>{" "}
              {new Date(todayBooking.from).toLocaleDateString()}
            </p>
            <p>
              <strong>To:</strong>{" "}
              {new Date(todayBooking.to).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong> {todayBooking.status}
            </p>
            <button
              onClick={handleCloseModal}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default UserHome;
