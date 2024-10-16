import React, { useEffect, useState } from "react";
import {
  useGetBookingDetailsQuery,
  useUpdateBookingMutation,
} from "../../slices/bookingsApiSlice";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';
import { FaUser, FaCalendarAlt, FaInfoCircle } from "react-icons/fa"; // Importing icons

const AdminEditBooking = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { data: bookingData, isLoading, isError } = useGetBookingDetailsQuery(bookingId);
  const [updateBooking, { isLoading: isUpdating, isError: isUpdateError }] = useUpdateBookingMutation();

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
    <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="p-6 text-center">
          <h2 className="text-3xl font-bold text-gray-800">Edit Booking</h2>
        </div>
        {isUpdateError && <div className="text-red-500 mb-4 text-center">Error updating booking</div>}
        <form className="p-8 space-y-6" onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label htmlFor="numberOfGuests" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Guests
              </label>
              <div className="relative flex items-center h-12 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <span className="flex items-center justify-center w-12 h-full bg-gray-100 text-gray-500">
                  <FaUser />
                </span>
                <input
                  id="numberOfGuests"
                  name="numberOfGuests"
                  type="number"
                  min="1"
                  required
                  className="flex-1 h-full pl-3 pr-4 py-2 border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm"
                  value={formData.numberOfGuests}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-1">
                From
              </label>
              <div className="relative flex items-center h-12 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <span className="flex items-center justify-center w-12 h-full bg-gray-100 text-gray-500">
                  <FaCalendarAlt />
                </span>
                <input
                  id="from"
                  name="from"
                  type="date"
                  required
                  className="flex-1 h-full pl-3 pr-4 py-2 border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm"
                  value={formData.from}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-1">
                To
              </label>
              <div className="relative flex items-center h-12 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <span className="flex items-center justify-center w-12 h-full bg-gray-100 text-gray-500">
                  <FaCalendarAlt />
                </span>
                <input
                  id="to"
                  name="to"
                  type="date"
                  required
                  className="flex-1 h-full pl-3 pr-4 py-2 border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm"
                  value={formData.to}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="checkIn" className="block text-sm font-medium text-gray-700 mb-1">
                Check In
              </label>
              <div className="relative flex items-center h-12 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <span className="flex items-center justify-center w-12 h-full bg-gray-100 text-gray-500">
                  <FaCalendarAlt />
                </span>
                <input
                  id="checkIn"
                  name="checkIn"
                  type="date"
                  className="flex-1 h-full pl-3 pr-4 py-2 border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm"
                  value={formData.checkIn}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div>
              <label htmlFor="checkOut" className="block text-sm font-medium text-gray-700 mb-1">
                Check Out
              </label>
              <div className="relative flex items-center h-12 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
                <span className="flex items-center justify-center w-12 h-full bg-gray-100 text-gray-500">
                  <FaCalendarAlt />
                </span>
                <input
                  id="checkOut"
                  name="checkOut"
                  type="date"
                  className="flex-1 h-full pl-3 pr-4 py-2 border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm"
                  value={formData.checkOut}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
              Status
            </label>
            <div className="relative flex items-center h-12 border border-gray-300 rounded-lg overflow-hidden shadow-sm">
              <span className="flex items-center justify-center w-12 h-full bg-gray-100 text-gray-500">
                <FaInfoCircle />
              </span>
              <select
                id="status"
                name="status"
                required
                className="flex-1 h-full pl-3 pr-4 py-2 border-0 focus:ring-2 focus:ring-blue-500 placeholder-gray-500 text-gray-900 sm:text-sm"
                value={formData.status}
                onChange={handleChange}
              >
                <option value="Pending">Pending</option>
                <option value="Confirmed">Confirmed</option>
                <option value="Cancelled">Cancelled</option>
              </select>
            </div>
          </div>

          <button
            type="submit"
            disabled={isUpdating}
            className="w-full bg-blue-500 text-white rounded-md py-3 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-200"
          >
            {isUpdating ? "Updating..." : "Update Booking"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AdminEditBooking;
