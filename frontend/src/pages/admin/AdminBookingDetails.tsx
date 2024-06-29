import React, { useState } from 'react';
import { FaCalendarAlt, FaUser, FaBed, FaMoneyBillWave } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';

const AdminBookingDetails = () => {
  // Mock booking data
  const booking = {
    id: 1,
    room: 'Deluxe Room',
    checkIn: '2024-07-01',
    checkOut: '2024-07-05',
    amount: 5000,
    guest: {
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '123-456-7890',
      address: '123 Main St, City, Country',
    },
  };

  const [showAcceptModal, setShowAcceptModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const navigate = useNavigate();

  const handleAcceptBooking = () => {
    setShowAcceptModal(true);
  };

  const handleCancelBooking = () => {
    setShowCancelModal(true);
  };

  const closeModal = () => {
    setShowAcceptModal(false);
    setShowCancelModal(false);
    navigate('/admin/bookings');
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 py-10">
      <div className="w-full max-w-3xl bg-white p-8 rounded shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-center">Booking Details</h1>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaBed className="mr-2" /> Room Information
          </h2>
          <div className="space-y-2">
            <p><strong>Room:</strong> {booking.room}</p>
            <p className="flex items-center"><FaCalendarAlt className="mr-2" /> <strong>Check-in:</strong> {new Date(booking.checkIn).toLocaleDateString()}</p>
            <p className="flex items-center"><FaCalendarAlt className="mr-2" /> <strong>Check-out:</strong> {new Date(booking.checkOut).toLocaleDateString()}</p>
            <p className="flex items-center"><FaMoneyBillWave className="mr-2" /> <strong>Amount:</strong> ${booking.amount}</p>
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-4 flex items-center">
            <FaUser className="mr-2" /> Guest Information
          </h2>
          <div className="space-y-2">
            <p><strong>Name:</strong> {booking.guest.name}</p>
            <p><strong>Email:</strong> {booking.guest.email}</p>
            <p><strong>Phone:</strong> {booking.guest.phone}</p>
            <p><strong>Address:</strong> {booking.guest.address}</p>
          </div>
        </div>

        <div className="mt-8 text-center">
          <button
            onClick={handleAcceptBooking}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-4"
          >
            Accept Booking
          </button>
          <button
            onClick={handleCancelBooking}
            className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
          >
            Cancel Booking
          </button>
        </div>
      </div>

      {/* Accept Modal */}
      {showAcceptModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="fixed inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold mb-2">Booking Accepted!</h3>
                <p className="text-gray-700">
                  The booking has been accepted successfully.
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

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="fixed inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold mb-2">Booking Cancelled</h3>
                <p className="text-gray-700">
                  The booking has been cancelled.
                </p>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={closeModal}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  OK
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookingDetails;
