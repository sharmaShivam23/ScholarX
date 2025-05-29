import { IoIosArrowDown } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FaShoppingCart } from "react-icons/fa";
import { IoSettings } from "react-icons/io5";
import { BiLogOut } from "react-icons/bi";
import { FaGraduationCap } from "react-icons/fa6";
import { IoIosAddCircle } from "react-icons/io";
import { FaTv } from "react-icons/fa";
export const Sidebardata = [
  {
    title: "My Profile",
    icon : <CgProfile/>,
    path: "/dashboard/my-profile",
  },
  {
    title: "Enrolled Courses",
    icon: <FaGraduationCap />,
    path : "/dashboard/enrolled-courses",
     type : "Student"
  },
  {
    title: "Cart",
    icon: <FaShoppingCart />,
    path : "/dashboard/cart",
     type : "Student"
  },
  {
    title: "Add Course",
    path : "/dashboard/add-course",
   type : "Instructor",
   icon : <IoIosAddCircle />
  },
  {
    title: "My Courses",
    path : "/dashboard/my-courses",
   type : "Instructor",
   icon : <FaTv/>
  },
  {
    title: "Settings",
    icon: <IoSettings />,
    path : "/dashboard/settings",
  },
  {
    title: "Logout",
    icon: <BiLogOut />,
  },
  
 
];
