import React, { useState, useEffect } from 'react';
import { Bar, Line, Pie, Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import 'tailwindcss/tailwind.css';
import { useGetRoomsQuery } from '../../slices/roomsApiSlice';
import { useGetBookingsQuery } from '../../slices/bookingsApiSlice';
import { useGetBillingsQuery } from '../../slices/billingsApiSlice';
import { useGetUsersQuery } from '../../slices/usersApiSlice';

ChartJS.register(CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, ArcElement);

const AdminDashboard = () => {
  const [showModal, setShowModal] = useState(false);
  const [todaysBookings, setTodaysBookings] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear()); // State for selected year

  const { data: roomsData } = useGetRoomsQuery();
  const { data: bookingsData } = useGetBookingsQuery();
  const { data: billingsData } = useGetBillingsQuery();
  const { data: usersData } = useGetUsersQuery();

  // Summary Information
  const totalRooms = roomsData?.rooms.length || 0;
  const totalUsers = usersData?.users.length || 0;

  // Filter Data Based on Selected Month and Year
  const filterByMonthAndYear = (data, dateField) => {
    return data.filter((item) => {
      const date = new Date(item[dateField]);
      return date.getMonth() === selectedMonth && date.getFullYear() === selectedYear;
    });
  };

  const filteredBookings = filterByMonthAndYear(bookingsData?.bookings || [], 'createdAt');
  const filteredBillings = filterByMonthAndYear(billingsData?.billings || [], 'createdAt');
  const filteredUsers = filterByMonthAndYear(usersData?.users || [], 'createdAt');

  const totalReservations = filteredBookings.length;
  const totalBillings = filteredBillings.reduce((sum, billing) => sum + billing.amount, 0);
  const getGuestName = (user_id: string): string => {
    const user = usersData?.users.find((user: User) => user._id === user_id);
    return user ? user.name : "Unknown Guest";
  };

  const getRoomNumber = (room_id: string): string => {
    const room = roomsData?.rooms.find((room: Room) => room._id === room_id);
    return room ? room.roomNumber.toString() : "Unknown Room";
  };
  // Process Data for Charts
  const processChartData = (data, dateField) => {
    return data.reduce((acc, item) => {
      const date = new Date(item[dateField]).toLocaleDateString();
      acc[date] = (acc[date] || 0) + (item.amount || 1); // Increment count or sum amount
      return acc;
    }, {});
  };

  const bookingsPerDay = processChartData(filteredBookings, 'createdAt');
  const billingPerDay = processChartData(filteredBillings, 'createdAt');

  const billingMethods = filteredBillings.reduce(
    (acc, { paymentMethod }) => ({ ...acc, [paymentMethod]: (acc[paymentMethod] || 0) + 1 }),
    { Bkash: 0, Nagad: 0, Rocket: 0 }
  );

  const userCountsPerDay = processChartData(filteredUsers, 'createdAt');

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

  // Fetch today's bookings
  useEffect(() => {
    const todaysBookingsList = bookingsData?.bookings.filter(
      (booking) => new Date(booking.to).toDateString() === new Date().toDateString() && booking.status === 'Confirmed'
    ) || [];
    setTodaysBookings(todaysBookingsList);
    setShowModal(false);
  }, [bookingsData]);

  const closeModal = () => setShowModal(false);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Month and Year Selection */}
      <div className="flex justify-end mb-4 space-x-4">
        {/* Month Dropdown */}
        <select
          className="border p-2 rounded"
          value={selectedMonth}
          onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
        >
          {Array.from({ length: 12 }, (_, i) => (
            <option key={i} value={i}>
              {new Date(0, i).toLocaleString('default', { month: 'long' })}
            </option>
          ))}
        </select>

        {/* Year Dropdown */}
        <select
          className="border p-2 rounded"
          value={selectedYear}
          onChange={(e) => setSelectedYear(parseInt(e.target.value))}
        >
          {Array.from({ length: 3 }, (_, i) => {
            const year = new Date().getFullYear() - i;
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>
      <button onClick={()=>setShowModal(true)} className='bg-blue-500 text-white rounded my-2 hover:bg-blue-600 px-3 py-2'>Today's Leaves</button>
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8 mb-8">
        {/* Bookings Per Day */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="relative h-96">
            <Bar data={bookingBarData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Bookings Per Day' } } }} />
          </div>
        </div>

        {/* Cumulative Billing Per Day */}
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <div className="relative h-96">
            <Line data={billingLineData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Cumulative Billing Per Day' } } }} />
          </div>
        </div>

        {/* Payment Methods Pie Chart */}
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
            <Doughnut data={availableRoomsData} options={{ responsive: true, plugins: { legend: { position: 'top' }, title: { display: true, text: 'Available vs. Occupied Rooms' } } }} />
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
              
                  <th className="border p-2">Room Name</th>
                  <th className="border p-2">User Name</th>
                  <th className="border p-2">From</th>
                  <th className="border p-2">To</th>
                </tr>
              </thead>
              <tbody>
                {todaysBookings.map((booking) => (
                  <tr key={booking._id}>
                 
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
