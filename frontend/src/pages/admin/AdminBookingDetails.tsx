import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaBed, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { useGetBookingDetailsQuery } from "../../slices/bookingsApiSlice";
import { useGetBillingDetailsQuery } from "../../slices/billingsApiSlice";
import { useGetUserDetailsQuery } from "../../slices/usersApiSlice";
import { useGetRoomDetailsQuery } from "../../slices/roomsApiSlice";
import { toast } from "react-toastify";

const AdminBookingDetails = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();

  const {
    data: bookingRes,
    isLoading: isLoadingBooking,
    isError: isErrorBooking,
  } = useGetBookingDetailsQuery(bookingId);
  const [userId, setUserId] = useState<string | null>(null);
  const [roomId, setRoomId] = useState<string | null>(null);
  const [billingId, setBillingId] = useState<string | null>(null);

  useEffect(() => {
    if (bookingRes?.booking) {
      setUserId(bookingRes.booking.user);
      setRoomId(bookingRes.booking.room);
      setBillingId(bookingRes.booking._id); // Assuming billing is linked via booking ID
    }
  }, [bookingRes]);

  const {
    data: userRes,
    isLoading: isLoadingUser,
    isError: isErrorUser,
  } = useGetUserDetailsQuery(userId, { skip: !userId });
  console.log(userRes)
  const {
    data: roomRes,
    isLoading: isLoadingRoom,
    isError: isErrorRoom,
  } = useGetRoomDetailsQuery(roomId, { skip: !roomId });
  const {
    data: billingRes,
    isLoading: isLoadingBilling,
    isError: isErrorBilling,
  } = useGetBillingDetailsQuery(billingId, { skip: !billingId });

  useEffect(() => {
    if (isErrorBooking) {
      toast.error("Failed to load booking details.");
      navigate("/admin/bookings");
    }
    if (isErrorUser) {
      toast.error("Failed to load user details.");
    }
    if (isErrorRoom) {
      toast.error("Failed to load room details.");
    }
    if (isErrorBilling) {
      toast.error("Failed to load billing details.");
    }
  }, [isErrorBooking, isErrorUser, isErrorRoom, isErrorBilling, navigate]);

  if (isLoadingBooking || isLoadingUser || isLoadingRoom || isLoadingBilling) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Booking Details</h1>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaBed className="mr-2 text-blue-500" /> Room Information
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Room:</strong> {roomRes ? roomRes.title : "N/A"}
            </p>
            <p className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />{" "}
              <strong>Check-in:</strong>{" "}
              {new Date(bookingRes?.booking.checkIn).toLocaleDateString()}
            </p>
            <p className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />{" "}
              <strong>Check-out:</strong>{" "}
              {new Date(bookingRes?.booking.checkOut).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaUser className="mr-2 text-green-500" /> Guest Information
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong> {userRes ? userRes.name : "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {userRes ? userRes.email : "N/A"}
            </p>
            <p>
              <strong>Phone:</strong> {userRes ? userRes.phone : "N/A"}
            </p>
            <p>
              <strong>Address:</strong> {userRes ? userRes.address : "N/A"}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaMoneyBillWave className="mr-2 text-red-500" /> Billing
            Information
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Amount:</strong> ${billingRes ? billingRes.amount : "N/A"}
            </p>
            <p>
              <strong>Payment Method:</strong>{" "}
              {billingRes ? billingRes.paymentMethod : "N/A"}
            </p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={() => toast.success("Booking accepted successfully")}
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mr-4"
          >
            Accept Booking
          </button>
          <button
            onClick={() => toast.error("Booking cancelled")}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600"
          >
            Cancel Booking
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetails;
