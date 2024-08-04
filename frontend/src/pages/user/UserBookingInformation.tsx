import React, { useState } from "react";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAddBookingMutation } from "../../slices/bookingsApiSlice";

interface BookingData {
  user: string;
  room: string;
  numberOfGuests: number;
  checkIn: string;
  checkOut: string;
  status: string;
}

const UserBookingInformation: React.FC = () => {
  const { roomId } = useParams<{ roomId}>();
  const userId = useSelector((state: any) => state.auth.userInfo._id);
  const navigate = useNavigate();
  const [addBooking] = useAddBookingMutation();

  const [bookingData, setBookingData] = useState<BookingData>({
    user: userId,
    room: roomId,
    numberOfGuests: 1,
    checkIn: "",
    checkOut: "",
    status: "Pending",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!bookingData.numberOfGuests || !bookingData.checkIn || !bookingData.checkOut) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      const res = await addBooking(bookingData).unwrap();
      toast.success("Booking Successful");
      navigate(`/user/billing/${roomId}`);
    } catch (error) {
      console.error("Error adding booking:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 px-2 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Booking Information</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="mb-4">
              <label htmlFor="numberOfGuests" className="sr-only">
                Number of Guests
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <FaUser className="h-5 w-5" />
                </span>
                <input
                  id="numberOfGuests"
                  name="numberOfGuests"
                  type="number"
                  required
                  className="appearance-none rounded-r-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Number of Guests"
                  value={bookingData.numberOfGuests}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="checkIn" className="sr-only">
                Check-In
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <FaCalendarAlt className="h-5 w-5" />
                </span>
                <input
                  id="checkIn"
                  name="checkIn"
                  type="datetime-local"
                  required
                  className="appearance-none rounded-r-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={bookingData.checkIn}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="checkOut" className="sr-only">
                Check-Out
              </label>
              <div className="flex rounded-md shadow-sm">
                <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                  <FaCalendarAlt className="h-5 w-5" />
                </span>
                <input
                  id="checkOut"
                  name="checkOut"
                  type="datetime-local"
                  required
                  className="appearance-none rounded-r-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={bookingData.checkOut}
                  onChange={handleChange}
                />
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Confirm Booking
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserBookingInformation;
