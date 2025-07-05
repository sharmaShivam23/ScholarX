import React, { useState } from "react";
import SidebarCourse from "./SidebarCourse";
import { useSelector } from "react-redux";
import { FaLocationArrow } from "react-icons/fa";
import { ImMenu } from "react-icons/im";
import { ImCross } from "react-icons/im";

const SubVideo = () => {
  const { videourl, content } = useSelector((state) => state.Category);

  const [hideMenu , setMenu] = useState(true)

  const handleMenu = () => {
    setMenu((prev) => !prev )
  }

  return (
    <div className="min-h-screen mt-16 pt-16 relative w-full flex flex-col lg:flex-row">
      {/* Sidebar (can be enhanced to be toggleable for mobile) */}
      <div  className=" w-full lg:w-[20%]">
        <SidebarCourse  hideMenu={hideMenu} setMenu={setMenu} />
      </div>

      {/* Menu icon for mobile */}
      <div onClick={handleMenu} className="lg:hidden z-50 absolute top-4 left-4 text-xl text-white ">
        {hideMenu ? <ImMenu className="cursor-pointer"/> : <ImCross className="text-red-500 cursor-pointer"/>}
      </div>

      {/* Video and content section */}
      <div className="flex-1 w-full lg:w-[80%] px-4 sm:px-6 md:px-10 py-6 ">
        {/* Video player container */}
        <div className="h-[35vh] sm:h-[50vh] lg:mr-10 md:h-[60vh] bg-black border-2 border-[#424854] rounded-xl overflow-hidden">
          {videourl ? (
            <video
              src={content.videoURL}
              controls
              autoPlay
              className="w-full h-full object-contain"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="flex items-center justify-center h-full text-sm sm:text-base text-gray-400 bg-[#2D3748] px-4 text-center">
              <FaLocationArrow className="text-xl sm:text-2xl text-yellow-400 mr-2 rotate-[270deg]" />
              Choose a Subsection to start Video
            </div>
          )}
        </div>

        {/* Content (Title & Description) */}
        <div className="mt-6 text-white">
          <p className="text-lg sm:text-xl md:text-2xl font-bold">{content?.title}</p>
          <p className="mt-2 text-sm sm:text-base md:text-lg font-medium">{content?.description}</p>
        </div>


        {/* Extra course info section */}
<div className="mt-12  z-50 w-full px-4 sm:px-6 md:px-10 lg:px-16 py-10 bg-[#1a1e2d] rounded-2xl shadow-lg">
  <h2 className="text-2xl sm:text-3xl font-bold text-white mb-6 border-b border-gray-700 pb-2">
    Enhance Your Learning
  </h2>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-[#C5C7D4]">
    <div>
      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Real-World Projects</h3>
      <p className="text-sm leading-relaxed">
        Apply the concepts you've learned by working on hands-on, real-world projects that simulate actual job scenarios.
        These projects will help you build your portfolio and solidify your knowledge.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Interactive Quizzes</h3>
      <p className="text-sm leading-relaxed">
        Test your understanding after each section with short quizzes and coding challenges designed to reinforce core concepts.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Certificate of Completion</h3>
      <p className="text-sm leading-relaxed">
        Finish the course and earn a certificate to showcase your skills. Great for adding to resumes and LinkedIn profiles.
      </p>
    </div>

    <div>
      <h3 className="text-xl font-semibold text-yellow-400 mb-2">Join the Community</h3>
      <p className="text-sm leading-relaxed">
        Access our discussion forums and peer groups to ask questions, collaborate, and get help from a growing tech community.
      </p>
    </div>
  </div>
</div>

      </div>

      
    </div>
  );
};

export default SubVideo;
