import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUser, FaBed, FaMoneyBillWave } from "react-icons/fa";
import { useNavigate, useParams,Link } from "react-router-dom";
import {
  useGetBookingDetailsQuery,
  useUpdateBookingMutation,
} from "../../slices/bookingsApiSlice";
import { useGetBillingsQuery } from "../../slices/billingsApiSlice";
import { useGetUserDetailsQuery } from "../../slices/usersApiSlice";
import { useGetRoomDetailsQuery,useUpdateRoomMutation } from "../../slices/roomsApiSlice";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";

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

  // Update booking and room mutation
  const [updateBooking] = useUpdateBookingMutation();
  const [updateRoom] = useUpdateRoomMutation();

  // Automatically update room availability based on booking status and dates
  useEffect(() => {
    const updateRoomAvailability = async () => {
      if (bookingRes?.booking && roomRes?.room) {
        const room = roomRes.room;
        const now = new Date();
        const bookingFrom = new Date(bookingRes.booking.from);
        const bookingTo = new Date(bookingRes.booking.to);
        const isCurrentlyBooked =
          bookingFrom <= now && now <= bookingTo;

        // Only update availability if booking status is Confirmed
        if (bookingRes.booking.status === "Confirmed") {
          if (isCurrentlyBooked) {
            await updateRoom({
              _id: room._id,
              availability: false,
            });
          } else {
            // Check if there are any other bookings overlapping
            const overlappingBookings = room.bookings.filter((b: any) =>
              (new Date(b.from) <= now && now <= new Date(b.to))
            );

            // If no overlapping bookings, mark room as available
            if (overlappingBookings.length === 0) {
              await updateRoom({
                _id: room._id,
                availability: true,
              });
            }
          }
        }
      }
    };

    updateRoomAvailability();
  }, [bookingRes, roomRes, updateRoom]);

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

  const handleAccept = async () => {
    try {
      if (bookingRes?.booking.status === "Pending") {
        await updateBooking({
          _id: bookingId,
          status: "Confirmed",
          checkIn: null,
          checkOut: null,
        });

        // Send email confirmation
        sendConfirmationEmail();

        toast.success("Booking accepted successfully");
        refetch();
      } else {
        toast.info(`Booking is already ${bookingRes.booking.status}`);
      }
    } catch (error) {
      toast.error("Failed to accept booking");
    }
  };

  // Function to send confirmation email
  const sendConfirmationEmail = () => {
    const templateParams = {
      user_name: userRes?.user.name, // User's name
      user_email: userRes?.user.email, // User's email
      booking_id: bookingId, // Booking ID
      booking_status: "Confirmed", // New status
      check_in: bookingRes?.booking.from, // Check-in date
      check_out: bookingRes?.booking.to, // Check-out date
    };

    emailjs
      .send(
        "service_newm3cw", // Replace with your EmailJS service ID
        "template_bwkq2jn", // Replace with your EmailJS template ID
        templateParams,
        "9gsjIajCJdJkPLsD_" // Replace with your EmailJS public key
      )
      .then(
        (response) => {
          console.log(
            "Email sent successfully!",
            response.status,
            response.text
          );
        },
        (error) => {
          console.error("Failed to send email", error);
        }
      );
  };

  // Handle Cancel Booking
  const handleCancel = async () => {
    try {
      if (bookingRes?.booking.status === "Pending") {
        await updateBooking({
          _id: bookingId,
          status: "Cancelled",
          checkIn: null,
          checkOut: null,
        });

        // Send cancellation email
        sendCancellationEmail();

        toast.success("Booking cancelled");
        refetch(); // Refetch data to reflect changes
      } else {
        toast.info(`Booking is already ${bookingRes.booking.status}`);
      }
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

  // Function to send cancellation email
  const sendCancellationEmail = () => {
    const templateParams = {
      user_name: userRes?.user.name, // User's name
      user_email: userRes?.user.email, // User's email
      booking_id: bookingId, // Booking ID // User's email
      booking_status: "Cancelled", // New status
    };

    emailjs
      .send(
        "service_newm3cw", 
        "template_j5i28vs", 
        templateParams,
        "9gsjIajCJdJkPLsD_"
      )
      .then(
        (response) => {
          console.log(
            "Cancellation email sent successfully!",
            response.status,
            response.text
          );
        },
        (error) => {
          console.error("Failed to send cancellation email", error);
        }
      );
  };

  // Show loading message if data is being fetched
  if (isLoadingBooking || isLoadingUser || isLoadingRoom || isLoadingBilling) {
    return <p className="text-center mt-10">Loading...</p>;
  }

  // Check if the booking is not modifiable
  const isBookingNotModifiable = bookingRes?.booking.status !== "Pending";

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
              <strong>Room:</strong>
              <Link to={`/reception/rooms/${roomRes?.room?._id}`} className="hover:text-blue-500">
               {roomRes ? roomRes.room.title : "N/A"}</Link>
            </p>
            <p className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />{" "}
              <strong>From:</strong>{" "}
              {new Date(bookingRes?.booking.from).toLocaleDateString()}
            </p>
            <p className="flex items-center">
              <FaCalendarAlt className="mr-2 text-gray-500" />{" "}
              <strong>To:</strong>{" "}
              {new Date(bookingRes?.booking.to).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaUser className="mr-2 text-green-500" /> Guest Information
          </h2>
          <div className="space-y-2">
            <p>
              <strong>Name:</strong>
              <Link to={`/reception/users/userprofile/${userRes?.user?._id}`} className="hover:text-blue-500"> 
               {userRes ? userRes.user.name : "N/A"}</Link>
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
              <strong>Phone:</strong>{" "}
              {billing ? billing.mobileNo : "N/A"}
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