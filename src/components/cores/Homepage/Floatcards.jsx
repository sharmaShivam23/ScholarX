import React from 'react'
import frameimg from "../../../assets/images/frameimg.png";
import emoji from "../../../assets/images/emoji.png"
import Calender from "../../../assets/images/Calender.png"

const Floatcards = () => {
  return (
    <div>
       <div className="card p-10  flex justify-center flex-wrap flex-col h-auto sm:flex-row mt-20 items-center">
        <Card1/>
        <Card2/>
        <Card3/>
       </div>
    </div>
  )
}

export default Floatcards



const Card1 = () => {
  return(
    <>
    <div className="card1 relative sm:w-[370px] w-[250px] sm:h-[350px] h-[300px] rotate-[20deg]  bg-white shadow-[7px_7px_0px_rgb(211,211,211)]">
     <div className="head h-[5vh] bg-[#B4DAEC] text-[#0A5A72] text-left flex justify-items-start p-5 items-center text-lg font-[600]">Know Your Progress</div>
     <div className="txt mt-4 text-left ml-6">
      <p className='text-2xl font-bold'>HTML</p>
      <p className='text-lg mt-2 font-[600] text-[#838894]'>Your current league</p>
     </div>
     <div className="img absolute bottom-0 flex justify-center items-center ml-3">
      <img src={frameimg} className='rotate-[1deg]' alt="" />
     </div>
    </div>
    </>
  )
}


const Card2 = () => {
  return(
    <>
    <div className="card1 relative sm:w-[370px] w-[250px] sm:h-[350px] h-[300px] -rotate-[20deg]  bg-white shadow-[7px_7px_0px_rgb(211,211,211)]">
     <div className="head h-[5vh] bg-[#FBC7D1] text-[#4F0A25] text-left flex justify-items-start p-5 items-center text-lg font-[600]">Know Your Progress</div>
     <div className="img">
      <img src={emoji} className='rotate-[8deg]' alt="" />
     </div>
    </div>
    </>
  )
}


const Card3 = () => {
  return(
    <>
    <div className="card1 relative sm:w-[370px] w-[250px] sm:h-[350px] h-[300px] rotate-[20deg]  bg-white shadow-[7px_7px_0px_rgb(211,211,211)]">
     <div className="head h-[5vh] bg-[#FFE395] text-[#41260B] text-left flex justify-items-start p-5 items-center text-lg font-[600]">Play your lessons</div>
     <div className="img">
      <img src={Calender} className='rotate-[350deg]' alt="" />
     </div>
    </div>
    </>
  )
}
