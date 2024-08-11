import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye } from "react-icons/fa";
import Pagination from "../../components/ui/Pagination";
import {
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "../../slices/bookingsApiSlice";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import { useGetRoomsQuery } from "../../slices/roomsApiSlice";
import { format } from "date-fns";
import { toast } from "react-toastify";

export interface Booking {
  _id: string;
  user: string;
  room: string;
  numberOfGuests: number;
  from: string;
  to: string;
  checkIn: string | null;
  checkOut: string | null;
  status: "Confirmed" | "Pending" | "Cancelled";
  createdAt: string;
}

export interface User {
  _id: string;
  name: string;
}

export interface Room {
  _id: string;
  roomNumber: number;
}

const RecepBookings = () => {
  const navigate = useNavigate();
  const [searchTerms, setSearchTerms] = useState({
    guestName: "",
    roomNumber: "",
    from: "",
    to: "",
    checkIn: "",
    checkOut: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const bookingsPerPage = 5;
  const [filteredBookings, setFilteredBookings] = useState<Booking[]>([]);

  const {
    data: bookingsData,
    isLoading: isLoadingBookings,
    isError: isErrorBookings,
    refetch,
  } = useGetBookingsQuery();
  const {
    data: usersData,
    isLoading: isLoadingUsers,
    isError: isErrorUsers,
  } = useGetUsersQuery();
  const {
    data: roomsData,
    isLoading: isLoadingRooms,
    isError: isErrorRooms,
  } = useGetRoomsQuery();

  useEffect(() => {
    if (bookingsData && bookingsData.bookings) {
      setFilteredBookings(bookingsData.bookings);
    }
  }, [bookingsData]);

  const [updateBooking] = useUpdateBookingMutation();

  const getGuestName = (user_id: string): string => {
    const user = usersData?.users.find((user: User) => user._id === user_id);
    return user ? user.name : "Unknown Guest";
  };

  const getRoomNumber = (room_id: string): string => {
    const room = roomsData?.rooms.find((room: Room) => room._id === room_id);
    return room ? room.roomNumber.toString() : "Unknown Room";
  };

  const formatDate = (dateString: string | null): string => {
    return dateString ? format(new Date(dateString), "MMMM d, yyyy") : "N/A";
  };

  const handleCheckIn = async (bookingId: string) => {
    try {
      await updateBooking({ _id: bookingId, checkIn: new Date(), checkOut: null });
      toast.success("Check-In Successful");
      refetch(); // Refetch data to reflect changes
    } catch (error) {
      toast.error("Failed to Check In");
    }
  };

  const handleCheckOut = async (bookingId: string) => {
    try {
      await updateBooking({ _id: bookingId, checkOut: new Date() });
      toast.success("Check-Out Successful");
      refetch(); // Refetch data to reflect changes
    } catch (error) {
      toast.error("Failed to Check Out");
    }
  };

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>, field: string) => {
      const term = event.target.value;
      setSearchTerms((prevTerms) => ({ ...prevTerms, [field]: term }));
      filterBookings({ ...searchTerms, [field]: term });
      setCurrentPage(1);
    },
    [searchTerms]
  );

  const filterBookings = (terms: typeof searchTerms) => {
    let filtered = bookingsData ? bookingsData.bookings : [];

    if (terms.guestName) {
      filtered = filtered.filter((booking) => {
        const guestName = getGuestName(booking.user);
        return guestName.toLowerCase().includes(terms.guestName.toLowerCase());
      });
    }

    if (terms.roomNumber) {
      filtered = filtered.filter((booking) => {
        const roomNumber = getRoomNumber(booking.room);
        return roomNumber.includes(terms.roomNumber);
      });
    }

    if (terms.from) {
      filtered = filtered.filter((booking) =>
        formatDate(booking.from)
          .toLowerCase()
          .includes(terms.from.toLowerCase())
      );
    }

    if (terms.to) {
      filtered = filtered.filter((booking) =>
        formatDate(booking.to).toLowerCase().includes(terms.to.toLowerCase())
      );
    }

    if (terms.checkIn) {
      filtered = filtered.filter((booking) =>
        formatDate(booking.checkIn)
          .toLowerCase()
          .includes(terms.checkIn.toLowerCase())
      );
    }

    if (terms.checkOut) {
      filtered = filtered.filter((booking) =>
        formatDate(booking.checkOut)
          .toLowerCase()
          .includes(terms.checkOut.toLowerCase())
      );
    }

    if (terms.status) {
      filtered = filtered.filter((booking) =>
        booking.status.toLowerCase().includes(terms.status.toLowerCase())
      );
    }

    setFilteredBookings(filtered);
  };

  const sortedBookings = [...filteredBookings].sort((a, b) => {
    if (a.status === "Pending" && b.status !== "Pending") return -1;
    if (a.status !== "Pending" && b.status === "Pending") return 1;
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = sortedBookings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const totalPages = Math.ceil(sortedBookings.length / bookingsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (isLoadingBookings || isLoadingUsers || isLoadingRooms)
    return <p>Loading...</p>;
  if (isErrorBookings || isErrorUsers || isErrorRooms)
    return <p>Something went wrong!</p>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                Guest Name
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                Room Number
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                From
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                To
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                Check-In
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                Check-Out
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                Status
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                Actions
              </th>
            </tr>
            <tr>
              <th className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerms.guestName}
                  onChange={(e) => handleSearchChange(e, "guestName")}
                  className="w-full p-2 border rounded"
                />
              </th>
              <th className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerms.roomNumber}
                  onChange={(e) => handleSearchChange(e, "roomNumber")}
                  className="w-full p-2 border rounded"
                />
              </th>
              <th className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerms.from}
                  onChange={(e) => handleSearchChange(e, "from")}
                  className="w-full p-2 border rounded"
                />
              </th>
              <th className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerms.to}
                  onChange={(e) => handleSearchChange(e, "to")}
                  className="w-full p-2 border rounded"
                />
              </th>
              <th className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerms.checkIn}
                  onChange={(e) => handleSearchChange(e, "checkIn")}
                  className="w-full p-2 border rounded"
                />
              </th>
              <th className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerms.checkOut}
                  onChange={(e) => handleSearchChange(e, "checkOut")}
                  className="w-full p-2 border rounded"
                />
              </th>
              <th className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerms.status}
                  onChange={(e) => handleSearchChange(e, "status")}
                  className="w-full p-2 border rounded"
                />
              </th>
              <th className="py-2 px-4 border-b"></th>
            </tr>
          </thead>
          <tbody>
            {currentBookings.map((booking) => (
              <tr key={booking._id}>
                <td className="py-2 px-4 border-b">
                  {getGuestName(booking.user)}
                </td>
                <td className="py-2 px-4 border-b">
                  {getRoomNumber(booking.room)}
                </td>
                <td className="py-2 px-4 border-b">
                  {formatDate(booking.from)}
                </td>
                <td className="py-2 px-4 border-b">{formatDate(booking.to)}</td>
                <td className="py-2 px-4 border-b">
                  {booking.checkIn
                    ? formatDate(booking.checkIn)
                    : booking.status === "Confirmed" && (
                        <button
                          onClick={() => handleCheckIn(booking._id)}
                          className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600"
                        >
                          Check-In
                        </button>
                      )}
                </td>
                <td className="py-2 px-4 border-b">
                  {booking.checkOut
                    ? formatDate(booking.checkOut)
                    : booking.status === "Confirmed" && booking.checkIn && (
                        <button
                          onClick={() => handleCheckOut(booking._id)}
                          className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600"
                        >
                          Check-Out
                        </button>
                      )}
                </td>
                <td className="py-2 px-4 border-b">{booking.status}</td>
                <td className="py-2 px-4 border-b">
                  <button
                    onClick={() => navigate(`/reception/booking/${booking._id}`)}
                    className="text-blue-500 hover:text-blue-600"
                  >
                    <FaEye />
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
  );
};

export default RecepBookings;
