

import React, { useState } from 'react';
import RenderStep from './RenderStep';
import CourseForm1 from './CourseForm1';
import Message from './Message';
import CourseForm2 from './CourseForm2';
import { useSelector } from 'react-redux';
import CourseForm3 from './CourseForm3';
import { CgMenuRound } from "react-icons/cg";
import { setMenu } from '../../slices/ProfileSlice';
import { useDispatch } from 'react-redux';
import { RxCrossCircled } from "react-icons/rx";


const AddCourse = () => {
   const { stateCourse } = useSelector((state) => state.Course);
   const { hideMenu } = useSelector((state) => state.profile);
   const dispatch = useDispatch()
  //  const handleMenu = () => {
  //   dispatch(setMenu(!hideMenu));
  //  }
  return (
    <div className="mt-24  min-h-screen flex-col-reverse sm:flex-row w-full md:max-w-[90vw] md:ml-auto flex justify-center items-start gap-10 md:p-4 bg-black text-white">

      {/* <div onClick={handleMenu} className="icon text-4xl font-bold text-white fixed z-50 top-16 left-5">
       {hideMenu ?  <CgMenuRound/> : <RxCrossCircled/>} 
      </div> */}

      
      {/* Left Side */}
      <div className="flex flex-col justify-center items-center gap-8">
        <RenderStep />
        {stateCourse === 1 ? <CourseForm1 /> : stateCourse === 2 ? <CourseForm2 /> : stateCourse === 3 ? <CourseForm3/> : null}
      </div>

      <div>
        <Message />
      </div>
    </div>
  );
};

export default AddCourse;
