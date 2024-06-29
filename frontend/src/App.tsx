import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminNavbar from './components/header/AdminNavbar';
import UserNavbar from './components/header/UserNavbar';
import Footer from './components/footer/Footer';
import Login from './pages/Login';
import SignUp from './pages/SignUp';

import AdminDashboard from './pages/admin/AdminDashboard';
import AdminBookings from './pages/admin/AdminBookings';
import AdminRooms from './pages/admin/AdminRooms';
import AdminRoomDetails from './pages/admin/AdminRoomDetails';
import AdminUsers from './pages/admin/AdminUsers';
import AdminUserProfile from './pages/admin/AdminUserProfile';
import AdminAddRoom from './pages/admin/AdminAddRoom';
import AdminUpdateRoom from './pages/admin/AdminUpdateRoom';
import AdminProfile from './pages/admin/AdminProfile';
import AdminBookingDetails from './pages/admin/AdminBookingDetails';

import UserHome from './pages/user/UserHome';
import UserRooms from './pages/user/UserRooms';
import UserRoomDetails from './pages/user/UserRoomDetails';
import UserServices from './pages/user/UserServices';
import UserContact from './pages/user/UserContact';
import UserProfile from './pages/user/UserProfile';
import UserInformation from './pages/user/UserInformation';
import UserBilling from './pages/user/UserBilling';

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
              <Route path="/admin/bookings/:bookingId" element={<AdminBookingDetails />} />
              <Route path="/admin/rooms" element={<AdminRooms />} />
              <Route path="/admin/rooms/:roomId" element={<AdminRoomDetails />} />
              <Route path="/admin/addroom" element={<AdminAddRoom />} />
              <Route path="/admin/updateroom/:roomId" element={<AdminUpdateRoom />} />
              <Route path="/admin/users" element={<AdminUsers />} />
              <Route path="/admin/users/userprofile/:userId" element={<AdminUserProfile />} />
              <Route path="/admin/profile/:adminId" element={<AdminProfile/>}/>
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
                <Route path="/user/info" element={<UserInformation />} />
                <Route path="/user/billing" element={<UserBilling />} />
                <Route path="/user/profile/:userId" element={<UserProfile />} />
              </>
            )}
          </Routes>
            <Footer/>
        </>
      )}
    </>
  );
};

export default App;
