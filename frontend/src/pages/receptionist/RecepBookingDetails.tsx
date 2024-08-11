import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaBed, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import {
  useGetBookingDetailsQuery,
  useUpdateBookingMutation,
} from "../../slices/bookingsApiSlice";
import { useGetBillingsQuery } from "../../slices/billingsApiSlice";
import { useGetUserDetailsQuery } from "../../slices/usersApiSlice";
import { useGetRoomDetailsQuery } from "../../slices/roomsApiSlice";
import { toast } from "react-toastify";

const RecepBookingDetails = () => {
    const { bookingId } = useParams();
    const navigate = useNavigate();
  
    // Fetch booking details
    const {
      data: bookingRes,
      isLoading: isLoadingBooking,
      isError: isErrorBooking,
      refetch,
    } = useGetBookingDetailsQuery(bookingId);
  
    // State to hold user, room, and billing IDs
    const [userId, setUserId] = useState<string | null>(null);
    const [roomId, setRoomId] = useState<string | null>(null);
    const [billingId, setBillingId] = useState<string | null>(null);
  
    // Set user, room, and billing IDs from booking details
    useEffect(() => {
      if (bookingRes?.booking) {
        setUserId(bookingRes.booking.user);
        setRoomId(bookingRes.booking.room);
        setBillingId(bookingRes.booking._id);
      }
    }, [bookingRes]);
  
    // Fetch user details
    const {
      data: userRes,
      isLoading: isLoadingUser,
      isError: isErrorUser,
    } = useGetUserDetailsQuery(userId, { skip: !userId });
  
    // Fetch room details
    const {
      data: roomRes,
      isLoading: isLoadingRoom,
      isError: isErrorRoom,
    } = useGetRoomDetailsQuery(roomId, { skip: !roomId });
  
    // Fetch billing details
    const {
      data: billingRes,
      isLoading: isLoadingBilling,
      isError: isErrorBilling,
    } = useGetBillingsQuery();
  
    // Find the billing entry for the current booking
    const billings = billingRes?.billings || [];
    const billing = billings.find((bill: any) => bill.booking === bookingId);
  
    // Update booking mutation
    const [updateBooking] = useUpdateBookingMutation();
  
    // Handle errors and redirect on error
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
  
    // Handle Accept Booking
    const handleAccept = async () => {
      try {
        if (bookingRes?.booking.status === "Pending") {
          await updateBooking({ _id: bookingId, status: "Confirmed",checkIn:null, checkOut:null });
          toast.success("Booking accepted successfully");
          refetch(); // Refetch data to reflect changes
        } else {
          toast.info(`Booking is already ${bookingRes.booking.status}`);
        }
      } catch (error) {
        toast.error("Failed to accept booking");
      }
    };
  
    // Handle Cancel Booking
    const handleCancel = async () => {
      try {
        if (bookingRes?.booking.status === "Pending") {
          await updateBooking({ _id: bookingId, status: "Cancelled",checkIn:null, checkOut:null });
          toast.success("Booking cancelled");
          refetch(); // Refetch data to reflect changes
        } else {
          toast.info(`Booking is already ${bookingRes.booking.status}`);
        }
      } catch (error) {
        toast.error("Failed to cancel booking");
      }
    };
  
    // Show loading message if data is being fetched
    if (isLoadingBooking || isLoadingUser || isLoadingRoom || isLoadingBilling) {
      return <p className="text-center mt-10">Loading...</p>;
    }
  
    // Check if the booking is not modifiable
    const isBookingNotModifiable =
      bookingRes?.booking.status !== "Pending";
  
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
                <strong>Room:</strong> {roomRes ? roomRes.room.title : "N/A"}
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
                <strong>Name:</strong> {userRes ? userRes.user.name : "N/A"}
              </p>
              <p>
                <strong>Email:</strong> {userRes ? userRes.user.email : "N/A"}
              </p>
              <p>
                <strong>Address:</strong> {userRes ? userRes.user.address : "N/A"}
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
                <strong>Amount:</strong> {billing ? billing.amount : "N/A"} Taka
              </p>
              <p>
                <strong>Payment Method:</strong>{" "}
                {billing ? billing.paymentMethod : "N/A"}
              </p>
              <p>
                <strong>Payment With:</strong>{" "}
                {billing ? billing.mobileNo : "N/A"}
              </p>
              <p>
                <strong>Transaction ID:</strong>{" "}
                {billing ? billing.transactionId : "N/A"}
              </p>
            </div>
          </div>
  
          <div className="mt-8 text-center">
            <button
              onClick={handleAccept}
              className={`bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mr-4 ${
                isBookingNotModifiable ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isBookingNotModifiable}
            >
              Accept Booking
            </button>
            <button
              onClick={handleCancel}
              className={`bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 ${
                isBookingNotModifiable ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={isBookingNotModifiable}
            >
              Cancel Booking
            </button>
          </div>
        </div>
      </div>
    );
  };
  
export default RecepBookingDetails