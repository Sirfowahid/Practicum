import React from "react";
import { Link } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RiCloseCircleLine } from "react-icons/ri";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { logout } from "../../slices/authSlice";
import { useLogoutMutation } from "../../slices/usersApiSlice";
import { useDispatch,useSelector } from "react-redux";
import { toast } from "react-toastify";

interface Props {
  menuItems: string[];
  role: string;
  onClose: () => void;
  onOpen: () => void;
  hideLeft: string;
}

const MobileNav = ({ menuItems, role, onClose, onOpen, hideLeft }: Props) => {
  const { logout:LogOut } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const [logoutMutation]= useLogoutMutation()
  const handleLogOut = async () => {
    try {
      await logoutMutation({}).unwrap()
      dispatch(logout({}))
      toast.success("User Logout")
      navigate("/")
    } catch (error) {
      
    }
    LogOut();
    navigate("/");
  };
  return (
    <div className="h-16 flex justify-between items-center px-6 lg:px-12">
      <Link to="/" className="texl-2xl font-medium">
        Ascillia
      </Link>
      <button onClick={onOpen} className="border border-primary rounded">
        <HiBars3BottomRight className="w-7 h-7" />
      </button>
      <div
        className={`transition-all w-full h-full fixed bg-primary z-20 top-0 ${hideLeft} flex justify-center items-center`}
      >
        <button onClick={onClose} className="absolute right-8 top-32">
          <RiCloseCircleLine className="w-7 h-7" />
        </button>

        <div className="w-full h-full flex justify-center items-center">
          <ul className="flex flex-col justify-center items-center gap-5">
            {menuItems?.map((item, index) => (
              <li key={index}>
                <Link
                  onClick={onClose}
                  to={role + item}
                  className={`font-medium capitalize text-secondary text-xl ${hideLeft}`}
                >
                  {item}
                </Link>
              </li>
            ))}
            <li
              onClick={handleLogOut}
              className="font-medium bg-secondary  hover:bg-slate-950 transition-all ease-in rounded-full text-primary text-xl px-4 py-2 mt-5"
            >
              <Link to="/login">Log Out</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
