// AdminDashboard.tsx

import React from 'react';
import { FaClipboardList, FaBed, FaUsers } from 'react-icons/fa';
import { Bar, Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Import PointElement
  Title,
  Tooltip,
  Legend,
  ChartOptions
} from 'chart.js';
import 'tailwindcss/tailwind.css';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement, // Register PointElement
  Title,
  Tooltip,
  Legend
);

const AdminDashboard = () => {
  const barChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Reservations',
        data: [50, 60, 70, 180, 190, 200, 250, 325, 280, 390, 400, 600],
        backgroundColor: 'rgba(59, 130, 246, 0.6)',
      },
    ],
  };

  const lineChartData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun','Jul','Aug','Sep','Oct','Nov','Dec'],
    datasets: [
      {
        label: 'Occupancy Rate (%)',
        data: [65, 68, 70, 72, 75, 78, 80, 82, 80, 75, 73, 70],
        fill: false,
        borderColor: 'rgba(255, 99, 132, 0.6)',
        tension: 0.4,
      },
    ],
  };

  const options: ChartOptions<'bar'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Reservations',
      },
    },
  };

  const lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Occupancy Rate',
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <FaClipboardList className="text-blue-500 text-3xl mb-4" />
          <h2 className="text-2xl font-bold mb-2">Reservations</h2>
          <p className="text-gray-600 text-4xl">120</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <FaBed className="text-green-500 text-3xl mb-4" />
          <h2 className="text-2xl font-bold mb-2">Available Rooms</h2>
          <p className="text-gray-600 text-4xl">30</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <FaUsers className="text-yellow-500 text-3xl mb-4" />
          <h2 className="text-2xl font-bold mb-2">Total Customers</h2>
          <p className="text-gray-600 text-4xl">450</p>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg">
          <FaUsers className="text-red-500 text-3xl mb-4" />
          <h2 className="text-2xl font-bold mb-2">Occupancy Rate</h2>
          <p className="text-gray-600 text-4xl">75%</p>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
        <div className="bg-white p-6 shadow-lg rounded-lg md:col-span-2 lg:col-span-2">
          <div className="relative h-96">
            <Bar data={barChartData} options={options} />
          </div>
        </div>
        <div className="bg-white p-6 shadow-lg rounded-lg md:col-span-2 lg:col-span-2">
          <div className="relative h-96">
            <Line data={lineChartData} options={lineChartOptions} />
          </div>
        </div>
      </div>
      <div className="bg-white p-6 shadow-lg rounded-lg">
        <h2 className="text-2xl font-bold mb-4">Recent Activity</h2>
        <ul className="divide-y divide-gray-200">
          <li className="py-4 flex justify-between">
            <p className="text-gray-800"><strong>John Doe</strong> booked a room</p>
            <p className="text-gray-600 text-sm">2 hours ago</p>
          </li>
          <li className="py-4 flex justify-between">
            <p className="text-gray-800"><strong>Jane Smith</strong> checked out</p>
            <p className="text-gray-600 text-sm">3 hours ago</p>
          </li>
          <li className="py-4 flex justify-between">
            <p className="text-gray-800"><strong>Michael Johnson</strong> requested a room upgrade</p>
            <p className="text-gray-600 text-sm">5 hours ago</p>
          </li>
          <li className="py-4 flex justify-between">
            <p className="text-gray-800"><strong>Emily Davis</strong> canceled a reservation</p>
            <p className="text-gray-600 text-sm">1 day ago</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default AdminDashboard;
