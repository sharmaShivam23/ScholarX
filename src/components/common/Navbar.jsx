import React, { useState } from "react";
import Shadowbtn from "../cores/Homepage/Shadowbtn";
import { NavbarLinks } from "../Data/Navbar-links";
import { Link } from "react-router-dom";

const Navbar = () => {
 const [selectedNav ,setSelectedNav]= useState('')
 console.log(selectedNav);
 
 
  return (
    <div className="flex justify-around sticky top-0 z-[100] gap-8 items-center h-[8vh] text-[#DBDDEA] border-b-4  border-[#2C333F] bg-[#161D29]">
      <div className="nav  flex justify-center items-center gap-3 font-[600] text-xl">
        <div className="icon">$</div>
        <div className="txt">ScholarX</div>
      </div>

      <div className="options sm:block  hidden">
        <ul className=" flex justify-center  items-center gap-7 font-[600] ">
          {NavbarLinks.map((item, index) => (
            <Link to={item.path}>
            <li
              key={index}
              onClick={() => setSelectedNav(item)}
              className={`${
                selectedNav == item ? "text-[#FFD60A]" : "text-[#DBDDEA]"
              } cursor-pointer flex gap-2`}
            >
              {item.title}
              <div className="mt-1 text-[#DBDDEA]">{item.icon}</div>
            </li>
            </Link>
          ))}
        </ul>
      </div>
      <div className="btns sm:flex hidden justify-center items-center gap-10">
       <Link to="/login"> <Shadowbtn text="Log in" /></Link>
       <Link to="/signup"> <Shadowbtn text="Sign up" /></Link>
      </div>
    </div>
  );
};

export default Navbar;
{
  /* <IoIosArrowDown className="mt-1 text-[#DBDDEA]"/> */
}
