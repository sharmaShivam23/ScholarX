import React from "react";

const YellowBtn = ({ text , px }) => {  
  return (
    <button className={`flex justify-between items-center ${px} hover:scale-110 transition-all duration-1000 ease-in-out cursor-pointer text-md bg-[#FFD60A] rounded-[8px] shadow-[2px_1px_1px_rgb(255,255,255)] text-black p-3`}>
      {text}
    </button>
  );
};

export default YellowBtn;
