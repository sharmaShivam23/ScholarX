

import React from 'react'
import { setLogoutState } from '../slices/ProfileSlice'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../slices/authSlice'
import toast from 'react-hot-toast'

const Logout = () => {
  const dispatch = useDispatch()

  function handleLogout(){
    toast.success("Logged out")
    localStorage.removeItem("token");
    dispatch(logout()); 
    dispatch(setLogoutState(false))
    navigate("/login");
  
  }
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-black/4">
      <div className="bg-[#000814] text-white px-10 py-8 rounded-2xl shadow-lg border border-white/20 w-[90%] max-w-md text-center">
        <p className="text-2xl font-semibold mb-2">Are you sure?</p>
        <p className="text-lg text-gray-300 mb-6">You will be logged out of your account.</p>

        <div className="flex justify-center gap-6">
          <button onClick={handleLogout} className="w-[100px] h-[45px] rounded-md bg-[#161D29] text-white font-semibold hover:bg-[#1c2230] transition">
            Logout
          </button>
          <button onClick={() => dispatch(setLogoutState(false))} className="w-[100px] h-[45px] rounded-md bg-[#FFD60A] text-black font-semibold hover:bg-yellow-400 transition">
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}

export default Logout
