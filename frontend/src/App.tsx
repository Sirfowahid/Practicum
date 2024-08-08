import React from "react";
import { Routes, Route } from "react-router-dom";
import { useAuth } from "./context/AuthContext";
import AdminNavbar from "./components/header/AdminNavbar";
import UserNavbar from "./components/header/UserNavbar";
import ReceptionistNavbar from "./components/header/ReceptionistNav";
import Footer from "./components/footer/Footer";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";

import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminRoomDetails from "./pages/admin/AdminRoomDetails";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserProfile from "./pages/admin/AdminUserProfile";
import AdminAddRoom from "./pages/admin/AdminAddRoom";
import AdminUpdateRoom from "./pages/admin/AdminUpdateRoom";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminBookingDetails from "./pages/admin/AdminBookingDetails";
import AdminAddAdmin from "./pages/admin/AdminAddAdmin";
import AdminEditUser from "./pages/admin/AdminEditUser";

import UserHome from "./pages/user/UserHome";
import UserRooms from "./pages/user/UserRooms";
import UserRoomDetails from "./pages/user/UserRoomDetails";
import UserServices from "./pages/user/UserServices";
import UserContact from "./pages/user/UserContact";
import UserProfile from "./pages/user/UserProfile";
import UserBookingInformation from "./pages/user/UserBookingInformation";
import UserBilling from "./pages/user/UserBilling";

import RecepBookings from "./pages/receptionist/RecepBookings";
import RecepRooms from "./pages/receptionist/RecepRooms";
import RecepBills from "./pages/receptionist/RecepBills";
import RecepUsers from "./pages/receptionist/RecepUsers";

import DebugRooms from "./debug/DebugRooms";
import DebugUsers from "./debug/DebugUsers";
import DebugBookings from "./debug/DebugBookings";
import DebugBillings from "./debug/DebugBillings";

const App: React.FC = () => {
  const { isAuthenticated, role } = useAuth();

  return (
    <>
      {!isAuthenticated ? (
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/debug/rooms" element={<DebugRooms />} />
          <Route path="/debug/users" element={<DebugUsers />} />
          <Route path="/debug/bookings" element={<DebugBookings />} />
          <Route path="/debug/billings" element={<DebugBillings />} />
        </Routes>
      ) : (
        <>
          {role === "admin" ? (
            <AdminNavbar />
          ) : role === "reception" ? (
            <ReceptionistNavbar />
          ) : (
            <UserNavbar />
          )}
          <Routes>
            {role === "admin" && (
              <>
                <Route index={true} element={<AdminDashboard />} />
                <Route path="/admin/dashboard" element={<AdminDashboard />} />
                <Route path="/admin/bookings" element={<AdminBookings />} />
                <Route
                  path="/admin/bookings/:bookingId"
                  element={<AdminBookingDetails />}
                />
                <Route path="/admin/rooms" element={<AdminRooms />} />
                <Route
                  path="/admin/rooms/:roomId"
                  element={<AdminRoomDetails />}
                />
                <Route path="/admin/addroom" element={<AdminAddRoom />} />
                <Route
                  path="/admin/updateroom/:roomId"
                  element={<AdminUpdateRoom />}
                />
                <Route path="/admin/users" element={<AdminUsers />} />
                <Route
                  path="/admin/users/userprofile/:userId"
                  element={<AdminUserProfile />}
                />
                <Route
                  path="/admin/profile/:adminId"
                  element={<AdminProfile />}
                />
                <Route
                  path="/admin/users/addadmin"
                  element={<AdminAddAdmin />}
                />
                <Route
                  path="/admin/users/updateuser/:userId"
                  element={<AdminEditUser />}
                />
              </>
            )}
            {role === "reception" && (
              <>
                <Route index={true} element={<RecepBookings />} />
                <Route path="/reception/bookings" element={<RecepBookings />} />
                <Route path="/reception/rooms" element={<RecepRooms />} />
                <Route path="/reception/bills" element={<RecepBills />} />
                <Route path="/reception/users" element={<RecepUsers />} />
              </>
            )}
            {role === "user" && (
              <>
                <Route index={true} element={<UserHome />} />
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/user/rooms" element={<UserRooms />} />
                <Route
                  path="/user/rooms/:roomId"
                  element={<UserRoomDetails />}
                />
                <Route path="/user/services" element={<UserServices />} />
                <Route path="/user/contact" element={<UserContact />} />
                <Route
                  path="/user/info/:roomId"
                  element={<UserBookingInformation />}
                />
                <Route path="/user/billing/:roomId" element={<UserBilling />} />
                <Route path="/user/profile/:userId" element={<UserProfile />} />
              </>
            )}
          </Routes>
          <Footer />
        </>
      )}
    </>
  );
};

export default App;
