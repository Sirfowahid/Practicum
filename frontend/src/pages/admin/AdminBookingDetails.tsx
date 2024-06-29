import React from 'react';
import { FaCalendarAlt, FaUser, FaBed, FaMoneyBillWave } from 'react-icons/fa';
import { Link } from 'react-router-dom';
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
          <button className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 mr-4">
          <Link to="/admin/bookings">Accept Booking </Link>
          </button>
          <button className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600">
          <Link to="/admin/bookings">Cancel Booking </Link>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminBookingDetails;
