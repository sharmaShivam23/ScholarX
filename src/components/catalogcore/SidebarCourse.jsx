import React, { useState } from 'react';
import { FaChevronUp } from 'react-icons/fa';
import { IoMdVideocam } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { setVideoUrl } from '../../slices/CategoryCourse';
import { setContent } from '../../slices/CategoryCourse';

const SidebarCourse = () => {
  const { CourseData } = useSelector((state) => state.Category);
  const dispatch = useDispatch()
  const [iconup, setIconup] = useState({}); 

  const handleIconClick = (index) => {
    setIconup((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const handleVideo = (id , url , CourseContent) => {
   console.log("su" , id);
   console.log("su" , url);

   dispatch(setVideoUrl(url))
   dispatch(setContent(CourseContent))
   
  }

  return (
    <div className="absolute top-0 left-0 h-screen overflow-y-auto bg-[#161D29] border-r-2 border-[#2C333F] w-[250px] p-4">
      <h2 className="text-xl font-bold text-white mb-4">Course Content</h2>

      {CourseData?.courseContent?.map((item, index) => (
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
              {item?.subSection?.map((sub, i) => (
                <li onClick={() => handleVideo(sub._id , sub.videoURL , sub)} key={i} className="flex cursor-pointer items-center gap-2">
                  <IoMdVideocam className="text-[#FFD60A]" />
                  {sub.title}
                </li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
};

export default SidebarCourse;
