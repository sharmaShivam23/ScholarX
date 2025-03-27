import React from 'react'

const Shadowbtn = ({text , mt}) => {
  return (
    <button className={`flex hover:scale-110 ${mt} transition-all duration-1000 ease-in-out cursor-pointer  justify-between items-center text-md bg-[#161D29] font-[700] rounded-[8px]   shadow-[1px_1px_1px_rgba(255,255,255,0.6)]   text-[#F1F2FF] p-3`}>
      {text}</button>
  )
}

export default Shadowbtn
