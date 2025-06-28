import React from "react";
import { FaArrowRight } from "react-icons/fa";
import homeimage from "../assets/images/homeimage.svg";
import homevideo from "../assets/images/homevideo.mp4";
import HighlightText from "../components/cores/Homepage/HighlightText";
import YellowBtn from "../components/cores/Homepage/YellowBtn";
import Shadowbtn from "../components/cores/Homepage/Shadowbtn";
import YellowArrowBtn from "../components/cores/Homepage/YellowArrowBtn";
import CodeBlocks from "../components/cores/Homepage/CodeBlocks";
import homebg from "../assets/images/homebg.svg";
import homebg2 from "../assets/images/homebg2.png";
import homeimg2 from "../assets/images/homeimg2.png";
import { sec6 } from "../components/cores/Homepage/HomeSec6";
import Floatcards from "../components/cores/Homepage/Floatcards";
import Women from "../assets/images/Women.png";
import ReviewCard from "../components/cores/Homepage/ReviewCard";
import ExploreMore from "../components/cores/Homepage/ExploreMore";


const Home = () => {
  return (
    <div className="bg-[#000814] mt-20  text-white flex  justify-center items-center flex-col   text-center overflow-x-hidden">
      {/* section1 */}
      <div className="sec1 flex justify-center items-center mt-4 p-7  sm:p-16 flex-col">
        <div className="btn shadow-[0px_1px_2px_rgba(255,255,255,0.6)]  flex border- bg-[#161D29]  sm:p- sm:px-8 px-5 py-3 rounded-4xl text-[#999DAA]">
          <p className="txt text-[#999DAA] font-[500] text-xs sm:text-lg">
            Become an Instructor
          </p>
          <div className="icon flex justify-center items-center ml-2 sm:mt-1.5 mt-1 text-[#999DAA] font-bold">
            <FaArrowRight />
          </div>
        </div>

        <div className="heading flex lg:text-4xl sm:text-3xl text-2xl font-[650] mt-12 gap-2">
          <p className="txt text-white">
            Empower Your Future with <HighlightText text="Coding Skills" />
          </p>
        </div>

        <p className="para  mt-7 text-[#999DAA] text-xs sm:text-xl">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a <br /> wealth of resources,
          including hands-on projects, quizzes, and personalized feedback from
          instructors.
        </p>

        <div className="buttons flex justify-center  flex-row items-center gap-[30px] mt-10 font-bold">
          <YellowBtn text="Learn More" px="px-5" />
          <Shadowbtn text="Book a demo" />
        </div>
      </div>

      {/* section2 */}
      <div className="img sm:p-10 m-8">
        <video
          controls
          autoPlay
          loop
          muted
          className="sm:h-[65vh]  h-[300px] object-cover  drop-shadow-[15px_15px_0px_rgb(255,255,255)] shadow-[-2px_-2px_2px_rgb(191,219,254)]"
          src={homevideo}
        ></video>
      </div>

      {/* section3 */}
      <div className="sec2 flex justify-center items-center flex-col sm:mx-44">
        <CodeBlocks
          text="Unlock Your"
          highlighttext="coding potential"
          textafter="with our online course"
          bigtext=" Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
          btntext="Try it yourself"
          active={true}
        />

        <CodeBlocks
          text="Start"
          highlighttext="coding in seconds"
          bigtext="Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
          btntext="Continue lesson"
          active={false}
        />
      </div>

      {/* section 4 */}
      <div className="cards">
        <h1 className="sm:text-3xl text-2xl font-bold">
          Unlock the <HighlightText text="Power of Code" />
        </h1>
        <h3 className="text-lg mt-2 text-[#838894] font-[500]">
          Learn to bulid anything you want
        </h3>
        <ExploreMore />

        <div className="img relative  z-10">
          <img src={homebg2} className=" h-[50vh] bg-red-400 z-10" alt="" />
          <div className="flex justify-center w-[100%] items-center gap-10 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <YellowArrowBtn text="Explore full catalog" />
            <Shadowbtn text="Learn More" />
          </div>
        </div>
      </div>

      {/* section5 */}
      <div className="sec5 h-auto w-[100%] text-white p-10 flex-col sm:flex-row sm:p-44 gap-14 text-left   flex  justify-center items-center">
        <div className="left lg:w-1/2 w-[100%] sm:p-10">
          <h1 className="text-4xl font-[600]">
            Get the skills you need for a
            <HighlightText text=" job that is in demand." />
          </h1>
        </div>

        <div className="right lg:w-1/2 w-[100%] text-lg  font-[500]">
          <p>
            The modern StudyNotion is the dictates its own terms. Today, to be a
            competitive specialist requires more than professional skills
          </p>
          <div className="relative top-6 sm:top-10">
            <YellowBtn text="Learn More" />
          </div>
        </div>
      </div>

      {/* section6 */}
      <div className="sec6 sm:p-20 p-8 h-auto  w-[100vw] flex flex-col sm:flex-row justify-center text-black items-center mt-0 bg-white">
        {/* Left Section */}
        <div className="left flex  flex-col h-full  w-full sm:w-1/2 p-1 justify-center items-center gap-4">
          <div className="left flex m-5 flex-col h-full w-full md:w-1/2 p-4 justify-center items-center gap-6">
            {sec6.map((item, index) => (
              <div key={index} className="flex items-start  gap-6 w-full">
                {/* Icon Section */}
                <div className="icon w-20 flex-shrink-0">
                  <img
                    src={item.icon}
                    alt={`Icon representing ${item.heading}`}
                    className="w-full h-auto rounded-md"
                  />
                </div>

                {/* Content Section */}
                <div className="content  text-left mt-4">
                  <h1 className="sm:text-lg text-sm font-bold">{item.heading}</h1>
                  <p className="para text-sm font-normal text-gray-600 leading-relaxed">
                    {item.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Section */}
        <div className="right h-full w-full sm:w-1/2 ">
        <div className="i relative">
          <img
            src={homeimg2}
            className="w-full h-full object-cover"
            alt="Background"
          />
          <div className="con w-[30vw] text-xs sm:text-lg text-left  font-bold h-[15vh] gap-10 absolute -bottom-15 left-34 flex justify-center items-center bg-[#014A32]">
            <div className="flex justify-center items-center gap-5">
              <div className="num text-5xl text-white">10</div>
              <p className="txt text-[#05A77B]">
                Years
                <br />
                Experiences
              </p>
            </div>
            <div className="h-[6vh] border-2 border-[#05A77B] "></div>
            <div className="flex justify-center items-center gap-5">
              <div className="num text-5xl text-white">250</div>
              <p className="txt text-[#05A77B]">
                Types of
                <br />
                Courses
              </p>
            </div>
          </div>
          </div>
        </div>
      </div>

      <div className="sec7 h-auto mt-0 text-black bg-white w-full p-10">
        <div className="head mt-6">
          <p className="heading text-3xl font-bold">
            Your swiss knife for{" "}
            <HighlightText text="learning any language"></HighlightText>{" "}
          </p>
          <p
            className="content text-lg mt-4 text-black text-center
        "
          >
            Using spin making learning multiple languages easy. with 20+
            languages realistic voice-over,
            <br /> progress tracking, custom schedule and more.
          </p>
        </div>

        <Floatcards />
        <div className="btn mt-24 flex justify-center items-center">
          <YellowArrowBtn text="Learn More" />
        </div>
      </div>

      <div className="sec7 h-auto w-[100vw] flex-col sm:flex-row sm:p-20 flex justify-between items-center">
        <div className="left mt-10 sm:w-1/2 w-full  flex justify-center items-center ">
          <img
            src={Women}
            className="sm:h-[60vh] h-[300px] w-[80vw] object-cover  sm:w-[38vw]  shadow-[0px_-16px_0px_rgb(255,255,255)]"
            alt=""
          />
        </div>
        <div className="right h-auto sm:w-1/2 mt-10 w-full flex px-6 sm:px-32 relative flex-col justify-center items-center  ">
          <div className="content">
            <p className="text-4xl font-bold  text-left ">
              Become an <br /> <HighlightText text="Instructor" />{" "}
            </p>
            <p className="sm:text-xl  text-sm text-[#838894]  mt-8 text-left">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>
          </div>
          <div className="btn mt-10 flex justify-start w-[100%]  left-32 bottom-56">
            <YellowArrowBtn text="Start Teaching Today" />
          </div>
        </div>
      </div>

      {/* section8 */}
      <div className="reviews mt-16">
        <h1 className="text-4xl font-[500] mx-6">
          Reviews from other learners
        </h1>
        <ReviewCard />
      </div>
    </div>

    // section7
  );
};

export default Home;
