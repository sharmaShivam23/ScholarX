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
import { setCoursePath } from "../../slices/CategoryCourse";
import { FaChevronDown } from "react-icons/fa";

const Navbar = () => {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);
  const [hoverList, setHoverList] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [subLinks, setSubLinks] = useState([]);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const fetchSubmit = async () => {
    try {
      setLoading(true);
      const result = await apiConnect("GET", categories.CATEGORIES_API);
      setSubLinks(result?.data?.response);
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.messsage || "try again!")
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmit();
  }, []);

  const handleClick = (id, path) => {
    dispatch(setCategoryId(id));
    dispatch(setCoursePath(path));
    setMenuOpen(false);
  };

  return (
    <div className="fixed top-0 z-[100] w-full bg-[#161D29] border-b-4 border-[#2C333F] text-[#DBDDEA]">
      <div className="flex justify-between items-center px-4 py-3 md:px-10 h-[8vh]">
        {/* Logo */}
        <div className="flex items-center gap-2 text-xl font-bold">
          <div className="text-yellow-400">
            $
            {/* <video src="/contactvideo.mp4" loop autoPlay  className="h-10 w-10 object-contain"></video> */}
          </div>
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
                >
                  <p className="cursor-pointer gap-3 flex">
                    {item.title}{" "}
                    <FaChevronDown className="flex items-center gap-3 mt-1" />
                  </p>
                  {hoverList && (
                    <div
                      onMouseLeave={() => setHoverList(false)}
                      className="absolute top-10 bg-white w-[280px] rounded-md shadow-lg z-50 p-4"
                    >
                      {loading ? (
                        <p className="text-lg text-black">Loading...</p>
                      ) : subLinks?.length === 0 ? (
                        <div className="text-center text-black font-medium z-20">
                          No Course found
                        </div>
                      ) : (
                        subLinks?.map((cat, i) => (
                          <Link to={`/catalog/${cat.name}`} key={i}>
                            <p
                              key={i}
                              onClick={() => handleClick(cat._id, cat.name)}
                              className="hover:bg-yellow-500 p-2 px-4 py-3 h-14 flex items-center rounded-md font-semibold text-black"
                            >
                              {cat?.name}
                              {/* <FaChevronDown className="flex items-center mt-1"/> */}
                            </p>
                          </Link>
                        ))
                      )}
                      <div className="h-4 w-4 bg-white rotate-45 absolute -top-2 left-[10%]" />
                    </div>
                  )}
                </div>
              ) : (
                <Link to={item?.path} className="hover:text-yellow-400">
                  {item?.title}
                </Link>
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
          {token ? (
            <ProfileDropDown />
          ) : (
            <>
              <Link to="/signup">
                <Shadowbtn text="Sign up" />
              </Link>
              <Link to="/login">
                <Shadowbtn text="Log in" />
              </Link>
            </>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div
          className="md:hidden text-2xl cursor-pointer"
          onClick={() => setMenuOpen(!menuOpen)}
        >
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
                  <p className="font-bold flex items-center gap-2 text-lg mb-2">
                    Catalog <FaChevronDown className="flex items-center mt-1" />
                  </p>
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
                  <p className="font-semibold text-lg hover:text-yellow-400">
                    {item.title}
                  </p>
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
                <Link to="/signup" onClick={() => setMenuOpen(false)}>
                  <Shadowbtn text="Sign up" />
                </Link>
                <Link to="/login" onClick={() => setMenuOpen(false)}>
                  <Shadowbtn text="Log in" />
                </Link>
              </>
            )}

            {token && user?.accountType === "Student" && (
              <Link to="/dashboard/cart" className="relative">
                <AiOutlineShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-2 bg-yellow-400 text-black text-xs rounded-full px-1">
                    {totalItems}
                  </span>
                )}
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
