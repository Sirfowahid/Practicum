import React, { useState } from "react";
import { useGetBillingsQuery } from "../../slices/billingsApiSlice";
import { useGetUsersQuery } from "../../slices/usersApiSlice";
import { useGetRoomsQuery } from "../../slices/roomsApiSlice";
import { toast } from "react-toastify";
import Pagination from "../../components/ui/Pagination";

const RecepBills = () => {
  const {
    data: billingsRes,
    isLoading: loadingBills,
    isError: errorBills,
  } = useGetBillingsQuery();
  const {
    data: roomsRes,
    isLoading: loadingRooms,
    isError: errorRooms,
  } = useGetRoomsQuery();
  const {
    data: usersRes,
    isLoading: loadingUsers,
    isError: errorUsers,
  } = useGetUsersQuery();

  const [currentPage, setCurrentPage] = useState(1);
  const bookingsPerPage = 5;

  // Search state
  const [searchGuestName, setSearchGuestName] = useState("");
  const [searchRoomNumber, setSearchRoomNumber] = useState("");
  const [searchPaymentMethod, setSearchPaymentMethod] = useState("");
  const [searchMobileNo, setSearchMobileNo] = useState("");
  const [searchAmount, setSearchAmount] = useState("");

  if (loadingBills || loadingRooms || loadingUsers) {
    return <div>Loading...</div>;
  }

  if (errorBills || errorRooms || errorUsers) {
    toast.error("Error loading data");
    return <div>Error loading data</div>;
  }

  const { billings } = billingsRes || [];
  const { rooms } = roomsRes || [];
  const { users } = usersRes || [];

  const getGuestName = (user_id: string): string => {
    const user = users.find((user: any) => user._id === user_id);
    return user ? user.name : "Unknown Guest";
  };

  const getRoomNumber = (room_id: string): string => {
    const room = rooms.find((room: any) => room._id === room_id);
    return room ? room.roomNumber.toString() : "Unknown Room";
  };

  // Filtering logic
  const filteredBillings = billings.filter((booking: any) => {
    const guestName = getGuestName(booking.user).toLowerCase();
    const roomNumber = getRoomNumber(booking.room).toLowerCase();
    const paymentMethod = booking.paymentMethod.toLowerCase();
    const mobileNo = booking.mobileNo.toLowerCase();
    const amount = booking.amount.toString().toLowerCase();

    return (
      guestName.includes(searchGuestName.toLowerCase()) &&
      roomNumber.includes(searchRoomNumber.toLowerCase()) &&
      paymentMethod.includes(searchPaymentMethod.toLowerCase()) &&
      mobileNo.includes(searchMobileNo.toLowerCase()) &&
      amount.includes(searchAmount.toLowerCase())
    );
  });

  // Pagination logic
  const indexOfLastBooking = currentPage * bookingsPerPage;
  const indexOfFirstBooking = indexOfLastBooking - bookingsPerPage;
  const currentBookings = filteredBillings.slice(
    indexOfFirstBooking,
    indexOfLastBooking
  );

  const totalPages = Math.ceil(filteredBillings.length / bookingsPerPage);

  const onPageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Billing Information</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                Guest Name
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                Room Number
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                Payment Method
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                Mobile No
              </th>
              <th className="py-2 px-4 border-b text-left text-sm font-medium text-gray-500 uppercase">
                Amount
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search by Guest Name"
                  className="w-full p-2 border rounded"
                  value={searchGuestName}
                  onChange={(e) => setSearchGuestName(e.target.value)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search by Room Number"
                  className="w-full p-2 border rounded"
                  value={searchRoomNumber}
                  onChange={(e) => setSearchRoomNumber(e.target.value)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search by Payment Method"
                  className="w-full p-2 border rounded"
                  value={searchPaymentMethod}
                  onChange={(e) => setSearchPaymentMethod(e.target.value)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search by Mobile No"
                  className="w-full p-2 border rounded"
                  value={searchMobileNo}
                  onChange={(e) => setSearchMobileNo(e.target.value)}
                />
              </td>
              <td className="py-2 px-4 border-b">
                <input
                  type="text"
                  placeholder="Search by Amount"
                  className="w-full p-2 border rounded"
                  value={searchAmount}
                  onChange={(e) => setSearchAmount(e.target.value)}
                />
              </td>
            </tr>
            {currentBookings.map((booking: any) => (
              <tr key={booking._id}>
                <td className="py-2 px-4 border-b">
                  {getGuestName(booking.user)}
                </td>
                <td className="py-2 px-4 border-b">
                  {getRoomNumber(booking.room)}
                </td>
                <td className="py-2 px-4 border-b">{booking.paymentMethod}</td>
                <td className="py-2 px-4 border-b">{booking.mobileNo}</td>
                <td className="py-2 px-4 border-b">${booking.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-4">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </div>
  );
};

export default RecepBills;
