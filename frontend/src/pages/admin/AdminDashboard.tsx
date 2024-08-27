import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'tailwindcss/tailwind.css';
import { useGetRoomsQuery, useGetRoomDetailsQuery } from '../../slices/roomsApiSlice';
import { useGetBookingsQuery } from '../../slices/bookingsApiSlice';
import { useGetBillingsQuery } from '../../slices/billingsApiSlice';
import { useGetUsersQuery, useGetUserDetailsQuery } from '../../slices/usersApiSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [todaysBookings, setTodaysBookings] = useState([]);
  
  const { data: roomsData } = useGetRoomsQuery();
  const { data: bookingsData } = useGetBookingsQuery();
  const { data: billingsData } = useGetBillingsQuery();
  const { data: usersData } = useGetUsersQuery();

  
  const getGuestName = (user_id: string): string => {
    const user = usersData?.users.find((user: User) => user._id === user_id);
    return user ? user.name : "Unknown Guest";
  };

  const getRoomNumber = (room_id: string): string => {
    const room = roomsData?.rooms.find((room: Room) => room._id === room_id);
    return room ? room.roomNumber.toString() : "Unknown Room";
  };

  const [roomDetails, setRoomDetails] = useState({});
  const [userDetails, setUserDetails] = useState({});

  // Summary Information
  const totalRooms = roomsData?.rooms.length || 0;
  const totalUsers = usersData?.users.length || 0;
  const totalReservations = bookingsData?.bookings.length || 0;
  const totalBillings = billingsData?.billings.reduce((sum, billing) => sum + billing.amount, 0) || 0;

  // Process Data
  const bookingsPerDay = {};
  const billingPerDay = {};
  const billingMethods = { Bkash: 0, Nagad: 0, Rocket: 0 };
  const userCountsPerDay = {};

  bookingsData?.bookings.forEach(({ createdAt }) => {
    const date = new Date(createdAt).toLocaleDateString();
    bookingsPerDay[date] = (bookingsPerDay[date] || 0) + 1;
  });

  billingsData?.billings.forEach(({ createdAt, paymentMethod, amount }) => {
    const date = new Date(createdAt).toLocaleDateString();
    billingPerDay[date] = (billingPerDay[date] || 0) + amount;
    billingMethods[paymentMethod] = (billingMethods[paymentMethod] || 0) + 1;
  });

  usersData?.users.forEach(({ createdAt }) => {
    const date = new Date(createdAt).toLocaleDateString();
    userCountsPerDay[date] = (userCountsPerDay[date] || 0) + 1;
  });

  // Chart Data
  const bookingBarData = {
    labels: Object.keys(bookingsPerDay),
    datasets: [
      {
        label: 'Bookings Per Day',
        data: Object.values(bookingsPerDay),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const billingLineData = {
    labels: Object.keys(billingPerDay),
    datasets: [
      {
        label: 'Cumulative Billing Per Day',
        data: Object.values(billingPerDay),
        fill: false,
        borderColor: 'rgba(54, 162, 235, 0.6)',
        tension: 0.4,
      },
    ],
  };

  const paymentMethodPieData = {
    labels: Object.keys(billingMethods),
    datasets: [
      {
        label: 'Payment Methods',
        data: Object.values(billingMethods),
        backgroundColor: ['rgba(255, 99, 132, 0.6)', 'rgba(54, 162, 235, 0.6)', 'rgba(255, 206, 86, 0.6)'],
      },
    ],
  };

  const userCountLineData = {
    labels: Object.keys(userCountsPerDay),
    datasets: [
      {
        label: 'New Users Per Day',
        data: Object.values(userCountsPerDay),
        fill: false,
        borderColor: 'rgba(255, 159, 64, 0.6)',
        tension: 0.4,
      },
    ],
  };

  const availableRoomsData = {
    labels: ['Available Rooms', 'Occupied Rooms'],
    datasets: [
      {
        data: [
          roomsData?.rooms.filter((room) => room.availability).length || 0,
          roomsData?.rooms.filter((room) => !room.availability).length || 0,
        ],
        backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)'],
      },
    ],
  };

  // Fetch Room and User Details
  useEffect(() => {
    const fetchDetails = async () => {
      const roomDetailsMap = {};
      const userDetailsMap = {};
      
      for (const booking of bookingsData?.bookings || []) {
        if (!roomDetailsMap[booking.room]) {
          const { data: roomData } = await useGetRoomDetailsQuery(booking.room);
          roomDetailsMap[booking.room] = roomData?.room?.name || 'Unknown Room';
        }
        if (!userDetailsMap[booking.user]) {
          const { data: userData } = await useGetUserDetailsQuery(booking.user);
          userDetailsMap[booking.user] = userData?.user?.name || 'Unknown User';
        }
      }
      setRoomDetails(roomDetailsMap);
      setUserDetails(userDetailsMap);
    };
    
    fetchDetails();
  }, [bookingsData]);

  // Fetch today's bookings
  useEffect(() => {
    const todaysBookingsList = bookingsData?.bookings.filter(booking => new Date(booking.to).toDateString() === new Date().toDateString()) || [];
    setTodaysBookings(todaysBookingsList);
    setShowModal(todaysBookingsList.length > 0);
  }, [bookingsData]);

  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Summary Information */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Total Rooms</h2>
          <p className="text-gray-600 text-4xl">{totalRooms}</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Total Users</h2>
          <p className="text-gray-600 text-4xl">{totalUsers}</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Total Reservations</h2>
          <p className="text-gray-600 text-4xl">{totalReservations}</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold mb-2">Total Billings</h2>
          <p className="text-gray-600 text-4xl">{totalBillings.toFixed(2)} BDT</p>
        </div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        {/* Bookings Per Day */}
        <div className="bg-white p-6 shadow-lg rounded-lg md:col-span-2 lg:col-span-2">
          <div className="relative h-96">
            <Bar data={bookingBarData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Bookings Per Day' } } }} />
          </div>
        </div>

        {/* Cumulative Billing Per Day */}
        <div className="bg-white p-6 shadow-lg rounded-lg md:col-span-2 lg:col-span-2">
          <div className="relative h-96">
            <Line data={billingLineData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Cumulative Billing Per Day' } } }} />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="relative h-96">
            <Pie data={paymentMethodPieData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Payment Methods' } } }} />
          </div>
        </div>

        {/* New Users Per Day */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="relative h-96">
            <Line data={userCountLineData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'New Users Per Day' } } }} />
          </div>
        </div>

        {/* Available Rooms */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="relative h-96">
            <Doughnut data={availableRoomsData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Room Availability' } } }} />
          </div>
        </div>
      </div>

      {/* Today's Bookings Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-lg w-11/12 md:w-1/2">
            <h3 className="text-xl font-bold mb-4">Today's Check Out Guest</h3>
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  {/* <th className="border p-2">Booking ID</th> */}
                  <th className="border p-2">Room Name</th>
                  <th className="border p-2">User Name</th>
                  <th className="border p-2">From</th>
                  <th className="border p-2">To</th>
                </tr>
              </thead>
              <tbody>
                {todaysBookings.map((booking) => (
                  <tr key={booking._id}>
                    {/* <td className="border p-2">{booking._id}</td> */}
                    <td className="border p-2">{getRoomNumber(booking.room)|| 'Loading...'}</td>
                    <td className="border p-2">{getGuestName(booking.user) || 'Loading...'}</td>
                    <td className="border p-2">{new Date(booking.from).toLocaleDateString()}</td>
                    <td className="border p-2">{new Date(booking.to).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded" onClick={closeModal}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
