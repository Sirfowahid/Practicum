import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useGetRoomDetailsQuery } from "../../slices/roomsApiSlice";
import LoadingSpinner from "../../components/ui/Loading";
import ErrorDisplay from "../../components/ui/Error";
import roomImg from "../../assets/home/room1.jpg";
import {
  FaCheckCircle,
  FaTimesCircle,
  FaWifi,
  FaBed,
  FaRulerCombined,
  FaDog,
  FaSmokingBan,
  FaSmoking,
} from "react-icons/fa";
import { useGetBookingsQuery } from "../../slices/bookingsApiSlice"; // Assuming you have this slice for fetching bookings

const AdminRoomDetails = () => {
  const { roomId } = useParams<{ roomId?: string }>();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false); // State to toggle modal

  if (!roomId) {
    return <ErrorDisplay message="Room ID not provided" />;
  }

  const { data, isLoading, error, refetch } = useGetRoomDetailsQuery(roomId);
  const {
    data: bookingsData,
    isLoading: bookingsLoading,
    error: bookingsError,
  } = useGetBookingsQuery(); // Fetch all bookings data

  useEffect(() => {
    if (roomId) {
      refetch();
    }
  }, [roomId, refetch]);

  if (isLoading || bookingsLoading) {
    return <LoadingSpinner />;
  }

  if (error || !data) {
    return <ErrorDisplay message="Room not found" />;
  }

  if (bookingsError) {
    return <ErrorDisplay message="Error fetching bookings" />;
  }

  // Ensure bookingsData is available before accessing it
  const roomBookings = bookingsData && bookingsData.bookings
    ? bookingsData.bookings
        .filter(
          (booking) => booking.room === roomId && booking.status === "Confirmed"
        )
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, 4) // Take the last 4 confirmed bookings
    : []; // Default to an empty array if bookingsData is undefined

  const room = data.room;
  const fullImageUrl = room.image
    ? `http://localhost:5000${room.image}`
    : roomImg;
  const discountedPrice = room.discount
    ? room.price - (room.price * room.discount) / 100
    : room.price;

  return (
    <div className="bg-gray-100 min-h-screen mx-4 relative">
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        onClick={() => setShowModal(!showModal)}
      >
        {showModal ? "Hide Bookings" : "Show Bookings"}
      </button>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
              Recent Bookings
            </h2>
            {roomBookings.length > 0 ? (
              roomBookings.map((booking, index) => {
                const from = new Date(booking.from);
                const to = new Date(booking.to);
                const durationDays = Math.ceil(
                  (to.getTime() - from.getTime()) / (1000 * 60 * 60 * 24)
                );

                return (
                  <div
                    key={booking._id}
                    className="flex justify-between items-center border border-gray-200 rounded-lg p-4 mb-4 shadow-sm"
                  >
                    <div className="flex flex-col">
                      <span className="text-sm text-gray-500">
                        Booking #{index + 1}
                      </span>
                      <span className="text-gray-800 font-medium">
                        {from.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}{" "}
                        -{" "}
                        {to.toLocaleDateString("en-GB", {
                          day: "numeric",
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    <span className="text-sm text-gray-600 bg-blue-100 px-3 py-1 rounded-full">
                      Duration: {durationDays}{" "}
                      {durationDays === 1 ? "day" : "days"}
                    </span>
                  </div>
                );
              })
            ) : (
              <p className="text-center text-gray-500">
                No recent bookings available.
              </p>
            )}
            <button
              className="mt-4 bg-red-500 text-white w-full py-2 rounded-lg hover:bg-red-600 transition duration-300"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="container mx-auto py-8">
        <div className="max-w-full mx-auto bg-white overflow-hidden">
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2">
              <img
                src={fullImageUrl}
                alt={room.title}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 md:w-1/2 flex flex-col justify-between">
              <div>
                <p className="text-gray-700 text-6xl mb-8">
                  <strong>{room.title}</strong>
                </p>
                <p className="text-gray-700 mb-2">
                  <strong>Room Details:</strong> {room.description}
                </p>
                <p className="text-gray-700 text-4xl mb-2">
                  <strong>Price:</strong>{" "}
                  {room.discount ? (
                    <>
                      <span className="line-through mr-2">
                        {room.price} Taka
                      </span>
                      <span>{discountedPrice} Taka</span>
                    </>
                  ) : (
                    room.price
                  )}
                </p>
                {room.bonus && (
                  <p className="text-green-600 mb-2 font-medium text-xl">
                    <strong>Bonus:</strong> {room.bonus}
                  </p>
                )}
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <span className="text-gray-700 mr-2">
                    <strong>Availability:</strong>
                  </span>
                  {room.availability ? (
                    <span className="text-green-500 flex items-center">
                      <FaCheckCircle className="mr-1" /> Available
                    </span>
                  ) : (
                    <span className="text-red-500 flex items-center">
                      <FaTimesCircle className="mr-1" /> Unavailable
                    </span>
                  )}
                </div>

                <div className="flex items-center mb-2">
                  <FaWifi className="text-gray-700 mr-2" />
                  <span className="text-gray-700">
                    {room.wifi ? "Free Wi-Fi" : "No Wi-Fi"}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <FaBed className="text-gray-700 mr-2" />
                  <span className="text-gray-700">
                    <strong>Bed Type:</strong> {room.bedType}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  <FaRulerCombined className="text-gray-700 mr-2" />
                  <span className="text-gray-700">
                    <strong>Room Size:</strong> {room.size}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  {room.petsAllowed ? (
                    <FaDog className="text-gray-700 mr-2" />
                  ) : (
                    <FaDog className="text-gray-400 mr-2" />
                  )}
                  <span className="text-gray-700">
                    {room.petsAllowed ? "Pets Allowed" : "No Pets Allowed"}
                  </span>
                </div>

                <div className="flex items-center mb-2">
                  {room.smokingPolicy ? (
                    <FaSmoking className="text-gray-700 mr-2" />
                  ) : (
                    <FaSmokingBan className="text-gray-700 mr-2" />
                  )}
                  <span className="text-gray-700">
                    <strong>Smoking:</strong>{" "}
                    {room.smokingPolicy ? "Allowed" : "Not Allowed"}
                  </span>
                </div>

                <div className="text-gray-700 mb-2">
                  <strong>Cancellation Policy:</strong> Guests can cancel their
                  booking within {room.cancellationPolicy} hours of making the
                  reservation to receive an 80% refund.
                </div>
                <button
                  className="btn btn-primary bg-red-500 text-white px-4 py-2 font-medium text-2xl hover:bg-red-700 transition-colors rounded my-4"
                  type="submit"
                  onClick={() => navigate(`/admin/updateroom/${roomId}`)}
                >
                  Update Room
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminRoomDetails;
