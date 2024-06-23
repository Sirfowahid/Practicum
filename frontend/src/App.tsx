import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useAuth } from './context/AuthContext';
import AdminNavbar from './components/header/AdminNavbar';
import UserNavbar from './components/header/UserNavbar';
import Login from './pages/Login';
import Dashboard from './pages/admin/Dashboard';
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
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <>
          {role === 'admin' ? <AdminNavbar /> : <UserNavbar />}
          <Routes>
            {role === 'admin' && (
              <Route path="/admin/dashboard" element={<Dashboard />} />
            )}
            {role === 'user' && (
              <>
                <Route index={true} element={<UserHome />} />
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/user/rooms" element={<UserRooms />} />
                <Route path="/user/rooms/:id" element={<UserRoomDetails />} />
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
