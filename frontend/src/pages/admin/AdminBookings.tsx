import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEye, FaTimes } from 'react-icons/fa'; // Importing icons from react-icons
import { bookingsData } from '../../data/bookingData'; // Adjust the import path as per your project structure
import Pagination from '../../components/ui/Pagination';

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
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookingsPerPage] = useState<number>(5); // Number of bookings to display per page
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]); // State for filtered bookings
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [bookingToCancel, setBookingToCancel] = useState<Booking | null>(null);

  const navigate = useNavigate();

  // Function to handle search input change
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterBookings(term);
    setCurrentPage(1); // Reset current page to 1 when search term changes
  };

  // Function to filter bookings based on search term
  const filterBookings = (term: string) => {
    if (!term.trim()) {
      setFilteredBookings([]); // If search term is empty, reset filtered bookings
      return;
    }

    const filtered = bookingsData.filter((booking) =>
      booking.guestName.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredBookings(filtered);
  };

  // Use filtered bookings if search term is applied, otherwise use all bookings
  const displayedBookings = searchTerm ? filteredBookings : bookingsData;

  // Pagination logic: Calculate total pages based on displayed bookings and bookings per page
  const totalPages = Math.ceil(displayedBookings.length / bookingsPerPage);

  // Calculate current bookings to display based on current page
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = displayedBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  // Function to handle page change
  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleCancelBooking = (booking: Booking) => {
    setBookingToCancel(booking);
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
    setBookingToCancel(null);
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
              {currentBookings.map((booking) => (
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
                      onClick={() => navigate(`/admin/bookings/${booking.guestName}`)}
                    >
                      <FaEye className="inline-block mr-1" /> View
                    </button>
                    <button
                      className="ml-2 text-red-600 hover:text-red-900"
                      onClick={() => handleCancelBooking(booking)}
                    >
                      <FaTimes className="inline-block mr-1" /> Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>

      {/* Cancel Modal */}
      {showCancelModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-x-hidden overflow-y-auto outline-none focus:outline-none">
          <div className="fixed inset-0 bg-black opacity-50"></div> {/* Dark overlay */}
          <div className="relative w-auto my-6 mx-auto max-w-sm">
            <div className="bg-white rounded-lg shadow-lg p-4">
              <div className="text-center mt-4">
                <h3 className="text-xl font-bold mb-2">Cancel Booking</h3>
                <p className="text-gray-700">
                  Are you sure you want to cancel the booking for {bookingToCancel?.guestName}?
                </p>
              </div>
              <div className="mt-6 text-center">
                <button
                  onClick={closeCancelModal}
                  className="bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600"
                >
                  Confirm
                </button>
                <button
                  onClick={() => setShowCancelModal(false)}
                  className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 ml-4"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBookings;
