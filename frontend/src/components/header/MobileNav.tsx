import React from "react";
import { Link } from "react-router-dom";
import { HiBars3BottomRight } from "react-icons/hi2";
import { RiCloseCircleLine } from "react-icons/ri";

const MobileNav = ({ menuItems, onClose, onOpen, hideLeft }) => {
  return (
    <div className="h-16 flex justify-between items-center px-6 lg:px-12">
      <a href="/">myWebsite</a>
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
                <Link to={item} className="font-medium capitalize text-secondary text-2xl">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNav;
