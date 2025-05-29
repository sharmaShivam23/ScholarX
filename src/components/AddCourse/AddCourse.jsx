// import React from 'react'
// import RenderStep from './RenderStep'
// import CourseForm1 from './CourseForm1'
// import Message from './Message'
// import CourseForm2 from './CourseForm2'
// const AddCourse = () => {
//   return (
//     <div className='max-w-[85vw] pt-30   gap-10 flex justify-center items-center ml-auto h-screen  p-4'>
//       <div className="c">
//        <RenderStep/>
//        <CourseForm1/>
//        </div>
//        <div className="m">
//         <Message/>
//        </div>
//     </div>
//   )
// }

// export default AddCourse

import React from 'react';
import RenderStep from './RenderStep';
import CourseForm1 from './CourseForm1';
import Message from './Message';
import CourseForm2 from './CourseForm2';
import { useSelector } from 'react-redux';

const AddCourse = () => {
   const { stateCourse } = useSelector((state) => state.Course);
  return (
    <div className="pt-24 min-h-screen max-w-[85vw] ml-auto flex justify-center items-start gap-10 p-4 bg-black text-white">
      {/* Left Side */}
      <div className="flex flex-col gap-8">
        <RenderStep />
        {stateCourse === 1 ? <CourseForm1 /> : <CourseForm2 />}
        {/* {stateCourse === 1 ? <CourseForm1 /> : stateCourse === 2 ? <CourseForm2 /> : null} */}
      </div>

      {/* Right Side */}
      <div>
        <Message />
      </div>
    </div>
  );
};

export default AddCourse;
