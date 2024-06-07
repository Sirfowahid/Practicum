import React, { useState } from 'react'
import DesktopNav from './DesktopNav'
const Header = () => {
    const [hideLeft,setHideLeft] = useState("-left-[-1000px")
    const menuItems = ["hotel","features","about","contact"]

    const onOpen = () => {
        setHideLeft("left-0")
    }
    const onClose = () => {
        setHideLeft("-left-[-1000px")
    }
  return (
    <>
    <div className='max-[900px]:hidden'><DesktopNav menuItems={menuItems}/></div>
    <div className='min-[900px]:hidden'>Mobile</div>
    </>
  )
}

export default Header