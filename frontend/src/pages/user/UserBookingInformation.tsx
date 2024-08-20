import React, { useState, useEffect } from "react";
import { FaUser, FaCalendarAlt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAddBookingMutation } from "../../slices/bookingsApiSlice";
import { useGetRoomDetailsQuery } from "../../slices/roomsApiSlice";

interface BookingData {
  user: string;
  room: string;
  numberOfGuests: number;
  from: string;
  to: string;
  checkIn: null;
  checkOut: null;
  status: string;
}

const UserBookingInformation: React.FC = () => {
  const { roomId } = useParams<{ roomId: any }>();
  const userId = useSelector((state: any) => state.auth.userInfo._id);
  const navigate = useNavigate();
  const [addBooking] = useAddBookingMutation();
  const { data, isLoading, isError } = useGetRoomDetailsQuery(roomId);
  const { room: roomData } = data || {}; // Added fallback to avoid errors when data is undefined

  const [bookingData, setBookingData] = useState<BookingData>({
    user: userId,
    room: roomId,
    numberOfGuests: 1,
    from: "",
    to: "",
    checkIn: null,
    checkOut: null,
    status: "Pending",
  });

  const [totalPrice, setTotalPrice] = useState<number | null>(null);

  // Function to calculate total price based on the selected dates
  const calculateTotalPrice = () => {
    if (bookingData.from && bookingData.to && roomData?.price) {
      const fromDate = new Date(bookingData.from);
      const toDate = new Date(bookingData.to);
      const timeDiff = toDate.getTime() - fromDate.getTime();
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24)); // Calculate number of days
      const basePrice = daysDiff * roomData.price; // Base price before discount

      let finalPrice = basePrice;
      if (roomData.discount) {
        const discountAmount = (basePrice * roomData.discount) / 100;
        finalPrice = basePrice - discountAmount;
      }
      setTotalPrice(finalPrice);
    } else {
      setTotalPrice(null); // Reset if dates are not properly selected
    }
  };

  useEffect(() => {
    calculateTotalPrice();
  }, [bookingData.from, bookingData.to, roomData]);

  useEffect(() => {
    // Calculate and set initial discounted price
    if (roomData?.price) {
      const basePricePerNight = roomData.price;
      let discountedPricePerNight = basePricePerNight;

      if (roomData.discount) {
        const discountAmount = (basePricePerNight * roomData.discount) / 100;
        discountedPricePerNight = basePricePerNight - discountAmount;
      }

      setTotalPrice(discountedPricePerNight); // Show discounted price initially
    }
  }, [roomData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setBookingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!bookingData.numberOfGuests || !bookingData.from || !bookingData.to) {
      toast.error("Please fill out all required fields.");
      return;
    }

    try {
      const res = await addBooking(bookingData).unwrap();
      const bookingId = res.data._id;
      toast.success("Booking Successful");
      navigate(`/user/billing/${roomId}?bookingId=${bookingId}`);
    } catch (error) {
      console.error("Error adding booking:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  if (isLoading) return <div>Loading room details...</div>;
  if (isError) return <div>Error loading room details.</div>;

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-8 px-4 sm:px-10 lg:px-12">
      <div className="max-w-6xl w-full bg-white p-8 rounded-lg shadow-md flex space-x-10">
        {/* Room Details Section */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold text-gray-900">{roomData?.title}</h2>
          <img
            src={`http://localhost:5000${roomData?.image}`}
            alt={roomData?.title}
            className="w-full h-64 object-cover mt-6 rounded-lg"
          />
          <p className="text-gray-700 mt-4">
            <strong>Price:</strong> {roomData?.discount ? (
              <>
                <span className="line-through text-gray-500">{roomData.price} Taka</span> {" "}
                <span className="text-red-500">{totalPrice} Taka (Discounted)</span>
              </>
            ) : (
              `${roomData?.price} Taka (Per Night)`
            )}
          </p>
          <p className="text-gray-700">
            <strong>Bed Type:</strong> {roomData?.bedType}
          </p>
          <p className="text-gray-700">
            <strong>Bonus:</strong> {roomData?.bonus}
          </p>
          {totalPrice !== null && (
            <p className="text-gray-700 mt-4">
              <strong>Total Price:</strong> {totalPrice} Taka
            </p>
          )}
        </div>

        {/* Booking Form Section */}
        <div className="w-1/2">
          <h2 className="text-3xl font-bold text-gray-900 text-center">Booking Information</h2>
          <form className="mt-10 space-y-8" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-6">
              <div className="mb-6">
                <label htmlFor="numberOfGuests" className="sr-only">
                  Number of Guests
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <FaUser className="h-6 w-6" />
                  </span>
                  <input
                    id="numberOfGuests"
                    name="numberOfGuests"
                    type="number"
                    required
                    className="appearance-none rounded-r-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                    placeholder="Number of Guests"
                    value={bookingData.numberOfGuests}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="from" className="sr-only">
                  From
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <FaCalendarAlt className="h-6 w-6" />
                  </span>
                  <input
                    id="from"
                    name="from"
                    type="date"
                    required
                    className="appearance-none rounded-r-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                    value={bookingData.from}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-6">
                <label htmlFor="to" className="sr-only">
                  To
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-4 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <FaCalendarAlt className="h-6 w-6" />
                  </span>
                  <input
                    id="to"
                    name="to"
                    type="date"
                    required
                    className="appearance-none rounded-r-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-base"
                    value={bookingData.to}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
              >
                Confirm Booking
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserBookingInformation;
