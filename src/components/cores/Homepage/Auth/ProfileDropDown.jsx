

import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import { logout } from '../../slices/authSlice'; // Add this if you have a logout reducer
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../../slices/authSlice';
import { setLogoutState } from '../../../../slices/ProfileSlice';


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
   
    <div
  className="relative inline-block"
  onMouseEnter={() => setShowDropdown(true)}
  onMouseLeave={() => setShowDropdown(false)}
>
  <img
    src={profileImage}
    alt={`${user?.firstName}`}
    className="w-10 h-10 rounded-full object-cover cursor-pointer"
  />

  {showDropdown && (
    <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50">
      <button
        onClick={() => navigate("/dashboard")}
        className="block px-4 py-2 w-full text-left hover:bg-gray-100"
      >
        Dashboard
      </button>
      <button
        onClick={handleLogout}
        className="block px-4 py-2 cursor-pointer w-full text-left text-red-600 hover:bg-gray-100"
      >
        Logout
      </button>
    </div>
  )}
</div>

  );
};

export default ProfileDropDown;
