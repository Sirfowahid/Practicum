import React from 'react';
import Mehedi from '../../assets/home/mehedi.png';

const UserProfile = () => {
  // Mock user data (replace with actual fixed values)
  const currentUser = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '123-456-7890',
    address: '123 Main St, City, Country',
    createdAt: '2022-01-01', // Assuming this is a string representation of the date
    avatar: Mehedi, // URL to the user's avatar image
  };

  // Mock booking history data
  const bookingHistory = [
    { id: 1, room: 'Deluxe Room', checkIn: '2024-07-01', checkOut: '2024-07-05', amount: 5000 },
    { id: 2, room: 'Standard Room', checkIn: '2024-06-15', checkOut: '2024-06-18', amount: 3000 },
    { id: 3, room: 'Suite Room', checkIn: '2024-05-20', checkOut: '2024-05-25', amount: 8000 },
    { id: 4, room: 'Executive Suite', checkIn: '2024-07-10', checkOut: '2024-07-15', amount: 10000 },
    { id: 5, room: 'Double Room', checkIn: '2024-06-01', checkOut: '2024-06-05', amount: 4000 },
    { id: 6, room: 'Single Room', checkIn: '2024-05-15', checkOut: '2024-05-18', amount: 2500 },
    { id: 7, room: 'Family Suite', checkIn: '2024-04-20', checkOut: '2024-04-25', amount: 9000 },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-4xl w-full bg-white p-8 rounded shadow-md">
        <div className="flex flex-col md:flex-row items-start">
          <div className="md:w-1/3 mb-8 md:mb-0 flex justify-center md:justify-start">
            <img src={currentUser.avatar} alt="User Avatar" className="rounded-full h-40 w-40 mx-auto md:mx-0 md:mr-4 mb-4 md:mb-0" />
          </div>
          <div className="md:w-2/3">
            <h1 className='font-bold text-3xl text-center md:text-left text-slate-700 my-4'>{currentUser.name}</h1>
            <div className="text-center md:text-left my-4">
              <p className="text-gray-600"><span className="font-bold">Email:</span> {currentUser.email}</p>
              <p className="text-gray-600"><span className="font-bold">Phone:</span> {currentUser.phone}</p>
              <p className="text-gray-600"><span className="font-bold">Address:</span> {currentUser.address}</p>
              <p className="text-gray-600"><span className="font-bold">Joined:</span> {new Date(currentUser.createdAt).toLocaleDateString()}</p>
            </div>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-center border-black text-2xl pb-2 font-medium border-b-2 md:text-left text-gray-600">Booking History</h3>
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {bookingHistory.map(booking => (
              <div key={booking.id} className="border border-gray-300 rounded-md p-4">
                <h4 className="text-lg font-bold">{booking.room}</h4>
                <p className="text-gray-600">Check-in: {new Date(booking.checkIn).toLocaleDateString()}</p>
                <p className="text-gray-600">Check-out: {new Date(booking.checkOut).toLocaleDateString()}</p>
                <p className="text-gray-600">Amount: ${booking.amount}</p>
              </div>
            ))}
            {bookingHistory.length === 0 && (
              <p className="text-center text-gray-600">No booking history available</p>
            )}
          </div>
        </div>
        {/* Example: Edit Profile Link */}
        <div className="mt-8 text-center md:text-left">
          <a href="/user/edit" className="text-blue-500 hover:underline">Edit Profile</a>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
