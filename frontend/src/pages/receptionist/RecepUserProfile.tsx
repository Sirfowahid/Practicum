import React from "react";
import Mehedi from "../../assets/home/mehedi.png";
import { useGetUserDetailsQuery } from "../../slices/usersApiSlice";
import { useGetBookingsQuery } from "../../slices/bookingsApiSlice";
import { useParams } from "react-router-dom";

const RecepUserProfile = () => {
    const { userId } = useParams();
    const { data: currentUser, isLoading, isError } = useGetUserDetailsQuery(userId);
    const { data: bookings, isLoading: loadingBooking, isError: errorBooking } = useGetBookingsQuery();
  
    // Filter bookings for the specific user
    const usersBookings = bookings?.bookings.filter((b) => b.user === userId) || [];
  
    const getStatusBadge = (status) => {
      switch (status) {
        case "Cancelled":
          return (
            <span className="text-white bg-red-500 px-2 py-1 rounded">
              Cancelled
            </span>
          );
        case "Pending":
          return (
            <span className="text-white bg-yellow-500 px-2 py-1 rounded">
              Pending
            </span>
          );
        case "Confirmed":
          return (
            <span className="text-white bg-green-500 px-2 py-1 rounded">
              Confirmed
            </span>
          );
        default:
          return null;
      }
    };
  
    if (isLoading || loadingBooking) return <p>Loading...</p>;
    if (isError || errorBooking) return <p>Something went wrong!</p>;
  
    return (
      <div className="min-h-screen bg-gray-100 p-4 md:p-8">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded shadow-md">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/4 mb-4 md:mb-0">
              <img
                src={`http://localhost:5000${currentUser.user.image}`}
                alt="User Avatar"
                className="rounded-full h-32 w-32 md:h-40 md:w-40 mx-auto"
              />
            </div>
            <div className="md:w-3/4 text-center md:text-left md:pl-8">
              <h1 className="text-2xl md:text-3xl font-bold text-slate-700 mb-2">
                {currentUser.user.name}
              </h1>
              <div className="text-gray-600 space-y-2">
                <p>
                  <span className="font-bold">Email:</span> {currentUser.user.email}
                </p>
                <p>
                  <span className="font-bold">Phone:</span> {currentUser.user.mobileNo}
                </p>
                <p>
                  <span className="font-bold">Address:</span> {currentUser.user.address}
                </p>
                <p>
                  <span className="font-bold">NID:</span> {currentUser.user.nid}
                </p>
              </div>
            </div>
          </div>
          <div className="mt-8">
            <h3 className="text-xl font-medium border-b-2 border-gray-200 pb-2 mb-4 text-slate-600">
              Booking History
            </h3>
            <div className="space-y-4">
              {usersBookings.length > 0 ? (
                usersBookings.map((booking) => (
                  <div
                    key={booking._id}
                    className="border border-gray-300 rounded-md p-4 bg-gray-50"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-lg font-semibold">{booking.room}</div>
                      {getStatusBadge(booking.status)}
                    </div>
                    <div className="text-gray-600">
                      <p>Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                      <p>Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                      <p>Amount: ${booking.amount}</p>
                      <p>Guests: {booking.numberOfGuests}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600">
                  No booking history available
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  };
  

export default RecepUserProfile