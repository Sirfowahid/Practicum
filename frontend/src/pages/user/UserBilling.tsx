import React, { useState } from 'react';
import { useForm, FormProvider, SubmitHandler } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { FaMobileAlt, FaMoneyBillWave, FaExchangeAlt, FaCreditCard } from 'react-icons/fa';
import FormInput from '../../components/ui/FormInput';

interface FormValues {
  paymentMedia: string;
  mobile: string;
  amount: number;
  transactionId: string;
}

const UserBilling: React.FC = () => {
  const navigate = useNavigate();
  const methods = useForm<FormValues>();
  const [showModal, setShowModal] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormValues | null>(null);

  const { handleSubmit, register, formState: { errors } } = methods;

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    setSubmittedData(data);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    navigate("/user/profile/1"); // Navigate to user profile after closing modal
  };

  return (
    <div className="flex justify-center my-4">
      <FormProvider {...methods}>
        <div className="w-2/3 mt-10 px-4">
          <div className="flex justify-between">
            <h2 className="text-2xl font-bold mb-5 text-center">
              Billing Information
            </h2>
            <button
              onClick={() => navigate("/user/info")}
              className="bg-black px-6 text-white text-xl font-medium rounded"
            >
              Go Back
            </button>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="mb-4">
              <label htmlFor="paymentMedia" className="block text-gray-700 text-sm font-bold mb-2">Payment Media</label>
              <div className="flex items-center">
                <FaCreditCard className="mr-2 text-gray-600" />
                <select
                  id="paymentMedia"
                  {...register('paymentMedia', { required: 'Payment media is required' })}
                  className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${errors.paymentMedia ? 'border-red-500' : ''}`}
                >
                  <option value="">Select payment media</option>
                  <option value="Bkash">Bkash</option>
                  <option value="Nagad">Nagad</option>
                  <option value="Rocket">Rocket</option>
                </select>
                {errors.paymentMedia && (
                  <p className="text-red-500 text-xs italic mt-1">{errors.paymentMedia.message}</p>
                )}
              </div>
            </div>
            <FormInput 
              name="mobile" 
              label="Mobile Number" 
              placeholder="Enter your mobile number" 
              rules={{ required: 'Mobile number is required' }} 
              icon={<FaMobileAlt />}
            />
            <FormInput 
              name="amount" 
              label="Amount" 
              type="number"
              placeholder="Enter the amount" 
              rules={{ required: 'Amount is required' }} 
              icon={<FaMoneyBillWave />}
            />
            <FormInput 
              name="transactionId" 
              label="Transaction ID" 
              placeholder="Enter the transaction ID" 
              rules={{ required: 'Transaction ID is required' }} 
              icon={<FaExchangeAlt />}
            />
            <button
              type="submit" 
              className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
            >
              Confirm Booking
            </button>
          </form>
        </div>
      </FormProvider>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="fixed inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            {/* Modal content */}
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="flex justify-center">
                <FaCreditCard className="text-6xl text-blue-500" />
              </div>
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold mb-2">Booking Confirmed!</h3>
                <p className="text-gray-700">
                  Your booking request sent successfully.
                </p>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={closeModal}
                  className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {/* End Modal */}
    </div>
  );
};

export default UserBilling;
