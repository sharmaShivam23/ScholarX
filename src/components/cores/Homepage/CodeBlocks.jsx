import React from "react";
import HighlightText from "./HighlightText";
import YellowArrowBtn from "./YellowArrowBtn";
import Shadowbtn from "./Shadowbtn";
import { TypeAnimation } from "react-type-animation";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const CodeBlocks = ({
  text,
  highlighttext,
  textafter,
  bigtext,
  btntext,
  active,
}) => {

   const navigate = useNavigate()
 const { token } = useSelector((state) => state.auth);
 const handleClick = () => {
  if(token){
    navigate("/dashboard/my-profile")
  }
  else{
  navigate("/signup")
  }
 }
  return (
    <div
      className={`flex justify-center items-center ${
        active ? "sm:flex-row" : "sm:flex-row-reverse"
      } flex-col mx-0  w-full sm:mx-44  gap-8 text-left sm:my-24 my-16`}
    >
      <div className="first sm:w-1/2 w-10/12 m-8 sm:m-0  sm:px-10 px-0">
        <p className="largehead text-4xl font-bold">
          {text} <HighlightText text={highlighttext} /> {textafter}
        </p>
        <p className="content text-xl font-[500] text-[#999DAA] mt-7 pr-4">
          {bigtext}
        </p>
        <div onClick={handleClick} className="btn mt-12 flex gap-8 ">
          <YellowArrowBtn text={btntext} />
          <Shadowbtn text="Learn more" />
        </div>
      </div>

      <div className="second bg-[#111E3261] text-xs sm:text-lg backdrop-blur-xl  font-[600] sm:w-1/2 w-10/12 m-8 sm:m-0 p-6">
      
        <p className="flex gap-5 mt-[3.5px]">
          <p>1</p>
          <p className="text-amber-200">
            <TypeAnimation
              sequence={[`<!DOCTYPE html>`, 1000]}
              speed={10}
              repeat={Infinity}
            />
          </p>
        </p>
        <p className="flex gap-5 mt-[3.5px]">
          <p>2</p>
          <p>
            <TypeAnimation sequence={[`<html>`, 500]} speed={50} repeat={0} />
          </p>
        </p>
        <p className="flex gap-5 mt-[3.5px]">
          <p>3</p>
          <p>
            <TypeAnimation
              sequence={[`<head><title>Example</title>`, 500]}
              speed={10}
              repeat={Infinity}
            />
          </p>
        </p>
        <p className="flex gap-5 mt-[3.5px]">
          <p>4</p>
          <p>
            {`<link `}
            <span className="text-red-500 blur-[0.5px]">
              <TypeAnimation
                sequence={[
                  `rel="stylesheet" href="style.css" type="text/css"`,
                  500,
                ]}
                speed={10}
                repeat={Infinity}
              />
            </span>
            {` />`}
          </p>
        </p>
        <p className="flex gap-5 mt-[3.5px]">
          <p>5</p>
          <p>
            <TypeAnimation
              sequence={[`</head><body>`, 500]}
              speed={10}
              repeat={Infinity}
            />
          </p>
        </p>
        <p className="flex gap-5 mt-[3.5px]">
          <p>6</p>
          <p>
            {`<h1>`}
            <a className="text-red-500 blur-[0.5px]" href="/">
              Welcome to <span className="text-red-500">My Website</span>
            </a>
            {`</h1>`}
          </p>
        </p>
        <p className="flex gap-5 mt-[3.5px]">
          <p>7</p>
          <p>
            <TypeAnimation sequence={[`<nav>`, 500]} speed={50} repeat={0} />
          </p>
        </p>
        <p className="flex gap-5 mt-[3.5px]">
          <p>8</p>
          <p>
            {`<a href="one/">`}
            <span className="text-red-500 blur-[0.5px]">
              <TypeAnimation
                sequence={[`One Section`, 500]}
                speed={10}
                repeat={Infinity}
              />
            </span>
            {`</a>`}
            <a href="two/">
              {" "}
              <span className="text-red-500 blur-[0.5px]">
                <TypeAnimation
                  sequence={[`Two Section`, 500]}
                  speed={10}
                  repeat={Infinity}
                />
              </span>
            </a>
          </p>
        </p>
        <p className="flex gap-5 mt-[3.5px]">
          <p>9</p>
          <p>
            {`<a href="three/">`}
            <span className="text-red-500 blur-[0.5px]">
              <TypeAnimation
                sequence={[`Three Section - Learn More`, 500]}
                speed={10}
                repeat={Infinity}
              />
            </span>
            {`</a>`}
          </p>
        </p>
        <p className="flex gap-5 mt-[3.5px]">
          <p>10</p>
          <p>
            <TypeAnimation sequence={[`</nav>`, 500]} speed={50} repeat={0} />
          </p>
        </p>
        <p className="flex gap-5 mt-[3.5px]">
          <p>11</p>
          <p>
            {`<footer>`}
            <span className="text-red-500 blur-[0.5px]">
              <TypeAnimation
                sequence={[`Contact Us at example@email.com`, 500]}
                speed={10}
                repeat={Infinity}
              />
            </span>
            {`</footer>`}
          </p>
        </p>
        <p className="flex gap-5 mt-[3.5px]">
          <p>12</p>
          <p>
            <TypeAnimation
              sequence={[`</body></html>`, 500]}
              speed={10}
              repeat={Infinity}
            />
          </p>
        </p>
      </div>
    </div>
  );
};

export default CodeBlocks;
