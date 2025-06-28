


// import React from 'react'
// import { FaStar } from "react-icons/fa6";
// import Women from "../../../assets/images/Women.png"
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const ReviewCard = () => {

//   // Data array should be above the settings
//   const data = [
//     {
//       img : Women,
//       name : "shivam sharma",
//       email : "shivamsharma@gmail.com",
//       text : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
//       rate : "4.5"
//     },
//     {
//       img : Women,
//       name : "shivam sharma",
//       email : "shivamsharma@gmail.com",
//       text : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
//       rate : "4.5"
//     },
//     {
//       img : Women,
//       name : "shivam sharma",
//       email : "shivamsharma@gmail.com",
//       text : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
//       rate : "4.5"
//     },
//     {
//       img : Women,
//       name : "shivam sharma",
//       email : "shivamsharma@gmail.com",
//       text : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
//       rate : "4.5"
//     },
//   ];

  
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 2,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     arrows: false,
//     pauseOnHover: false,
//     // responsive: [
//     //   {
//     //     breakpoint: 1024,
//     //     settings: {
//     //       slidesToShow: Math.min(3, data.length),
//     //     }
//     //   },
//     //   {
//     //     breakpoint: 768,
//     //     settings: {
//     //       slidesToShow: Math.min(2, data.length),
//     //     }
//     //   },
//     //   {
//     //     breakpoint: 480,
//     //     settings: {
//     //       slidesToShow: 1,
//     //     }
//     //   }
//     // ]
//   };

//   return (
//     <div className="parent bg-red-400 gap-10  w-[90vw] mt-20">
      
//         <Slider {...settings}>
//          <div className="sli flex flex-row">
//          {data.map((item, index) => (
//   <div key={index} className="box w-[20px] h-[250px] bg-[#161D29]">
//     <div className="sec1 p-5 flex gap-5">
//       <div className="pht w-[60px] h-[60px] bg-green-400 object-cover rounded-full">
//         <img src={item.img} className='object-cover w-[60px] h-[60px] rounded-full' alt="" />
//       </div>
//       <div className="details text-xs flex text-left font-[550] mt-1 flex-col">
//         <p className="name text-lg text-[#AFB2BF]">{item.name}</p>
//         <div className="email text-md text-[#6E727F]">{item.email}</div>
//       </div>
//     </div>

//     <div className="text text-[#C5C7D4] text-md text-left px-5">
//       {item.text}
//     </div>

//     <div className="rating flex gap-3 p-5 text-xl">
//       <div className="num text-yellow-600 font-bold">{item.rate}</div>
//       <div className="stars flex gap-1 text-2xl">
//         <FaStar className='text-yellow-600'/>
//         <FaStar className='text-yellow-600'/>
//         <FaStar className='text-yellow-600'/>
//         <FaStar className='text-yellow-600'/>
//         <FaStar/>
//       </div>
//     </div>
//   </div>
// ))}
// </div>
//         </Slider>
//       </div>

//   )
// }

// export default ReviewCard;



import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { FaStar } from "react-icons/fa6";
import Women from "../../../assets/images/Women.png"

const ReviewCard = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const data = [
    {
      img : Women,
      name : "shivam sharma",
      email : "shivamsharma@gmail.com",
      text : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
      rate : "4.5"
    },
    {
      img : Women,
      name : "shivam sharma",
      email : "shivamsharma@gmail.com",
      text : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
      rate : "4.5"
    },
    {
      img : Women,
      name : "shivam sharma",
      email : "shivamsharma@gmail.com",
      text : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
      rate : "4.5"
    },
    {
      img : Women,
      name : "shivam sharma",
      email : "shivamsharma@gmail.com",
      text : "Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
      rate : "4.5"
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 1200,
    slidesToShow: 2,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    arrows: true,
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
      <div className="max-w-[88vw]  m-auto   h-[60vh]  flex-col text-white flex justify-center items-center overflow-hidden">
        <div className="h-auto psud border-2  bg-blue-[200px]  text-white sm:p-9 w-full  mx-auto">

          <Slider {...settings}>
            {data.map((item, index) => (
           <div key={index}>
                <div
                  key={index}
                  className="w-[270px] h-[320px] flex justify-center items-center bg-white rounded-lg"
                >
                  <div className="flex justify-center   items-center flex-col">
                    <div className="flex justify-center items-center">
                      <img
                        src=""
                        alt=""
                        className="h-56 object-contain"
                      />
                    </div>

                    <div className="txt text-black text-lg font-[550] flex justify-center items-center text-center">
                      njnjjnjn
                    </div>

                   
            
                  </div>
                </div>
                {/* <div key={index} className="box w-[20px] h-[250px] bg-[#161D29]">
           <div className="sec1 p-5 flex gap-5">
             <div className="pht w-[60px] h-[60px] bg-green-400 object-cover rounded-full">
               <img src={item.img} className='object-cover w-[60px] h-[60px] rounded-full' alt="" />
             </div>
             <div className="details text-xs flex text-left font-[550] mt-1 flex-col">
               <p className="name text-lg text-[#AFB2BF]">{item.name}</p>
               <div className="email text-md text-[#6E727F]">{item.email}</div>
             </div>
           </div>

           <div className="text text-[#C5C7D4] text-md text-left px-5">
             {item.text}
           </div>

           <div className="rating flex gap-3 p-5 text-xl">
             <div className="num text-yellow-600 font-bold">{item.rate}</div>
             <div className="stars flex gap-1 text-2xl">
               <FaStar className='text-yellow-600'/>
               <FaStar className='text-yellow-600'/>
               <FaStar className='text-yellow-600'/>
               <FaStar className='text-yellow-600'/>
               <FaStar/>
             </div>
           </div>
         </div> */}
                </div>
            ))}
          </Slider>
        </div>
      </div>
      </>
  );
};

export default ReviewCard;