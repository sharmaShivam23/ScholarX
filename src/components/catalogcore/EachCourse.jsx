import React, { useState } from "react";
import { FaStar } from "react-icons/fa6";
import { BiSolidErrorCircle } from "react-icons/bi";
import { ImSphere } from "react-icons/im";
import { FaChevronUp } from "react-icons/fa";
import { IoMdVideocam } from "react-icons/io";
import { useSelector } from "react-redux";
import { FaClock } from "react-icons/fa";
import { FaArrowPointer } from "react-icons/fa6";
import { IoTv } from "react-icons/io5";
import { PiCertificateFill } from "react-icons/pi";
import { useNavigate } from "react-router-dom";

const EachCourse = () => {
  const rating = (Math.random() * (5 - 3.5) + 3.5).toFixed(1);
  const navigate = useNavigate()
  const users = Math.floor(Math.random() * 5000 + 500);
  const ratingsCount = Math.floor(Math.random() * 1000 + 100);
  const createdDate = new Date().toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const { CourseData } = useSelector((state) => state.Category);

  const [iconup, seticonup] = useState(false);

  let courseId = CourseData?._id

 

  const handleIconClick = (index) => {
    seticonup((prev) => ({
      ...prev,
      [index]: !prev[index], // Toggle that specific section
    }));
  };

  const handleVideoShow = () => {
    navigate(`/courses/${courseId}/lecture`)
  }

  return (
    <div className="min-h-screen relative w-full  mt-16  text-[#999DAA]">
      <div className="px-6 sm:px-12 md:px-20 py-10 flex flex-col gap-4 bg-[#161D29]">
        <div className="text-lg text-gray-400">
          Home / Learning / <span className="text-white">{CourseData?.courseName}</span>
        </div>

        <h1 className="text-2xl md:text-3xl font-bold text-white max-w-4xl">
          {`The Complete ${CourseData?.courseName} Bootcamp From Zero to Hero in ${CourseData?.courseName}`}
        </h1>

        <p className="text-base max-w-2xl">
          {CourseData?.courseDescription || " This course for beginners course will help you to become Zero to Hero. Learn  Programming in an Easy Way."}
        </p>

        <div className="flex flex-wrap gap-4  items-center text-sm">
          <div className="flex items-center gap-1 text-yellow-400 text-base">
            {rating}{" "}
            {[...Array(5)].map((_, i) => (
              <FaStar key={i} />
            ))}
          </div>
          <span>({ratingsCount} ratings)</span>
          <span>{users} users</span>
        </div>

        <div className="text-white font-medium text-base">
          Instructor : {`${CourseData?.Instructor.firstName}  ${CourseData?.Instructor.lastName}` || "Shivam Sharma"} 
        </div>

        <div className="flex flex-wrap gap-6 text-sm mt-2">
          <div className="flex gap-2 items-center">
            <BiSolidErrorCircle className="text-lg" />
            Created at {(CourseData?.createdAt)?.toLocaleString() || Date.now()}
          </div>
          <div className="flex gap-2 items-center">
            <ImSphere className="text-lg" />
            Language: English
          </div>
        </div>
      </div>

      <div className="second border-2 mx-20 my-10 border-[#999DAA] h-auto p-10 w-[60vw]">
        <h1 className="text-3xl font-bold text-white mb-4">
          What you will learn
        </h1>

        

        <ul className="list-disc list-inside text-[#C5C7D4] text-md space-y-2">
  {(CourseData?.whatYouWillLearn?.length > 0
    ? CourseData?.whatYouWillLearn
    : [
       "Understand core programming concepts such as variables, data types, and control structures",
  "Write clean, efficient, and well-structured code using best practices",
  "Debug and troubleshoot common programming errors and exceptions",
  "Implement functions and modularize your code for better reusability",
  "Work with arrays, lists, and collections to manage data effectively",
  "Understand and apply object-oriented programming principles like classes and inheritance",
  "Read from and write to files for basic input/output operations",
  "Use loops and conditionals to build dynamic program logic",
  "Understand the software development lifecycle and how to structure a project",
  "Build real-world mini-projects to apply learned concepts in practice"
      ]
  ).map((item, index) => (
    <li key={index}>{item}</li>
  ))}
</ul>

      </div>

      <div className="second border-2 mx-20 my-10  border-[#999DAA] h-auto p-10 w-[60vw]">
        <h1 className="text-3xl font-bold text-white mb-4">Course Content</h1>
        <div className="p flex justify-between">
          <ul className="flex gap-3">
           <li>{CourseData?.courseContent?.length} Section</li>
            <li>41 lectures</li>
            <li>2 h 30min </li>
          </ul>

          <div className="text-xl text-[#FFD60A] mr-20 font-semibold">Collapse all Sections</div>
        </div>

        {CourseData?.courseContent?.map((item, index) => (
          <div key={index}>
            {/* Section Header */}
            <div className="content max-w-[50vw] flex justify-start items-center border-2 border-[#424854] bg-[#2C333F] text-2xl font-semibold mr-auto px-5 h-[8vh] mt-5">
              <div className="section flex gap-2 w-full justify-start items-center">
                <FaChevronUp
                  onClick={() => handleIconClick(index)}
                  className={`cursor-pointer transition-all ease-in-out duration-500 ${
                    iconup[index] ? "rotate-180" : ""
                  }`}
                />
                <div className="text-xl flex justify-between items-center w-full font-semibold text-white">
                <p> {item?.sectionName}</p> 
                <p className="text-lg font-semibold text-[#FFD60A]">{`${item?.subSection?.length} Lectures`}</p>
                </div>
              </div>
            </div>

            {/* Subsections */}
            {iconup[index] && (
              <div className="content max-w-[50vw] transition-all ease-in-out duration-500 flex justify-start items-center border-2 border-[#424854] text-2xl font-semibold mr-auto px-5 py-4">
                <div className="text-lg text-white">
                  <ul className="list-disc ml-5">
                    {item?.subSection.map((sub, i) => (
                      <li className="flex gap-2"><IoMdVideocam className="text-[#FFD60A] mt-1 "/> {sub.title}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>



      <div className="p h-auto rounded-lg absolute top-14 flex flex-col justify-center items-center right-20 bg-[#2C333F] w-[25vw]">

        <div className="img rounded-lg h-[220px] w-full">
          <img src={CourseData?.thumbnail} alt=""  className="w-full h-full object-cover bg-green-300"/>
        </div>

        <div className="sec p-8 flex w-full flex-col gap-4">
          <div className="p text-2xl font-bold text-white">Rs. {CourseData.price}</div>
          <div className="btn w-full">
            <button className="bg-[#FFD60A] cursor-pointer text-black font-semibold w-full rounded-sm p-2">
              Add to Cart
            </button>
          </div>
          <div onClick={handleVideoShow} className="btn w-full">
              <button className="bg-[#161D29] cursor-pointer text-white font-semibold w-full rounded-sm p-2">
              Buy Now
            </button>
          </div>

          <p className="text-center">30-Day Money-Back Guarantee</p>

          <div className="s t">
            <h1 className="text-white text-lg">This course includes:</h1>
            <ul className="text-[#06D6A0] flex flex-col mt-3 gap-1 font-semibold text-[14px]">
              <li className="flex gap-2 items-center"> <FaClock/> 8 hours on-demand video</li>
              <li className="flex gap-2 items-center"><FaArrowPointer/> Full Lifetime access</li>
              <li className="flex gap-2 items-center"><IoTv/> Access on Mobile and TV</li>
              <li className="flex gap-2 items-center"><PiCertificateFill/> Certificate of completion</li>
            </ul>
          </div>
        </div>



      </div>
    </div>
  );
};

export default EachCourse;
