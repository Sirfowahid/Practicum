import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminNavbar from './components/header/AdminNavbar';
import UserNavbar from './components/header/UserNavbar';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBookings from './pages/admin/AdminBookings';
import AdminRooms from './pages/admin/AdminRooms';
import AdminUsers from './pages/admin/AdminUsers';

import UserHome from './pages/user/UserHome';
import UserRooms from './pages/user/UserRooms';
import UserRoomDetails from './pages/user/UserRoomDetails';
import UserServices from './pages/user/UserServices';
import UserContact from './pages/user/UserContact';

const App: React.FC = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      ) : (
        <>
          {role === 'admin' ? <AdminNavbar /> : <UserNavbar />}
          <Routes>
            {role === 'admin' && (
              <>
              <Route index={true} element={<AdminDashboard />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/bookings" element={<AdminBookings />} />
              <Route path="/admin/rooms" element={<AdminRooms />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              </>
            )}
            {role === 'user' && (
              <>
                <Route index={true} element={<UserHome />} />
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/user/rooms" element={<UserRooms />} />
                <Route path="/user/rooms/:roomId" element={<UserRoomDetails />} />
                <Route path="/user/services" element={<UserServices />} />
                <Route path="/user/contact" element={<UserContact />} />
              </>
            )}
          </Routes>
        </>
      )}
    </>
  );
};

export default App;
