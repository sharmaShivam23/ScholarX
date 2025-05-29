import React, { useState } from 'react'
import { Homepage_explorer } from '../../Data/homepage_explorer'
import { IoPeople } from "react-icons/io5";
import { PiTreeViewBold } from "react-icons/pi";

const tabs = [
  "Free",
  "New to Coding",
  "Most popular",
  "Skills path",
  "Career path"
]

const ExploreMore = () => {

  const [currentTab , setCurrentTab] = useState(tabs[0])
  const [courses , setCourses] = useState(Homepage_explorer[0].courses)
  const [currentCard , setCurrentCard] = useState(Homepage_explorer[0].courses[0].heading)

  const setMycards = (value) => {
    setCurrentTab(value);
    const result = Homepage_explorer.filter((course) => course.tag == value)
    setCourses(result[0].courses)
    setCurrentCard(result[0].courses[0].heading)
  }
  
  return (
    <>
    <div className='flex justify-center items-center'>
      <div className={`head mt-10 flex justify-center  sm:gap-7  lg:gap-10 gap-3 px-10  bg-[#161D29] p-3 max-w-max  rounded-4xl  items-center`}>
        {tabs.map((element , index) => (
           <div key={index} className={`all   text-white ${currentTab == element ? "bg-[#000814] px-7 py-2 rounded-3xl" : ""} cursor-pointer   text-xs sm:text-lg font-[500]`}
           onClick={() => setMycards(element)}
           >
            {element}
           </div>
        ))}
      </div>
    </div>

        <div className='flex justify-center items-center max-[400px]:text-xs flex-wrap gap-16 relative top-16 z-50'>
  {courses.map((item , index) => (
    <div 
      key={index} 
      className={`w-[350px] max-[400px]:w-[300px] h-[310px] p-5 relative text-${item.color} ${item.bg} ${item.active && "shadow-[13px_13px_0px_rgb(255,214,10)]"}`}
    >
      <p className="heading text-left font-bold text-xl mt-2">{item.heading}</p>
      <p className="content text-left text-[#585D69] text-lg mt-5">{item.description}</p>
      
      <div className="dotted absolute bottom-10">
        - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  
      </div>
      <div className='flex justify-center items-center'>
      <div className={`icons flex justify-center  ${item.active ? "text-[#0A5A72]" : "text-[#838894]"} gap-5 sm:gap-12 absolute bottom-4 text-lg font-bold items-center w-full`}>
        <div className="one flex gap-1">
          <IoPeople className='text-xl mt-1.5'/>
          <p>{item.level}</p>
        </div>
        <div className="two flex gap-2">
          <PiTreeViewBold className='text-xl mt-1.5 '/>
          {item.lessionNumber} lessons
        </div>
      </div>
      </div>
    </div>
  ))}
</div>

        </>
  )
}

export default ExploreMore
