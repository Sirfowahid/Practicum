import React from "react";
import { Link } from "react-router-dom";

interface Props {
  menuItems: string[];
}

const DesktopNav = ({ menuItems }: Props) => {
  return (
    <div className="h-16 sticky flex justify-between items-center px-6 lg:px-12">
      <a className="font-bold text-xl" href="/">
        Ascillia
      </a>
      <ul className="flex gap-7">
        {menuItems?.map((item, index) => (
          <li key={index}>
            <Link to={item} className="font-medium capitalize">{item}</Link>
          </li>
        ))}
      </ul>
      <ul className="flex item-center gap-4 font-medium">
        <li>
            <button className="text-secondary px-4 py-2 rounded">Log In</button>
        </li>
        <li className="bg-red-600 rounded-full">
            <button className="text-primary font-medium px-4 py-2 rounded">Book Now</button>
        </li>
      </ul>
    </div>
  );
};

export default DesktopNav;
