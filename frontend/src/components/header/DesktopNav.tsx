import React, { useState } from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Mehedi from "../../assets/home/mehedi.png";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

interface Props {
  menuItems: string[];
  role: string;
}

const DesktopNav = ({ menuItems, role }: Props) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const handleLogOut = () => {
    logout();
    navigate("/");
  };

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="h-16 sticky top-0 left-0 right-0 z-50 bg-white shadow-md flex justify-between items-center px-6 lg:px-12">
      <Link to="/" className="text-2xl font-medium">
        Ascillia
      </Link>

      <ul className="flex gap-7">
        {menuItems?.map((item, index) => (
          <li key={index}>
            <Link
              to={role + item}
              className="font-medium capitalize hover:font-bold"
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleIsOpen}
          className="relative w-9 h-9 rounded-full overflow-hidden focus:outline-none"
        >
          <img
            className="absolute inset-0 w-full h-full object-cover rounded-full"
            src={Mehedi}
            alt=""
          />
        </button>
        {isOpen && (
          <ul className="absolute top-12 right-2 z-50 bg-white border border-slate-200 rounded-md shadow-lg w-48">
            <li
              onClick={() => {
                navigate(`${role}profile/1`)
                setIsOpen(false)
              }}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              View Profile
            </li>
            {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
              Change Password
            </li> */}
            <li
              onClick={handleLogOut}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              Log Out
            </li>
          </ul>
        )}
      </div>
    </div>
  );
};

export default DesktopNav;
