import React from 'react';

const BookingModal = ({ bookings, onClose }) => {
  if (!bookings.length) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 relative">
        <h2 className="text-2xl font-bold mb-4">Bookings Ending Today</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <ul className="list-disc pl-5">
          {bookings.map((booking) => (
            <li key={booking._id} className="mb-2">
              <p><strong>User:</strong> {booking.user.name}</p>
              <p><strong>Room:</strong> {booking.room.title}</p>
              <p><strong>Check-out:</strong> {new Date(booking.to).toLocaleDateString()}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookingModal;
