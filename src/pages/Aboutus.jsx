import React from "react";
import HighlightText from "../components/cores/Homepage/HighlightText";
import Shadowbtn from "../components/cores/Homepage/Shadowbtn";
import { FaArrowRight } from "react-icons/fa";
import Women from "../assets/images/Women.png"
import about from "../assets/images/about.png"
const Aboutus = () => {
  return (
    <div className="bg-[#000814]  text-white">
      <FirstPage />
      <SecondPage/>
    </div>
  );
};

export default Aboutus;



const FirstPage = () => {

  const images = [
    {
      img :Women
    },
    {
      img :Women
    },
    {
      img :Women
    },
  ]

  return (
    <>
      <div className="head relative flex justify-center items-center flex-col h-[65vh] gap-4 bg-[#2C333F]  text-center">
        <div className="btn">
          <div className="btn shadow-[0px_1px_2px_rgba(255,255,255,0.6)]  flex border- bg-[#161D29]  sm:p- sm:px-8 px-5 py-3 rounded-4xl text-[#999DAA]">
            <p className="txt text-[#999DAA] font-[500] text-xs sm:text-lg">
              About Us
            </p>
            <div className="icon flex justify-center items-center ml-2 sm:mt-1.5 mt-1 text-[#999DAA] font-[600]">
              <FaArrowRight />
            </div>
          </div>
        </div>
        <div className="txt text-4xl font-bold mt-5">
          Driving Innovation in Online Education for a <br />
          <HighlightText text="Brighter Future" />
        </div>
        <div className="content text-[#838894] text-lg font-[550] sm:max-w-[50vw] mt-2">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
        </div>
      </div>

      <div className="sec relative bottom-20">
      <div className="img flex justify-center gap-20 items-center flex-wrap ">
        {images.map((item , index) => (
          <img src={item.img} className="h-[350px] w-[350px] object-cover" alt="" />
        ))}
        </div>
        <div className="flex justify-center items-center">
        <div className="txt2 font-[600] text-3xl mt-20 p-10 sm:max-w-[60vw] text-center">
        We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text="combines technology"/>,<span className="text-[#FF512F]">expertise</span> , and community to create an <span className="text-[#F9D423]">unparalleled educational experience.</span> 
        </div>
        </div>
      </div>
    </>
  );
};




const SecondPage = () => {
  return(
    <>
    <div className="second p-10 border-t-2 border-[#2C333F] sm:p-16 text-[#838894] flex justify-center items-center w-full">
    <div className="left p-20 text-md font-[550] w-full sm:w-1/2">
    <div className="head flex justify-center items-center flex-col text-4xl text-left font-[600] mb-7 text-red-500">
    Our Founding Story 
    </div>
    <div className="txt">
    ur e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world <br/><br/>
    As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.
    </div>
    </div>
    <div className="right w-full flex justify-center items-center sm:w-1/2">
     <img src={about} className="object-cover h-[50vh]" alt="" />
    </div>
    </div>
    </>
  )
}
