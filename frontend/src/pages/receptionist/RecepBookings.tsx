import React, { useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FaSearch, FaEye } from "react-icons/fa";
import Pagination from "../../components/ui/Pagination";
import {
  useGetBookingsQuery,
  useUpdateBookingMutation,
} from "../../slices/bookingsApiSlice";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import {
  useGetRoomsQuery,
  useUpdateRoomMutation,
} from "../../slices/roomsApiSlice";
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
  const [showModal, setShowModal] = useState(false);
  const [todaysBookings, setTodaysBookings] = useState([]);

  const [searchTerms, setSearchTerms] = useState({
    _id: "",
    guestName: "",
    roomNumber: "",
    from: "",
    to: "",
    checkIn: "",
    checkOut: "",
    status: "",
  });
  const [currentPage, setCurrentPage] = useState<number>(1);
  const bookingsPerPage = 10;
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
  const [updateRoom] = useUpdateRoomMutation();

  useEffect(() => {
    if (bookingsData && bookingsData.bookings) {
      const todaysBookingsList = bookingsData.bookings.filter(
        (booking: any) =>
          new Date(booking.to).toDateString() === new Date().toDateString() &&
          booking.status === "Confirmed"
      );
      setTodaysBookings(todaysBookingsList);
      setShowModal(false);
    }
  }, [bookingsData]);

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

  const formatDateTime = (dateString: string | null): string => {
    return dateString
      ? format(new Date(dateString), "MMMM d, yyyy h:mm a")
      : "N/A";
  };

  const handleCheckIn = async (bookingId: string) => {
    try {
      const booking = filteredBookings.find(
        (booking) => booking._id === bookingId
      );

      if (!booking) {
        toast.error("Booking not found");
        return;
      }

      const currentDate = new Date();
      const fromDate = new Date(booking.from);
      const toDate = new Date(booking.to);

      if (currentDate < fromDate) {
        toast.error("Check-in date cannot be before the booking start date");
        return;
      }

      if (currentDate > toDate) {
        toast.error("Check-in date cannot be after the booking end date");
        return;
      }

      await updateBooking({
        _id: bookingId,
        checkIn: new Date(),
        checkOut: null,
      });
      toast.success("Check-In Successful");
      refetch();
    } catch (error) {
      toast.error("Failed to Check In");
    }
  };

  const handleCheckOut = async (bookingId: string, roomId: string) => {
    try {
      const booking = filteredBookings.find(
        (booking) => booking._id === bookingId
      );

      if (!booking) {
        toast.error("Booking not found");
        return;
      }

      const currentDate = new Date();
      const toDate = new Date(booking.to);

      if (currentDate > toDate) {
        toast.error("Check-out in late");
      }

      await updateBooking({ _id: bookingId, checkOut: new Date() });
      toast.success("Check-Out Successful");
      refetch();

      try {
        await updateRoom({ _id: roomId, availability: true });
        toast.success("Room Removed from the User");
      } catch (error) {
        toast.error("Room is unable to assign");
      }
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

    if (terms._id) {
      filtered = filtered.filter((booking) => {
        const _id = booking._id;
        return _id.includes(terms._id);
      });
    }

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

  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const downloadCSV = () => {
    if (!selectedDate) {
      toast.error("Please select a date");
      return;
    }

    const filteredByDate = filteredBookings.filter((booking) => {
      const bookingDate = format(new Date(booking.from), "yyyy-MM-dd");
      return bookingDate === selectedDate;
    });

    if (filteredByDate.length === 0) {
      toast.error("No bookings found for the selected date");
      return;
    }

    const csvContent = [
      ["Booking ID", "Guest Name", "Room Number", "From", "To", "Status"].join(
        ","
      ),
      ...filteredByDate.map((booking) =>
        [
          booking._id,
          getGuestName(booking.user),
          getRoomNumber(booking.room),
          new Date(booking.from).toLocaleDateString("en-GB"),
          new Date(booking.to).toLocaleDateString("en-GB"),
          booking.status,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `bookings_${selectedDate}.csv`;
    link.click();
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

  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="container mx-auto p-4">
        <button
          onClick={() => setShowModal(true)}
          className="relative bg-blue-500 text-white rounded my-2 hover:bg-blue-600 px-3 py-2"
        >
          Today's Leaves
          {todaysBookings.length > 0 && (
            <span className="absolute top-0 right-0 -mt-1 -mr-1 bg-red-600 text-white rounded-full px-2 py-1 text-xs">
              {todaysBookings.length}
            </span>
          )}
        </button>

        <h1 className="text-2xl font-bold mb-4">Manage Bookings</h1>

        <div className="mb-4">
          <label className="mr-2">Select Date: </label>
          <input
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border p-2 rounded"
          />
          <button
            onClick={downloadCSV}
            className="ml-4 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded"
          >
            Download Report
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                  ID
                </th>
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
                    value={searchTerms._id}
                    onChange={(e) => handleSearchChange(e, "_id")}
                    className="w-full p-2 border rounded"
                  />
                </th>
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
                  <td className="py-2 px-4 border-b">{booking._id}</td>
                  <td className="py-2 px-4 border-b">
                    {getGuestName(booking.user)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {getRoomNumber(booking.room)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(booking.from)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {formatDate(booking.to)}
                  </td>
                  <td className="py-2 px-4 border-b">
                    {booking.checkIn
                      ? formatDateTime(booking.checkIn)
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
                      ? formatDateTime(booking.checkOut)
                      : booking.status === "Confirmed" &&
                        booking.checkIn && (
                          <button
                            onClick={() =>
                              handleCheckOut(booking._id, booking.room)
                            }
                            className="px-4 py-2 text-white rounded bg-blue-500 hover:bg-blue-600"
                          >
                            Check-Out
                          </button>
                        )}
                  </td>
                  <td className="py-2 px-4 border-b">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        booking.status === "Confirmed"
                          ? "bg-green-100 text-green-800"
                          : booking.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {booking.status}
                    </span>
                  </td>
                  <td className="py-2 px-4 border-b">
                    <button
                      onClick={() =>
                        navigate(`/reception/bookings/${booking._id}`)
                      }
                      className="text-blue-500 hover:text-blue-600"
                    >
                      <FaEye /> view
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

      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h3 className="text-xl font-bold mb-4">Today's Check Out Guest</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="border p-2">Room No</th>
                  <th className="border p-2">User Name</th>
                  <th className="border p-2">From</th>
                  <th className="border p-2">To</th>
                  <th className="border p-2">CheckOut</th>
                </tr>
              </thead>
              <tbody>
                {todaysBookings.map((booking) => (
                  <tr key={booking._id}>
                    <td className="border p-2">
                      {getRoomNumber(booking.room) || "Loading..."}
                    </td>
                    <td className="border p-2">
                      {getGuestName(booking.user) || "Loading..."}
                    </td>
                    <td className="border p-2">
                      {new Date(booking.from).toLocaleDateString()}
                    </td>
                    <td className="border p-2">
                      {new Date(booking.to).toLocaleDateString()}
                    </td>
                    <td className="border p-2">{booking.checkOut}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button
              className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default RecepBookings;
