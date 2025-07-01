

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../slices/authSlice'; // Add this if you have a logout reducer
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../slices/authSlice';
import { setLogoutState } from '../../../../slices/ProfileSlice';
import toast from 'react-hot-toast';

const ProfileDropDown = () => {
  const {profileImage} = useSelector((state) => state.auth)
  const {user} = useSelector((state) => state.profile)
  
  const [showDropdown, setShowDropdown] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleLogout = () => {
    toast.success("Logged out")
    localStorage.removeItem("token");
    dispatch(logout()); 
    dispatch(setLogoutState(false))
    navigate("/login");
  };

  return (
   
//     <div
//   className="relative inline-block"
//   onMouseEnter={() => setShowDropdown(true)}
//   onMouseLeave={() => setShowDropdown(false)}
// >
//   <img
//     src={profileImage}
//     alt={`${user?.firstName}`}
//     className="w-10 h-10 rounded-full object-cover cursor-pointer"
//   />

//   {showDropdown && (
//     <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
//       <button
//         onClick={() => navigate("/dashboard/my-profile")}
//         className="block px-4 py-2 w-full text-left hover:bg-gray-100"
//       >
//         Dashboard
//       </button>
//       <button
//         onClick={handleLogout}
//         className="block px-4 py-2 cursor-pointer w-full text-left text-red-600 hover:bg-gray-100"
//       >
//         Logout
//       </button>
//     </div>
//   )}
// </div>
<div className="relative  border-0 inline-block w-48">
  <select
    onChange={(e) => {
      if (e.target.value === "dashboard") {
        navigate("/dashboard/my-profile");
      } else if (e.target.value === "logout") {
        handleLogout();
      }
    }}
    defaultValue=""
    className="w-full  rounded-lg text-white font-bold  shadow px-14 py-2 appearance-none cursor-pointer bg-[#161D29] "
  >
    <option className='ml-10' value="">
    {"   "} {user?.firstName || "Profile"}
    </option>
    <option value="dashboard">Dashboard</option>
    <option  value="logout">Logout</option>
  </select>


  <div className="absolute left-2  top-1/2 -translate-y-1/2 pointer-events-none">
    <img
      src={profileImage}
      alt="profile"
      className="w-10 h-10 rounded-full object-cover"
    />
  </div>
</div>


  );
};

export default ProfileDropDown;
