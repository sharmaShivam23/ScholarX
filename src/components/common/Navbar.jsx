// import React, { useEffect, useState } from "react";
// import Shadowbtn from "../cores/Homepage/Shadowbtn";
// import { NavbarLinks } from "../Data/Navbar-links";
// import { Link } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import ProfileDropDown from "../cores/Homepage/Auth/ProfileDropDown";
// import { apiConnect } from "../../services/apiconnect";
// import { categories } from "../../services/apis";
// import { sendOTP } from "../../services/apis";
// import toast from "react-hot-toast";
// import { CiMenuKebab } from "react-icons/ci";
// import { setCategoryId } from "../../slices/CategoryCourse";
// // import { useSelector } from "react-redux";
// import { useDispatch } from "react-redux";

// const Navbar = () => {
//   const { token } = useSelector((state) => state.auth);
//   const { user } = useSelector((state) => state.profile);
//   const { totalItems } = useSelector((state) => state.cart);
//   const [hoverList, setHoverList] = useState(false);
//   const dispatch = useDispatch();

//   const [selectedNav, setSelectedNav] = useState("");


//   const [subLinks, setSubLinks] = useState([]);

//   const fetchSubmit = async () => {
//     try {
//       const result = await apiConnect("GET", categories.CATEGORIES_API);
//       console.log(result);
//       setSubLinks(result?.data?.response);
//     } catch (error) {
//       console.log(error);
//       // toast.error(error.response.data.message)
//     }
//   };

//   useEffect(() => {
//     fetchSubmit();
//   }, []);

//   const handleClick = (id) => {
//     console.log(id);
//     dispatch(setCategoryId(id));
//   }

//   return (
//     <div className="flex justify-around fixed w-full  top-0 z-[100] gap-8 items-center h-[8vh] text-[#DBDDEA] border-b-4  border-[#2C333F] bg-[#161D29]">
//       <div className="nav  flex justify-center items-center gap-3 font-[600] text-xl">
//         <div className="icon">$</div>
//         <div className="txt">ScholarX</div>
//       </div>

//       <div className="options sm:block  hidden">
//         <ul className=" flex justify-center  items-center gap-7 font-[600] ">
//           {NavbarLinks.map((item, index) => (
//             // <Link>
//             <li
//               key={index}
//               onClick={() => setSelectedNav(item)}
//               className={`${
//                 selectedNav == item ? "text-[#FFD60A]" : "text-[#DBDDEA]"
//               } cursor-pointer flex gap-2`}
//             >
//               {item.title === "Catalog" ? (
//                 <div
//                   className="relative"
//                   onMouseEnter={() => setHoverList(true)}
//                   onMouseLeave={() => setHoverList(false)}
//                 >
//                   <p className="cursor-pointer">{item.title}</p>

//                   {hoverList && (
//                     <div className="z-50 absolute top-10">
//                       <div className="list h-auto w-[300px] text-black p-4 bg-white rounded-md shadow-lg">
//                         {subLinks.length === 0 ? (
//                           <div className="flex justify-center items-center text-black text-md font-semibold">
//                             No Course found
//                           </div>
//                         ) : (
//                           subLinks.map((item, index) => (
//                             <Link to={`/catalog/${item.name}`}>
//                             <p
//                               key={index}
//                               onClick={() => handleClick(item._id)}
//                               className="text-black w-full font-semibold text-xl px-5 mt-4 p-2 hover:bg-yellow-500 cursor-pointer"
//                             >
//                               {item.name} 
//                             </p>
//                             </Link>
//                           ))
//                         )}
//                       </div>
//                       <div className="rec h-[20px] w-[20px] bg-white rotate-45 absolute -top-2.5 left-[34%]"></div>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <Link to={item.path}>{item.title}</Link>
//               )}

//               <div className="mt-1 text-[#DBDDEA]">{item.icon}</div>
//             </li>
//           ))}
//         </ul>
//       </div>

//       <div className="btns sm:flex hidden justify-center items-center gap-10">
//         {user && user?.accountType != "Instructor" && (
//           <Link to="/dashboard/cart" className="relative">
//             <AiOutlineShoppingCart />
//             {totalItems > 0 && <span>{totalItems}</span>}
//           </Link>
//         )}
//         {token == null ? (
//           <>
//             <Link to="/signup">
//               {" "}
//               <Shadowbtn text="Sign up" />
//             </Link>
//             <Link to="/login">
//               {" "}
//               <Shadowbtn text="Log in" />
//             </Link>
//           </>
//         ) : (
//           <ProfileDropDown />
//         )}
//       </div>
//     </div>
//   );
// };

// export default Navbar;
// {
//   /* <IoIosArrowDown className="mt-1 text-[#DBDDEA]"/> */
// }

