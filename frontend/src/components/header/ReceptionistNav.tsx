import React, { useState } from "react";
import DesktopNav from "./DesktopNav";
import MobileNav from "./MobileNav";

const ReceptionistNavbar = () => {

    const [hideLeft, setHideLeft] = useState("-left-[-1000px]");
    const menuItems = ["bookings","rooms", "users"];
  
    const onOpen = () => {
      setHideLeft("-left-0");
    };
    const onClose = () => {
      setHideLeft("-left-[-1000px]");
    };
    return (
      <>
        <div className="max-[900px]:hidden">
          <DesktopNav menuItems={menuItems} role="/reception/" />
        </div>
        <div className="min-[900px]:hidden">
          <MobileNav 
          menuItems={menuItems}
          role="/reception/"
          onClose={onClose}
          onOpen={onOpen}
          hideLeft={hideLeft}
          />
        </div>
      </>
    );
  };

export default ReceptionistNavbar