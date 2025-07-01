
import React from 'react'
import { useSelector } from 'react-redux'

const RenderStep = () => {
  const { stateCourse } = useSelector((state) => state.Course)

  const data = [
    { id: 1, title: "Course Information" },
    { id: 2, title: "Course Content" },
    { id: 3, title: "Course Price" },
  ]

  return (
    <div className='flex justify-center items-center md:mt-20 mr-10 md:mr-6 w-[98vw] md:w-[50vw]'>
      {data.map((item, index) => (
        <React.Fragment key={item.id}>
          <div className='flex justify-center items-center flex-col'>
            <div
              className={`w-[60px] h-[60px]  rounded-full text-2xl font-bold flex items-center justify-center 
              ${stateCourse >= item.id ? "text-[#FFD60A] border-[#FFD60A]" : "text-[#838894] border-[#2C333F]"} 
              bg-[#161D29] border-2`}
            >
              {item.id}
            </div>
            <div className={`text-md  ${stateCourse >= item.id ? "text-[#FFD60A]" : "text-[#838894]"} font-bold text-center`}>{item.title}</div>
          </div>

          {index !== data.length - 1 && (
            <div className={`border-t ${stateCourse > item.id ? "border-[#FFD60A]" : "border-[#838894]"} mb-5 w-[10vw]   border-dotted border-[#838894] mx-1`}></div>
          )}
        </React.Fragment>
      ))}
    </div>
  )
}

export default RenderStep
