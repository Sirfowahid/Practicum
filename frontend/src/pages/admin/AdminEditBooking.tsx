import React, { useEffect, useState } from "react";
import {
  useGetBookingDetailsQuery,
  useUpdateBookingMutation,
} from "../../slices/bookingsApiSlice";
import { useParams,useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const AdminEditBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { data: bookingData, isLoading, isError } = useGetBookingDetailsQuery(bookingId);
  const [updateBooking, { isLoading: isUpdating, isError: isUpdateError }] = useUpdateBookingMutation();

  // Safely access bookingData.booking
  const booking = bookingData?.booking;

  const [formData, setFormData] = useState({
    numberOfGuests: 1,
    from: "",
    to: "",
    status: "Pending",
    checkIn: "",
    checkOut: "",
  });

  useEffect(() => {
    if (booking) {
      setFormData({
        numberOfGuests: booking.numberOfGuests || 1,
        from: booking.from ? new Date(booking.from).toISOString().slice(0, 10) : "",
        to: booking.to ? new Date(booking.to).toISOString().slice(0, 10) : "",
        status: booking.status || "Pending",
        checkIn: booking.checkIn ? new Date(booking.checkIn).toISOString().slice(0, 10) : "",
        checkOut: booking.checkOut ? new Date(booking.checkOut).toISOString().slice(0, 10) : "",
      });
    }
  }, [booking]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      from: formData.from ? new Date(formData.from).toISOString() : null,
      to: formData.to ? new Date(formData.to).toISOString() : null,
      checkIn: formData.checkIn ? new Date(formData.checkIn).toISOString() : null,
      checkOut: formData.checkOut ? new Date(formData.checkOut).toISOString() : null,
    };

    try {
      await updateBooking({ _id: bookingId, ...payload }).unwrap();
      toast.success("Booking updated successfully!");
      navigate("/admin/bookings")
    } catch (error) {
      console.error("Error updating booking:", error);
      if (error.data) {
        console.error("Error data:", error.data);
      }
      toast.error("Failed to update the booking.");
    }
  };

  if (isLoading) {
    return <div className="text-center mt-4">Loading...</div>;
  }

  if (isError) {
    return <div className="text-center mt-4">Error fetching booking details</div>;
  }

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Edit Booking {bookingId}</h2>
      {isUpdateError && <div className="text-red-500 mb-4">Error updating booking</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Number of Guests:</label>
          <input
            type="number"
            name="numberOfGuests"
            value={formData.numberOfGuests || ""}
            onChange={handleChange}
            min="1"
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">From:</label>
          <input
            type="date"
            name="from"
            value={formData.from || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">To:</label>
          <input
            type="date"
            name="to"
            value={formData.to || ""}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Check In:</label>
          <input
            type="date"
            name="checkIn"
            value={formData.checkIn || ""}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Check Out:</label>
          <input
            type="date"
            name="checkOut"
            value={formData.checkOut || ""}
            onChange={handleChange}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring focus:ring-blue-200"
          >
            <option value="Pending">Pending</option>
            <option value="Confirmed">Confirmed</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        <button
          type="submit"
          disabled={isUpdating}
          className="w-full bg-blue-500 text-white rounded-md py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-200"
        >
          {isUpdating ? "Updating..." : "Update Booking"}
        </button>
      </form>
    </div>
  );
};

export default AdminEditBooking;
