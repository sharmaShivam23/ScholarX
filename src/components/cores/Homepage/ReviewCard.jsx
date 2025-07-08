;



import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa6";
import Women from "../../../assets/images/Women.png"
import img from "../../../assets/ReviewImages/img.svg"
import img4 from "../../../assets/ReviewImages/img4.svg"
import img5 from "../../../assets/ReviewImages/img5.svg"
import img3 from "../../../assets/ReviewImages/img3.svg"
const ReviewCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
const data = [
  {
    img: Women,
    name: "Aisha Verma",
    email: "aisha.verma@example.com",
    text: "This platform truly elevated my learning experience. The video content is concise and very practical!",
    rate: 4.5,
  },
  {
    img: img,
    name: "Rohit Sharma",
    email: "rohit.sharma@example.com",
    text: "I loved the structure and ease of understanding. Instructors are highly skilled.",
    rate: 5,
  },
  {
    img: img4,
    name: "Neha Kapoor",
    email: "neha.kapoor@example.com",
    text: "The dashboard is intuitive and the flow is smooth. I completed 3 courses in a month!",
    rate: 4,
  },
  {
    img: img5,
    name: "Amanina Rani",
    email: "aman.singh@example.com",
    text: "Support was very responsive and helpful. I recommend this platform to my peers.",
    rate: 4.8,
  },
  {
    img: img3,
    name: "Pooja Mehra",
    email: "pooja.mehra@example.com",
    text: "The interactive quizzes really helped solidify my understanding. Great experience overall!",
    rate: 4.7,
  },
  {
    img: Women,
    name: "Ankit Jain",
    email: "ankit.jain@example.com",
    text: "Course material is top-notch. Everything is well explained with examples.",
    rate: 4.6,
  },
  {
    img: Women,
    name: "Sneha Roy",
    email: "sneha.roy@example.com",
    text: "Very beginner-friendly platform. The certification process was also smooth.",
    rate: 4.2,
  },
  {
    img: Women,
    name: "Devansh Malhotra",
    email: "devansh.m@example.com",
    text: "From UI to content, everything feels premium. Would love to see more advanced topics too.",
    rate: 4.9,
  },
];


  const settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  
  };

  
      
  return (
    <>
      <div className="max-w-[98vw]  m-auto   h-auto  flex-col t flex justify-center items-center overflow-hidden">
        <div className="h-auto psud b  bg-blue-[200px]  sm:p-9 w-full  mx-auto">

         <Slider {...settings}>
  {data.map((item, index) => (
    <div className="px-[10px]" key={index}>
      <div
        className="min-w-[300px] sm:min-w-[300px] sm:h-[270px] flex-col p-5 gap-4 h-auto text-start flex justify-center bg-[#161D29] "
      >
        {/* Profile Info */}
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 justify-start">
          <div className="rounded-full overflow-hidden w-[60px] h-[60px]">
            <img
              src={item.img}
              className="object-cover w-full h-full rounded-full"
              alt="img"
            />
          </div>
          <div className="flex flex-col items-center sm:items-start">
            <div className="text-lg font-bold text-[#AFB2BF]">
              {item.name}
            </div>
            <div className="text-sm text-[#6E727F]">{item.email}</div>
          </div>
        </div>

        {/* Review Text */}
        <div className="text-sm sm:text-lg text-[#AFB2BF] text-center sm:text-start w-full">
          {item.text}
        </div>

        {/* Rating */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
          <div className="text-xl">{item.rate}</div>
          <div className="flex gap-1 text-2xl text-yellow-600">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar className="text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  ))}
</Slider>

        </div>
      </div>
      </>
  );
};

export default ReviewCard;