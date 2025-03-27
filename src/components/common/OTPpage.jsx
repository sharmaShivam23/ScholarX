import React from 'react'
import { FaArrowLeft } from "react-icons/fa";

const OTPpage = () => {
  return (
    <div className='flex justify-center items-center h-[90vh] bg-[#000814]'>
      <div className="otppage  w-[35vw] text-white h-[40vh] flex justify-start  items-center flex-col p-10 gap-2 float">
        <div className="heading text-3xl font-[600]">
          Verify Email
        </div>
        <div className="content text-[#AFB2BF] text-lg font-[550] ">
        A verification code has been sent to you. Enter the code below
        </div>
        <div className="otp flex justify-center items-center gap-2 mt-4">
          <input type="text" className='w-[50px] flex justify-center items-center h-[50px] bg-[#161D29] rounded-xl  shadow-[0px_1px_2px_rgba(255,255,255,0.6)]'/>
          <input type="text" className='w-[50px] h-[50px] bg-[#161D29] rounded-xl  shadow-[0px_1px_2px_rgba(255,255,255,0.6)]'/>
          <input type="text" className='w-[50px] h-[50px] bg-[#161D29] rounded-xl  shadow-[0px_1px_2px_rgba(255,255,255,0.6)]'/>
          <input type="text" className='w-[50px] h-[50px] bg-[#161D29] rounded-xl  shadow-[0px_1px_2px_rgba(255,255,255,0.6)]'/>
          <input type="text" className='w-[50px] h-[50px] bg-[#161D29] rounded-xl  shadow-[0px_1px_2px_rgba(255,255,255,0.6)]'/>
          <input type="text" className='w-[50px] h-[50px] bg-[#161D29] rounded-xl  shadow-[0px_1px_2px_rgba(255,255,255,0.6)]'/>
         
        </div>

        <div className="btn w-full mt-7  flex justify-center rounded-xl items-center bg-[#FFD60A]">
              <button className="text-black h-[6vh]  font-[550]">Verify and Register</button>
            </div>

            <div className="btn flex font-[550] justify-between mt-2 items-center gap-20">
              <button className='flex gap-2'><FaArrowLeft className='mt-1'/> Back to login </button>
              <button className='text-[#47A5C5]'>Resend it</button>
            </div>
      </div>
    </div>
  )
}

export default OTPpage
