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
    <div className="h-16 sticky flex justify-between items-center px-6 lg:px-12">
      <Link to="/" className="texl-2xl font-medium">
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
      <ul className="flex item-center gap-4 font-medium">
        <li
          onClick={toggleIsOpen}
          className="font-medium border-slate-600 border-4 rounded-full"
        >
          <img className="w-9 h-9 rounded-full" src={Mehedi} alt="" />
        </li>
      </ul>
      {isOpen && (
        <ul className="absolute top-12 right-2 bg-white border border-slate-200 rounded-md shadow-lg w-48">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            View Profile
          </li>
          {/* <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Change Password
          </li> */}
          <li onClick={handleLogOut} className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
            Log Out
          </li>
        </ul>
      )}
    </div>
  );
};

export default DesktopNav;
