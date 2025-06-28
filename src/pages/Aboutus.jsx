import React from "react";
import HighlightText from "../components/cores/Homepage/HighlightText";
import Shadowbtn from "../components/cores/Homepage/Shadowbtn";
import { FaArrowRight } from "react-icons/fa";
import Women from "../assets/images/Women.png";
import about from "../assets/images/about.png";
import { AboutData } from "../components/Data/AboutData";
import { AboutData2 } from "../components/Data/Aboutdata2";
import YellowArrowBtn from "../components/cores/Homepage/YellowArrowBtn";
import Contact from "../components/core/Contact";
const Aboutus = () => {
  return (
    <div className="bg-[#000814]  text-white">
      <FirstPage />
      <SecondPage />
      <ThirdPage />
      <ForthPage />
      <FifthPage />
      <Contact/>
    </div>
  );
};

export default Aboutus;

const FirstPage = () => {
  const images = [
    {
      img: Women,
    },
    {
      img: Women,
    },
    {
      img: Women,
    },
  ];

  return (
    <>
      <div className="head relative  flex justify-center items-center flex-col h-[65vh] gap-4 bg-[#2C333F]  text-center">
        <div className="btn">
          <div className="btn shadow-[0px_1px_2px_rgba(255,255,255,0.6)]   flex border- bg-[#161D29]  sm:p- sm:px-8 px-5 py-3 rounded-4xl text-[#999DAA]">
            <p className="txt text-[#999DAA] font-[500] text-xs sm:text-lg">
              About Us
            </p>
            <div className="icon flex justify-center items-center ml-2 sm:mt-1.5 mt-1 text-[#999DAA] font-[600]">
              <FaArrowRight />
            </div>
          </div>
        </div>
        <div className="txt sm:text-4xl text-2xl font-bold mt-2">
          Driving Innovation in Online Education for a <br />
          <HighlightText text="Brighter Future" />
        </div>
        <div className="content text-[#838894] sm:text-lg text-xs font-[550] sm:max-w-[50vw] mt-2">
          Studynotion is at the forefront of driving innovation in online
          education. We're passionate about creating a brighter future by
          offering cutting-edge courses, leveraging emerging technologies, and
          nurturing a vibrant learning community.
        </div>
      </div>

      <div className="sec relative bottom-20">
        <div className="img flex justify-center gap-20 items-center flex-wrap ">
          {images.map((item, index) => (
            <img
              src={item.img}
              className="h-[350px] w-[350px] object-cover"
              alt=""
            />
          ))}
        </div>
        <div className="flex justify-start">
          <div className="txt2 font-[600] text-xl sm:text-3xl mt-20 p-10 sm:max-w-[60vw] text-start">
            We are passionate about revolutionizing the way we learn. Our
            innovative platform <HighlightText text="combines technology" />,
            <span className="text-[#FF512F]">expertise</span> , and community to
            create an{" "}
            <span className="text-[#F9D423]">
              unparalleled educational experience.
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

const SecondPage = () => {
  return (
    <>
      <div className="second p-10 flex-col sm:flex-row h-auto gap-10 sm:gap-0 border-t-2 border-[#2C333F] sm:p-16 text-[#838894] flex justify-center items-center w-full">
        <div className="left sm:p-20 text-md font-[550] w-full sm:w-1/2">
          <div className="head flex justify-center items-start flex-col text-xl sm:text-4xl text-left font-[600] mb-7 text-red-500">
            Our Founding Story
          </div>
          <div className="txt text-xs sm:text-lg">
            our e-learning platform was born out of a shared vision and passion
            for transforming education. It all began with a group of educators,
            technologists, and lifelong learners who recognized the need for
            accessible, flexible, and high-quality learning opportunities in a
            rapidly evolving digital world <br />
            <br />
            As experienced educators ourselves, we witnessed firsthand the
            limitations and challenges of traditional education systems. We
            believed that education should not be confined to the walls of a
            classroom or restricted by geographical boundaries. We envisioned a
            platform that could bridge these gaps and empower individuals from
            all walks of life to unlock their full potential.
          </div>
        </div>
        <div className="right w-full flex justify-center items-center sm:w-1/2">
          <img
            src={about}
            className="object-cover h-[30vh] sm:h-[50vh]"
            alt=""
          />
        </div>
      </div>
    </>
  );
};

const ThirdPage = () => {
  return (
    <div className="p h-auto max-w-[88vw] flex-col gap-10 sm:gap-0 sm:flex-row flex justify-center items-center py-32 text-left m-auto p-10">
      <div className="left flex w-full sm:w-1/2 justify-center flex-col items-start">
        <h1 className="sm:text-3xl text-xl font-bold mb-5 text-[#E65C00]">
          OUR VISION
        </h1>
        <p className="sm:text-lg text-xs text-[#838894]  sm:w-[36vw]">
          With this vision in mind, we set out on a journey to create an
          e-learning platform that would revolutionize the way people learn. Our
          team of dedicated experts worked tirelessly to develop a robust and
          intuitive platform that combines cutting-edge technology with engaging
          content, fostering a dynamic and interactive learning experience.
        </p>
      </div>

      <div className="right flex w-full sm:w-1/2 justify-center flex-col items-start">
        <h1 className="sm:text-3xl text-xl font-bold mb-5">
          <HighlightText text="OUR MISSION" />
        </h1>
        <p className="sm:text-lg text-xs text-[#838894] sm:w-[36vw]">
          Our mission goes beyond just delivering courses online. We wanted to
          create a vibrant community of learners, where individuals can connect,
          collaborate, and learn from one another. We believe that knowledge
          thrives in an environment of sharing and dialogue, and we foster this
          spirit of collaboration through forums, live sessions, and networking
          opportunities.
        </p>
      </div>
    </div>
  );
};

const ForthPage = () => {
  return (
    <div className="p  h-[30vh] bg-[#161D29] flex-wrap flex-col sm:flex-row w-screen flex justify-evenly items-center">
      {AboutData.map((item, index) => (
        <div  key={index} className="d flex justify-center gap-4 items-center flex-col">
          <p className="text-3xl  font-bold">{item.number}</p>
          <p className="text-md  text-[#585D69] font-[500]">{item.txt}</p>
        </div>
      ))}
    </div>
  );
};



const FifthPage = () => {
  return (
    <div className="h-auto w-full flex justify-center items-center py-10 px-4 sm:px-10">
      <div className="grid gap-6 w-full max-w-[1300px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        
      
        <div className="col-span-1 sm:col-span-2 h-auto rounded-xl p-6 flex flex-col justify-start items-start">
          <h2 className="font-bold text-left text-lg sm:text-xl mt-2 text-black dark:text-white">
            World-Class Learning for{" "}
            <HighlightText text="Anyone, Anywhere" />
          </h2>
          <p className="text-left text-sm sm:text-base mt-3 text-[#4B5563]">
            Studynotion partners with more than 275+ leading universities and
            companies to bring flexible, affordable, job-relevant online learning to
            individuals and organizations worldwide.
          </p>
          <div className="mt-4">
            <YellowArrowBtn text="Learn More" />
          </div>
        </div>

      
        {AboutData2.map((item, index) => (
          <div
            key={index}
            className={`
              h-auto min-h-[260px] p-5 
              flex flex-col justify-start items-start
              ${item.active ? "bg-[#161D29]" : "bg-[#2C333F]"}
              ${item.color === "transparent" ? "hidden" : ""}
              ${item.head === "Certification" ? "col-span-1 sm:col-start-2" : ""}
            `}
          >
            <p className="text-xl font-bold text-white">{item.head}</p>
            <p className="text-sm font-medium text-[#9CA3AF] mt-2">{item.txt}</p>
          </div>
        ))}
      </div>
    </div>
  );
};


