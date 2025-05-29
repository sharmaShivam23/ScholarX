import React, { useEffect, useState } from "react";
import Shadowbtn from "../cores/Homepage/Shadowbtn";
import { NavbarLinks } from "../Data/Navbar-links";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../cores/Homepage/Auth/ProfileDropDown";
import { apiConnect } from "../../services/apiconnect";
import { categories } from "../../services/apis";
import { sendOTP } from "../../services/apis";
import toast from "react-hot-toast";
// import { useSelector } from "react-redux";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [hoverList, setHoverList] = useState(false);

  const [selectedNav, setSelectedNav] = useState("");
  console.log(selectedNav);

  const [subLinks, setSubLinks] = useState([]);

  const fetchSubmit = async () => {
    try {
      const result = await apiConnect("GET", categories.CATEGORIES_API);
      console.log(result);
      setSubLinks(result.data.response);
    } catch (error) {
      console.log(error);
      // toast.error(error.response.data.message)
    }
  };

  useEffect(() => {
    fetchSubmit();
  }, []);

  return (
    <div className="flex justify-around fixed w-full  top-0 z-[100] gap-8 items-center h-[8vh] text-[#DBDDEA] border-b-4  border-[#2C333F] bg-[#161D29]">
      <div className="nav  flex justify-center items-center gap-3 font-[600] text-xl">
        <div className="icon">$</div>
        <div className="txt">ScholarX</div>
      </div>

      <div className="options sm:block  hidden">
        <ul className=" flex justify-center  items-center gap-7 font-[600] ">
          {NavbarLinks.map((item, index) => (
            <li
              key={index}
              onClick={() => setSelectedNav(item)}
              className={`${
                selectedNav == item ? "text-[#FFD60A]" : "text-[#DBDDEA]"
              } cursor-pointer flex gap-2`}
            >
              {item.title === "Catalog" ? (
                <div
                  className="relative"
                  onMouseEnter={() => setHoverList(true)}
                  onMouseLeave={() => setHoverList(false)}
                >
                  <p className="cursor-pointer">{item.title}</p>

                  {hoverList && (
                    <div className="z-50 absolute top-10">
                      <div className="list h-auto w-[200px] text-black p-4 bg-white rounded-md shadow-lg">
                        {subLinks.length === 0 ? (
                          <div className="flex justify-center items-center text-black text-md font-semibold">
                            No Course found
                          </div>
                        ) : (
                          subLinks.map((item, index) => (
                            <p
                              key={index}
                              className="text-black font-semibold text-xl px-5 mt-4 p-2 hover:bg-yellow-500 cursor-pointer"
                            >
                              {item.name}
                            </p>
                          ))
                        )}
                      </div>
                      <div className="rec h-[20px] w-[20px] bg-white rotate-45 absolute -top-2.5 left-[34%]"></div>
                    </div>
                  )}
                </div>
              ) : (
                <Link to={item.path}>{item.title}</Link>
              )}

              <div className="mt-1 text-[#DBDDEA]">{item.icon}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="btns sm:flex hidden justify-center items-center gap-10">
        {user && user?.accountType != "Instructor" && (
          <Link to="/dashboard/cart" className="relative">
            <AiOutlineShoppingCart />
            {totalItems > 0 && <span>{totalItems}</span>}
          </Link>
        )}
        {token == null ? (
          <>
            <Link to="/signup">
              {" "}
              <Shadowbtn text="Sign up" />
            </Link>
            <Link to="/login">
              {" "}
              <Shadowbtn text="Log in" />
            </Link>
          </>
        ) : (
          <ProfileDropDown />
        )}
      </div>
    </div>
  );
};

export default Navbar;
{
  /* <IoIosArrowDown className="mt-1 text-[#DBDDEA]"/> */
}
