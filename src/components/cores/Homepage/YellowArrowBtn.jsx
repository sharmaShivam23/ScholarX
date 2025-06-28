import React from 'react'
import { FaArrowRight } from "react-icons/fa";

const YellowArrowBtn = ({text}) => {
  return (
   <button className='flex w-auto text-sm sm:text-lg hover:scale-110 transition-all duration-1000 ease-in-out cursor-pointer  justify-between items-center text-md bg-[#FFD60A] rounded-[8px] shadow-[2px_1px_1px_rgb(255,255,255)] text-black p-3 font-[700]'>
    {text}
    <FaArrowRight className='text-black ml-2 sm:mt-0.5 mt-0.5'/>
   </button>
  )
}

export default YellowArrowBtn
