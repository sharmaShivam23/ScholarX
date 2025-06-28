import React from 'react'

const YellowIconBtn = ({text , icon}) => {
  return (
    <button className='flex text-sm sm:text-lg hover:scale-110 transition-all duration-1000 ease-in-out cursor-pointer  justify-between items-center text-md bg-[#FFD60A] rounded-[8px] shadow-[2px_1px_1px_rgb(255,255,255)] text-black p-3 font-[700]'>
    {text}
    <p  className='text-black ml-2 sm:mt-0.5 mt-0.5'>
      {icon}
    </p>
   </button>
  )
}

export default YellowIconBtn

