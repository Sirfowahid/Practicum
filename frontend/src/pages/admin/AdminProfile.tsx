import React from 'react';
import { useParams } from 'react-router-dom';
import Mehedi from '../../assets/home/mehedi.png';

const AdminProfile = () => {
  const { adminId } = useParams();

  
  const adminData = {
    name: 'Admin Name',
    email: 'admin@example.com',
    phone: '123-456-7890',
    address: '456 Admin St, City, Country',
    joined: '2020-01-15',
    avatar: Mehedi, // URL to the admin's avatar image
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-4xl bg-white p-8 rounded-lg shadow-md">
        <div className="flex flex-col lg:flex-row items-center lg:items-start">
          <img
            src={adminData.avatar}
            alt="Admin Avatar"
            className="rounded-full h-32 w-32 lg:h-48 lg:w-48 mb-4 lg:mb-0 lg:mr-8 shadow-lg"
          />
          <div className="text-center lg:text-left">
            <h1 className="text-3xl font-bold text-slate-700">{adminData.name}</h1>
            <p className="text-gray-600">{adminData.email}</p>
            <p className="text-gray-600">{adminData.phone}</p>
            <p className="text-gray-600">{adminData.address}</p>
            <p className="text-gray-600">Joined on: {new Date(adminData.joined).toLocaleDateString()}</p>
          </div>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-center lg:text-left">Admin Details</h3>
          <div className="mt-4">
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <span className="font-bold">Email:</span>
              <span>{adminData.email}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <span className="font-bold">Phone:</span>
              <span>{adminData.phone}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <span className="font-bold">Address:</span>
              <span>{adminData.address}</span>
            </div>
            <div className="flex justify-between items-center border-b border-gray-300 py-2">
              <span className="font-bold">Joined:</span>
              <span>{new Date(adminData.joined).toLocaleDateString()}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
