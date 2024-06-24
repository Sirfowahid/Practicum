import React from "react";
import { Link } from "react-router-dom";
import Button from "../ui/Button";
import Mehedi from "../../assets/home/mehedi.png";
interface Props {
  menuItems: string[];
  role: string;
}

const DesktopNav = ({ menuItems, role }: Props) => {
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
        <li className="font-medium border-slate-600 border-4 rounded-full">
          <img className="w-9 h-9 rounded-full" src={Mehedi} alt="" />
        </li>
      </ul>
    </div>
  );
};

export default DesktopNav;
