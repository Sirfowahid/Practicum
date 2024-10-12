import React from "react";
import { useParams } from "react-router-dom";
import { useGetUserDetailsQuery } from "../../slices/usersApiSlice";
import {
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "../../slices/bookingsApiSlice";
import { useGetRoomDetailsQuery } from "../../slices/roomsApiSlice";
import { toast } from "react-toastify";
import jsPDF from "jspdf";

const BookingItem = ({ booking, refetchBookings }) => {
  const { data: roomDetails } = useGetRoomDetailsQuery(booking.room);
  const [timeLeft, setTimeLeft] = React.useState(null);
  const [isCancelled, setIsCancelled] = React.useState(
    booking.status === "Cancelled"
  );
  const [updateBooking] = useUpdateBookingMutation();

  React.useEffect(() => {
    if (roomDetails && booking.checkIn != null && booking.status !== "Cancelled") {
      const cancellationDeadline = new Date(
        new Date(booking.createdAt).getTime() +
          roomDetails.room.cancellationPolicy * 60 * 60 * 1000
      );

      const updateTimer = () => {
        const timeDifference = cancellationDeadline - new Date();
        if (timeDifference > 0) {
          setTimeLeft({
            hours: Math.floor((timeDifference / (1000 * 60 * 60)) % 24),
            minutes: Math.floor((timeDifference / (1000 * 60)) % 60),
            seconds: Math.floor((timeDifference / 1000) % 60),
          });
        } else {
          setTimeLeft(null); // Time's up, stop showing the timer
        }
      };

      const timerInterval = setInterval(updateTimer, 1000);
      updateTimer(); // Initialize immediately

      return () => clearInterval(timerInterval); // Cleanup on unmount
    }
  }, [roomDetails, booking.createdAt, booking.status]);
  
  const handleDownloadReceipt = () => {
    const doc = new jsPDF();
  
    // Set up styles and layout
    doc.setFont("helvetica", "bold");
    doc.setFontSize(20);
    doc.text("Hotel Booking Receipt", 105, 20, { align: "center" });
  
    // Draw a line under the header
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
  
    // Add booking details with improved styling
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Receipt ID: ${booking._id || "N/A"}`, 20, 35);
    doc.text(`Room: ${roomDetails?.room?.title || "N/A"}`, 20, 45);
    doc.text(`From: ${new Date(booking.from).toLocaleDateString()}`, 20, 55);
    doc.text(`To: ${new Date(booking.to).toLocaleDateString()}`, 20, 65);
    doc.text(`Status: ${booking.status}`, 20, 75);
  
    // Add booking details section with a border box
    doc.setDrawColor(0, 0, 0);
    doc.setLineWidth(0.3);
    doc.rect(15, 30, 180, 60); // x, y, width, height
  
    // Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text(
      "Thank you for choosing our services. We look forward to your stay!",
      105,
      140,
      { align: "center" }
    );
  
    // Draw footer line
    doc.setLineWidth(0.5);
    doc.line(20, 145, 190, 145);
  
    // Contact info
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text("Hotel Contact: 0123456789 | Email: support@hotel.com", 105, 150, {
      align: "center",
    });
  
    // Save the PDF with a dynamic name based on the booking ID
    doc.save(`Booking_Receipt_${booking._id}.pdf`);
  };
  
  const handleCancel = async () => {
    const cancellationDeadline = new Date(
      new Date(booking.createdAt).getTime() +
        roomDetails.room.cancellationPolicy * 60 * 60 * 1000
    );
    const canCancel = new Date() < cancellationDeadline;

    try {
      if (canCancel) {
        const { data: bookingRes } = await updateBooking({
          _id: booking._id,
          status: "Cancelled",
          checkIn: null,
          checkOut: null,
        });

        if (bookingRes?.booking.status === "Cancelled") {
          toast.success("Booking cancelled successfully");
          setIsCancelled(true); // Update the state to remove the button
          refetchBookings(); // Refetch data to reflect changes
        } else {
          toast.info(`Booking is already ${bookingRes.booking.status}`);
        }
      } else {
        toast.error("Cancellation period has expired!");
      }
    } catch (error) {
      toast.error("Failed to cancel booking");
    }
  };

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

  return (
    <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
      <div className="flex justify-between items-center mb-2">
        <div className="text-lg font-semibold">
          {roomDetails?.room?.title || "Loading..."}
        </div>
        {getStatusBadge(booking.status)}
      </div>
      <div className="text-gray-600">
        <p>From: {new Date(booking.from).toLocaleDateString()}</p>
        <p>To: {new Date(booking.to).toLocaleDateString()}</p>
      </div>
      {
        <div className="mt-2 flex items-center">
          <button
            onClick={handleCancel}
            className="bg-red-500 text-white px-3 py-1 rounded mr-4"
          >
            Cancel Booking
          </button>
          <button
            onClick={handleDownloadReceipt}
            className="bg-blue-500 text-white px-3 py-1 rounded"
          >
            Download Receipt
          </button>

          {/* {timeLeft && (
            <span className="text-gray-600">
              Time left: {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
            </span>
          )} */}
        </div>
      }
    </div>
  );
};

const UserProfile = () => {
  const { userId } = useParams();

  const {
    data: currentUser,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUserDetailsQuery(userId);

  const {
    data: bookings,
    isLoading: isBookingsLoading,
    isError: isBookingsError,
    refetch: refetchBookings,
  } = useGetBookingsQuery();

  const bookingHistory =
    bookings?.bookings
      .filter((booking) => booking.user === userId)
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)) || [];

  if (isUserLoading || isBookingsLoading) return <p>Loading...</p>;
  if (isUserError || isBookingsError) return <p>Something went wrong!</p>;

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white p-6 md:p-8 rounded shadow-md">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/4 mb-4 md:mb-0">
            <img
              src={`http://localhost:5000${currentUser?.user?.image}`}
              alt="User Avatar"
              className="rounded-full h-32 w-32 md:h-40 md:w-40 mx-auto"
            />
          </div>
          <div className="md:w-3/4 text-center md:text-left md:pl-8">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-700 mb-2">
              {currentUser?.user?.name}
            </h1>
            <div className="text-gray-600 space-y-2">
              <p>
                <span className="font-bold">Email:</span>{" "}
                {currentUser?.user?.email}
              </p>
              <p>
                <span className="font-bold">Phone:</span>{" "}
                {currentUser?.user?.mobileNo}
              </p>
              <p>
                <span className="font-bold">Address:</span>{" "}
                {currentUser?.user?.address}
              </p>
              <p>
                <span className="font-bold">Joined:</span>{" "}
                {new Date(currentUser?.user?.createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-xl font-medium border-b-2 border-gray-200 pb-2 mb-4 text-slate-600">
            Booking History
          </h3>
          <div className="space-y-4">
            {bookingHistory.map((booking) => (
              <BookingItem
                key={booking._id}
                booking={booking}
                refetchBookings={refetchBookings}
              />
            ))}
            {bookingHistory.length === 0 && (
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

export default UserProfile;
