// AdminBookings.tsx

import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import { bookingsData } from '../../data/bookingData';// Adjust the import path as per your project structure

export interface Booking {
  id: number;
  guestName: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
}
const AdminBookings: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>(bookingsData);

  // Function to handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterBookings(event.target.value);
  };

  // Function to filter bookings based on search term
  const filterBookings = (term: string) => {
    const filtered = bookingsData.filter((booking) =>
      booking.guestName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-full mx-auto bg-white rounded-lg overflow-hidden">
        <h2 className="text-2xl font-bold p-6">Manage Bookings</h2>
        <div className="flex items-center px-6 pb-6">
          <input
            type="text"
            placeholder="Search by guest name"
            value={searchTerm}
            onChange={handleSearchChange}
            className="border-gray-300 focus:border-blue-500 focus:ring focus:ring-blue-200 rounded-md px-3 py-2 w-full mr-2"
          />
          <FaSearch className="text-gray-400" />
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Guest Name
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Room Number
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-In
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Check-Out
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredBookings.map((booking) => (
                <tr key={booking.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.guestName}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.roomNumber}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.checkIn}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{booking.checkOut}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === 'Confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'Pending'
                          ? 'bg-yellow-100 text-yellow-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => alert(`View details for ${booking.guestName}`)}
                    >
                      View
                    </button>
                    <button
                      className="ml-2 text-red-600 hover:text-red-900"
                      onClick={() => alert(`Cancel booking for ${booking.guestName}`)}
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminBookings;
