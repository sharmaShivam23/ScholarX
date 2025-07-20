// import React, { useState } from 'react';
// import { FaChevronUp } from 'react-icons/fa';
// import { IoMdVideocam } from 'react-icons/io';
// import { useSelector } from 'react-redux';
// import { useDispatch } from 'react-redux';
// import { setVideoUrl } from '../../slices/CategoryCourse';
// import { setContent } from '../../slices/CategoryCourse';

// const SidebarCourse = ({hideMenu , setMenu}) => {
//   const { CourseData } = useSelector((state) => state.Category);
//   const dispatch = useDispatch()
//   const [iconup, setIconup] = useState({}); 

//   const handleIconClick = (index) => {
//     setIconup((prev) => ({
//       ...prev,
//       [index]: !prev[index],
//     }));
//   };

//   const handleVideo = (id , url , CourseContent) => {
//   //  console.log("su" , id);
//   //  console.log("su" , url);

//    dispatch(setVideoUrl(url))
//    dispatch(setContent(CourseContent))
//    setMenu(true)
   
//   }

//   return (
//     <>
//     <div className="absolute z-40 hidden md:block top-0 left-0 h-full overflow-y-auto bg-[#161D29] border-r-2 border-[#2C333F] w-[250px] p-4">
//       <h2 className="text-xl font-bold text-white mb-4">Course Content</h2>

//       {CourseData?.courseContent?.length == 0 ? (<p className="text-white flex text-center text-sm">No Data Found</p>) :  ( CourseData?.courseContent?.map((item, index) => (
//         <div key={index} className="mb-2">
//           {/* Section Header */}
//           <div
//             className="flex justify-between items-center cursor-pointer bg-[#2C333F] text-white p-3 rounded-lg border border-[#424854]"
//             onClick={() => handleIconClick(index)}
//           >
//             <div className="flex items-center gap-2">
//               <FaChevronUp
//                 className={`transition-transform duration-300 ${
//                   iconup[index] ? 'rotate-180' : ''
//                 }`}
//               />
//               <p className="text-sm font-medium">{item?.sectionName}</p>
//             </div>
//             <span className="text-xs text-[#FFD60A] font-semibold">
//               {item?.subSection?.length || 0} Lectures
//             </span>
//           </div>

//           {/* Subsection List */}
//           {iconup[index] && (
//             <ul className="ml-6 mt-2 space-y-1 text-sm text-[#E5E7EB]">
//               {item?.subSection?.map((sub, i) => (
//                 <li onClick={() => handleVideo(sub._id , sub.videoURL , sub)} key={i} className="flex cursor-pointer items-center gap-2">
//                   <IoMdVideocam className="text-[#FFD60A]" />
//                   {sub.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       )))}
    
//     </div>
    
     
//      {!hideMenu && (
//     <div className="absolute z-40  top-0 left-0 h-screen overflow-y-auto bg-[#161D29] border-r-2 border-[#2C333F] w-[250px] p-4">
//       <h2 className={`text-xl font-bold text-end text-white mb-4`}>Course Content</h2>

//     {CourseData?.courseContent?.length == 0 ? (<p className="text-white text-sm">No Lecture Found</p>)  :   CourseData?.courseContent?.map((item, index) => (
//         <div key={index} className="mb-2">
//           {/* Section Header */}
//           <div
//             className="flex justify-between items-center cursor-pointer bg-[#2C333F] text-white p-3 rounded-lg border border-[#424854]"
//             onClick={() => handleIconClick(index)}
//           >
//             <div className="flex items-center gap-2">
//               <FaChevronUp
//                 className={`transition-transform duration-300 ${
//                   iconup[index] ? 'rotate-180' : ''
//                 }`}
//               />
//               <p className="text-sm font-medium">{item?.sectionName}</p>
//             </div>
//             <span className="text-xs text-[#FFD60A] font-semibold">
//               {item?.subSection?.length || 0} Lectures
//             </span>
//           </div>

//           {/* Subsection List */}
//           {iconup[index] && (
//             <ul className="ml-6 mt-2 space-y-1 text-sm text-[#E5E7EB]">
//               {item?.subSection?.length == 0 ? (<p className="text-white text-sm">No Lecture Found</p>) :  item?.subSection?.map((sub, i) => (
//                 <li onClick={() => handleVideo(sub._id , sub.videoURL , sub)} key={i} className="flex cursor-pointer items-center gap-2">
//                   <IoMdVideocam className="text-[#FFD60A]" />
//                   {sub.title}
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//       ))}
//     </div>
//     )}
//     </>
//   );
// };

// export default SidebarCourse;


import React, { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { IoMdVideocam } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux';
import { setVideoUrl, setContent } from '../../slices/CategoryCourse';

const SidebarCourse = ({ hideMenu, setMenu }) => {
  const { CourseData } = useSelector((state) => state.Category);
  const dispatch = useDispatch();
  const [iconup, setIconup] = useState({});

  const handleIconClick = (index) => {
    setIconup((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleVideo = (id, url, subContent) => {
    dispatch(setVideoUrl(url));
    dispatch(setContent(subContent));
    setMenu(true);
  };

  const hasNoContent = !CourseData?.courseContent || CourseData.courseContent.length === 0;

  const RenderCourseContent = () => {
    if (hasNoContent) {
      return <p className="text-white text-sm text-center">👉 No Data Found</p>;
    }

    return CourseData.courseContent.map((item, index) => (
      <div key={index} className="mb-2">
        {/* Section Header */}
        <div
          className="flex justify-between items-center cursor-pointer bg-[#2C333F] text-white p-3 rounded-lg border border-[#424854]"
          onClick={() => handleIconClick(index)}
        >
          <div className="flex items-center gap-2">
            <FaChevronUp
              className={`transition-transform duration-300 ${
                iconup[index] ? 'rotate-180' : ''
              }`}
            />
            <p className="text-sm font-medium">{item?.sectionName}</p>
          </div>
          <span className="text-xs text-[#FFD60A] font-semibold">
            {item?.subSection?.length || 0} Lectures
          </span>
        </div>

        {/* Subsection List */}
        {iconup[index] && (
          <ul className="ml-6 mt-2 space-y-1 text-sm text-[#E5E7EB]">
            {item?.subSection?.length === 0 ? (
              <li className="text-white text-sm list-none">👉 No Lectures Found</li>
            ) : (
              item.subSection.map((sub, i) => (
                <li
                  key={i}
                  onClick={() => handleVideo(sub._id, sub.videoURL, sub)}
                  className="flex cursor-pointer items-center gap-2"
                >
                  <IoMdVideocam className="text-[#FFD60A]" />
                  {sub.title}
                </li>
              ))
            )}
          </ul>
        )}
      </div>
    ));
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="absolute z-40 hidden md:block top-0 left-0 h-full overflow-y-auto bg-[#161D29] border-r-2 border-[#2C333F] w-[250px] p-4">
        <h2 className="text-xl font-bold text-white mb-4">Course Content</h2>
        <RenderCourseContent />
      </div>

      {/* Mobile Sidebar */}
      {!hideMenu && (
        <div className="absolute z-40 top-0 left-0 h-screen overflow-y-auto bg-[#161D29] border-r-2 border-[#2C333F] w-[250px] p-4">
          <h2 className="text-xl font-bold text-end text-white mb-4">Course Content</h2>
          <RenderCourseContent />
        </div>
      )}
    </>
  );
};

export default SidebarCourse;
