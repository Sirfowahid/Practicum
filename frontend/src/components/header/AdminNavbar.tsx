import React, { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";
const AdminNavbar = () => {
    const [hideLeft, setHideLeft] = useState("-left-[-1000px]");
    const menuItems = ["dashboard","rooms", "bookings",  "users"];
  
    const onOpen = () => {
      setHideLeft("-left-0");
    };
    const onClose = () => {
      setHideLeft("-left-[-1000px]");
    };
    return (
      <>
        <div className="max-[900px]:hidden">
          <DesktopNav menuItems={menuItems} role="/admin/" />
        </div>
        <div className="min-[900px]:hidden">
          <MobileNav 
          menuItems={menuItems}
          role="/admin/"
          onClose={onClose}
          onOpen={onOpen}
          hideLeft={hideLeft}
          />
        </div>
      </>
    );
  };

export default AdminNavbar