import React, { useEffect, useState } from "react";
import Shadowbtn from "../cores/Homepage/Shadowbtn";
import { NavbarLinks } from "../Data/Navbar-links";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../cores/Homepage/Auth/ProfileDropDown";
import { apiConnect } from "../../services/apiconnect";
import { categories } from "../../services/apis";
import toast from "react-hot-toast";
import { CiMenuKebab } from "react-icons/ci";
import { ImCross } from "react-icons/im";
import { setCategoryId } from "../../slices/CategoryCourse";
import { TbMenuOrder } from "react-icons/tb";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [hoverList, setHoverList] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const dispatch = useDispatch();

  const fetchSubmit = async () => {
    try {
      const result = await apiConnect("GET", categories.CATEGORIES_API);
      setSubLinks(result?.data?.response);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchSubmit();
  }, []);

  const handleClick = (id) => {
    dispatch(setCategoryId(id));
    setMenuOpen(false); // Close menu on selection
  };

  return (
    <div className="fixed top-0 z-[100] w-full bg-[#161D29] border-b-4 border-[#2C333F] text-[#DBDDEA]">
      <div className="flex justify-between items-center px-4 py-3 md:px-10 h-[8vh]">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <div className="text-yellow-400">$</div>
          <div>ScholarX</div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden md:flex gap-8 font-semibold items-center">
          {NavbarLinks.map((item, index) => (
            <li key={index} className="relative group">
              {item.title === "Catalog" ? (
                <div
                  className="relative"
                  onMouseEnter={() => setHoverList(true)}
                  onMouseLeave={() => setHoverList(false)}
                >
                  <p className="cursor-pointer">{item.title}</p>
                  {hoverList && (
                    <div className="absolute top-10 bg-white w-[300px] rounded-md shadow-lg z-50 p-4">
                      {subLinks.length === 0 ? (
                        <div className="text-center font-medium">No Courses</div>
                      ) : (
                        subLinks.map((cat, i) => (
                          <Link to={`/catalog/${cat.name}`} key={i}>
                            <p
                              onClick={() => handleClick(cat._id)}
                              className="hover:bg-yellow-500 p-2 px-4 rounded-md font-semibold text-black"
                            >
                              {cat.name}
                            </p>
                          </Link>
                        ))
                      )}
                      <div className="h-4 w-4 bg-white rotate-45 absolute -top-2 left-[35%]" />
                    </div>
                  )}
                </div>
              ) : (
                <Link to={item.path} className="hover:text-yellow-400">{item.title}</Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Right Buttons */}
        <div className="hidden md:flex items-center gap-6">
          {user && user?.accountType !== "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart size={20} />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-xs rounded-full px-1">
                  {totalItems}
                </span>
              )}
            </Link>
          )}
          {token ? <ProfileDropDown /> : (
            <>
              <Link to="/signup"><Shadowbtn text="Sign up" /></Link>
              <Link to="/login"><Shadowbtn text="Log in" /></Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <ImCross className="text-red-500" /> : <CiMenuKebab />}
        </div>
      </div>

      {/* Mobile Slide Menu */}
      {menuOpen && (
        <div className="absolute top-[8vh] left-0 w-full bg-[#1f2937] text-white px-6 py-6 space-y-6 z-50 transition-all duration-300">
          {NavbarLinks.map((item, index) => (
            <div key={index}>
              {item.title === "Catalog" ? (
                <div>
                  <p className="font-bold text-lg mb-2">Catalog</p>
                  {subLinks.length === 0 ? (
                    <p>No Courses</p>
                  ) : (
                    subLinks.map((cat, i) => (
                      <Link to={`/catalog/${cat.name}`} key={i}>
                        <p
                          onClick={() => handleClick(cat._id)}
                          className="py-1 px-2 rounded hover:bg-yellow-500"
                        >
                          {cat.name}
                        </p>
                      </Link>
                    ))
                  )}
                </div>
              ) : (
                <Link to={item.path} onClick={() => setMenuOpen(false)}>
                  <p className="font-semibold text-lg hover:text-yellow-400">{item.title}</p>
                </Link>
              )}
            </div>
          ))}

          {/* Auth Buttons / Profile */}
          <div className="flex flex-col gap-3 mt-4">
            {token ? (
              <ProfileDropDown />
            ) : (
              <>
                <Link to="/signup" onClick={() => setMenuOpen(false)}><Shadowbtn text="Sign up" /></Link>
                <Link to="/login" onClick={() => setMenuOpen(false)}><Shadowbtn text="Log in" /></Link>
              </>
            )}
            {user?.accountType !== "Instructor" && (
              <Link to="/dashboard/cart" onClick={() => setMenuOpen(false)} className="flex items-center gap-2">
                <AiOutlineShoppingCart size={18} />
                <span>Cart ({totalItems})</span>
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
