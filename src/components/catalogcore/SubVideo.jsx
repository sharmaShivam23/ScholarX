import React from "react";
import SidebarCourse from "./SidebarCourse";
import { useSelector } from "react-redux";
import { FaLocationArrow } from "react-icons/fa";

const SubVideo = () => {
  const { videourl, content } = useSelector((state) => state.Category);
  return (
    <div className="h-screen mt-16  relative  w-full">
      <SidebarCourse />

      <div className="videos  max-w-[80vw] mr-10  px-16 py-10 w-full ml-auto h-full ">
        <div className="vdieo h-[60vh] bg-black border-2 border-[#424854] rounded-xl">
          {videourl ? (
            <video
              src={content.videoURL}
              controls
              autoPlay
              className="object-contain w-full h-full"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full gap-4 h-full flex items-center justify-center text-lg text-gray-400 bg-[#2D3748]">
            <FaLocationArrow className="text-2xl text-yellow-400 -rotate-100"/>   Choose a Subsection to start Video
            </div>
          )}
        </div>
         <div className="content mt-8 text-white">
        <p className="text-3xl font-bold text-white">{content?.title}</p>
        <p className="text-lg mt-2 font-semibold ">{content?.description}</p>
      </div>
      </div>

     
    </div>
  );
};

export default SubVideo;
