import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaSearch, FaEye } from 'react-icons/fa';
import Pagination from '../../components/ui/Pagination';
import { useGetBookingsQuery } from '../../slices/bookingsApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';
import { useGetRoomsQuery } from '../../slices/roomsApiSlice';
import { format } from 'date-fns';

export interface Booking {
  _id: string;
  user: string;
  room: string;
  numberOfGuests: number;
  checkIn: string;
  checkOut: string;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  createdAt: string; // Assuming there's a createdAt field
}

export interface User {
  _id: string;
  name: string;
}

export interface Room {
  _id: string;
  roomNumber: number;
}

const AdminBookings: React.FC = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [bookingsPerPage] = useState<number>(5);
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  const { data: bookingsData, isLoading: isLoadingBookings, isError: isErrorBookings } = useGetBookingsQuery();
  const { data: usersData, isLoading: isLoadingUsers, isError: isErrorUsers } = useGetUsersQuery();
  const { data: roomsData, isLoading: isLoadingRooms, isError: isErrorRooms } = useGetRoomsQuery();

  useEffect(() => {
    if (bookingsData && bookingsData.bookings) {
      setFilteredBookings(bookingsData.bookings);
    }
  }, [bookingsData]);

  const getGuestName = (user_id: string): string => {
    const user = usersData?.users.find((user: User) => user._id === user_id);
    return user ? user.name : 'Unknown Guest';
  };

  const getRoomNumber = (room_id: string): string => {
    const room = roomsData?.rooms.find((room: Room) => room._id === room_id);
    return room ? room.roomNumber.toString() : 'Unknown Room';
  };

  const formatDate = (dateString: string): string => {
    return format(new Date(dateString), 'MMMM d, yyyy, h:mm a');
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const term = event.target.value;
    setSearchTerm(term);
    filterBookings(term);
    setCurrentPage(1);
  };

  const filterBookings = (term: string) => {
    if (!term.trim()) {
      setFilteredBookings(bookingsData ? bookingsData.bookings : []);
      return;
    }

    const filtered = bookingsData.bookings.filter((booking: Booking) => {
      const guestName = getGuestName(booking.user);
      return guestName.toLowerCase().includes(term.toLowerCase());
    });
    setFilteredBookings(filtered);
  };

  // Sorting bookings with 'Pending' status first, then descending order by creation date
  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (a.status === 'Pending' && b.status !== 'Pending') return -1;
    if (a.status !== 'Pending' && b.status === 'Pending') return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const displayedBookings = sortedBookings;
  const totalPages = Math.ceil(displayedBookings.length / bookingsPerPage);
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = displayedBookings.slice(indexOfFirstBooking, indexOfLastBooking);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoadingBookings || isLoadingUsers || isLoadingRooms) return <p>Loading...</p>;
  if (isErrorBookings || isErrorUsers || isErrorRooms) return <p>Something went wrong!</p>;

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
                <tr key={booking._id}>
                  <td className="px-6 py-4 whitespace-nowrap">{getGuestName(booking.user)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{getRoomNumber(booking.room)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(booking.checkIn)}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{formatDate(booking.checkOut)}</td>
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
                      onClick={() => navigate(`/admin/bookings/${booking._id}`)}
                    >
                      <FaEye className="inline-block mr-1" /> View
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
    </div>
  );
};

export default AdminBookings;
