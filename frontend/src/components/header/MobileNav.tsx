import React from "react";
import { Link } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RiCloseCircleLine } from "react-icons/ri";
interface Props {
  menuItems: string[];
  role:string;
  onClose: () => void;
  onOpen: () => void;
  hideLeft: string;
}

const MobileNav = ({ menuItems,role, onClose, onOpen, hideLeft }: Props) => {
  return (
    <div className="h-16 flex justify-between items-center px-6 lg:px-12">
      <Link to="/" className="texl-2xl font-medium">Ascillia</Link>
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
                  to={role+item}
                  className="font-medium capitalize text-secondary text-xl"
                >
                  {item}
                </Link>
              </li>
            ))}
            <li className="font-medium bg-secondary  hover:bg-slate-950 transition-all ease-in rounded-full text-primary text-xl px-4 py-2 mt-5">
              <Link to="/login">Log In</Link>
            </li>
            <li className="font-medium bg-red-600  hover:bg-red-700 transition-all ease-in rounded-full text-primary text-xl px-4 py-2">
              Book Now
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
