import React, { useState, useEffect } from "react";
import { FaMobileAlt, FaDollarSign, FaReceipt } from "react-icons/fa";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAddBillingMutation } from "../../slices/billingsApiSlice";
import { useGetRoomDetailsQuery } from "../../slices/roomsApiSlice";
import { useGetBookingDetailsQuery } from "../../slices/bookingsApiSlice";

interface BillingData {
  user: string;
  room: string;
  booking: string | null;
  paymentMethod: string;
  mobileNo: string;
  amount: number;
  transactionId: string;
}

const UserBilling: React.FC = () => {
  const { roomId } = useParams<{ roomId: string }>();
  const userId = useSelector((state: any) => state.auth.userInfo._id);
  const navigate = useNavigate();
  const [addBilling] = useAddBillingMutation();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const bookingId = queryParams.get("bookingId");

  const {
    data: roomData,
    isLoading: roomLoading,
    isError: roomError,
  } = useGetRoomDetailsQuery(roomId);
  const {
    data: bookingData,
    isLoading: bookingLoading,
    isError: bookingError,
  } = useGetBookingDetailsQuery(bookingId);

  const [billingData, setBillingData] = useState<BillingData>({
    user: userId,
    room: roomId,
    booking: bookingId,
    paymentMethod: "Nagad",
    mobileNo: "",
    amount: 0,
    transactionId: "",
  });

  useEffect(() => {
    if (roomData && bookingData) {
      const checkInDate = new Date(bookingData.booking.from);
      const checkOutDate = new Date(bookingData.booking.to);
      const timeDiff = checkOutDate.getTime() - checkInDate.getTime();
      const numberOfNights = Math.ceil(timeDiff / (1000 * 3600 * 24));
      const basePrice = roomData.room.price;
      const discount = roomData.room.discount || 0;
      const discountedPricePerNight = discount
        ? basePrice - (basePrice * discount) / 100
        : basePrice;
      const calculatedAmount = discountedPricePerNight * numberOfNights;

      setBillingData((prevData) => ({
        ...prevData,
        amount: calculatedAmount,
      }));
    }
  }, [roomData, bookingData]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (
      !billingData.mobileNo ||
      billingData.amount <= 0 ||
      !billingData.transactionId
    ) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    try {
      await addBilling(billingData).unwrap();
      toast.success("Payment Successful");
      navigate(`/user/profile/${userId}`);
    } catch (error) {
      console.error("Error adding billing:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 px-2 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl bg-white p-8 rounded shadow-md flex space-x-8">
        <div className="w-1/2">
          {roomLoading || bookingLoading ? (
            <p>Loading information...</p>
          ) : roomError || bookingError ? (
            <p>Error loading information.</p>
          ) : (
            roomData &&
            bookingData && (
              <div>
                <h2 className="text-3xl font-bold text-gray-900">
                  {roomData.room.title}
                </h2>
                <img
                  src={`http://localhost:5000${roomData.room.image}`}
                  alt={roomData.room.title}
                  className="w-full h-64 object-cover mt-6 rounded-lg"
                />
                <p className="text-gray-700 mt-4">
                  <strong>Price:</strong>{" "}
                  {roomData.room.discount
                    ? roomData.room.price - (roomData.room.price * roomData.room.discount) / 100
                    : roomData.room.price} Taka (Per Night)
                </p>
                <p className="text-gray-700">
                  <strong>Bed Type:</strong> {roomData.room.bedType}
                </p>
                <p className="text-gray-700">
                  <strong>Bonus:</strong> {roomData.room.bonus}
                </p>
              </div>
            )
          )}
        </div>
        <div className="w-1/2">
          <h2 className="text-center text-3xl font-bold text-gray-900">
            Billing Information
          </h2>
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="rounded-md shadow-sm space-y-4">
              <div className="mb-4">
                <label htmlFor="paymentMethod" className="sr-only">
                  Payment Method
                </label>
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  className="appearance-none rounded-md relative block w-full px-4 py-3 border border-gray-300 text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                  value={billingData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="Bkash">Bkash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                </select>
              </div>

              <div className="mb-4">
                <label htmlFor="mobileNo" className="sr-only">
                  Mobile Number
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <FaMobileAlt className="h-5 w-5" />
                  </span>
                  <input
                    id="mobileNo"
                    name="mobileNo"
                    type="text"
                    required
                    className="appearance-none rounded-r-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Mobile Number"
                    value={billingData.mobileNo}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="amount" className="sr-only">
                  Amount
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <FaDollarSign className="h-5 w-5" />
                  </span>
                  <input
                    id="amount"
                    name="amount"
                    type="number"
                    required
                    readOnly
                    className="appearance-none rounded-r-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    value={billingData.amount}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="mb-4">
                <label htmlFor="transactionId" className="sr-only">
                  Transaction ID
                </label>
                <div className="flex rounded-md shadow-sm">
                  <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm">
                    <FaReceipt className="h-5 w-5" />
                  </span>
                  <input
                    id="transactionId"
                    name="transactionId"
                    type="text"
                    required
                    className="appearance-none rounded-r-md relative block w-full px-4 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    placeholder="Transaction ID"
                    value={billingData.transactionId}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Submit Payment
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserBilling;
