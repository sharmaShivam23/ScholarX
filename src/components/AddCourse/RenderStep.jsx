import React from 'react'
import { SiTicktick } from "react-icons/si";

const RenderStep = () => {

  const data = [
    {
      id: 1,
      title: "Course Information",
     
    },
    {
      id: 2,
      title: "Course Content",
    },
    {
      id: 3,
      title: "Course Price",
    },
  ]

  return (
    <div className='flex justify-evenly  items-center mt-20 w-[50vw]'>
    {data.map((item , index) => (
      <div  key={index} className='flex justify-center items-center flex-col gap-2'>
   <div className="1 w-[60px] flex-col text-[#838894] flex justify-center items-center
    bg-[#161D29]  text-3xl font-bold h-[60px] border-[#2C333F] rounded-full">
    {item.id}
   </div>
   <div className="p text-md font-bold text-white">{item.title}</div>
       </div>
  ))}
    </div>
  )
}

export default RenderStep
