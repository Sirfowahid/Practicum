import React, { useState } from "react";
import { FaMobileAlt, FaDollarSign, FaReceipt } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import { useAddBillingMutation } from "../../slices/billingsApiSlice";
import { useLocation } from "react-router-dom";

interface BillingData {
  user: string;
  room: string;
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
  const bookingId = queryParams.get('bookingId');
  console.log(`booking id: ${bookingId}`)
  const [billingData, setBillingData] = useState<BillingData>({
    user: userId,
    room: roomId,
    booking:bookingId,
    paymentMethod: "Nagad",
    mobileNo: "",
    amount: 0,
    transactionId: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setBillingData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Validate required fields
    if (!billingData.mobileNo || billingData.amount <= 0 || !billingData.transactionId) {
      toast.error("Please fill out all required fields correctly.");
      return;
    }

    try {
      const res = await addBilling(billingData).unwrap();
      toast.success("Payment Successful");
      navigate(`/user/profile/${userId}`);
    } catch (error) {
      console.error("Error adding billing:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center py-4 px-2 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 bg-white p-6 rounded shadow-md">
        <div>
          <h2 className="mt-6 text-center text-3xl font-bold text-gray-900">Billing Information</h2>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="mb-4">
              <label htmlFor="paymentMethod" className="sr-only">
                Payment Method
              </label>
              <div className="flex rounded-md shadow-sm">
                <select
                  id="paymentMethod"
                  name="paymentMethod"
                  className="appearance-none rounded-l-md relative block w-full px-3 py-2 border border-gray-300 text-gray-900 bg-white focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  value={billingData.paymentMethod}
                  onChange={handleChange}
                >
                  <option value="Bkash">Bkash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                </select>
              </div>
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
                  className="appearance-none rounded-r-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
                  className="appearance-none rounded-r-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                  placeholder="Amount"
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
                  className="appearance-none rounded-r-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
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
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-150 ease-in-out"
            >
              Confirm Payment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserBilling;
