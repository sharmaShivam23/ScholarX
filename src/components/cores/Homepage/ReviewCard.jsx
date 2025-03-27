// import React from 'react'
// import { FaStar } from "react-icons/fa6";
// import Women from "../../../assets/images/Women.png"
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const ReviewCard = () => {
  
//   const settings = {
//     dots: false,
//     infinite: true,
//     speed: 800,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 4000,
//     arrows: false,
//     pauseOnHover: false,
//   };
//   const data = [
//     {
//     img : Women,
//     name : "shivam sharma",
//     email : "sgivamshram@gmail.com",
//     text : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
//     rate : "4.5"
//   },
//     {
//     img : Women,
//     name : "shivam sharma",
//     email : "sgivamshram@gmail.com",
//     text : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
//     rate : "4.5"
//   },
//     {
//     img : Women,
//     name : "shivam sharma",
//     email : "sgivamshram@gmail.com",
//     text : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
//     rate : "4.5"
//   },
//     {
//     img : Women,
//     name : "shivam sharma",
//     email : "sgivamshram@gmail.com",
//     text : " Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatibus ipsum dolor lorem?",
//     rate : "4.5"
//   },
// ]
//   return (
//     <div className='parent my-14 max-w-[1200px] flex justify-center flex-wrap items-center gap-3'>
//     <Slider {...settings}>
//       {data.map((item, index) => (
//        <div key={index} className="box w-[350px] h-[250px] bg-[#161D29]">
//         <div   className="sec1 p-5 flex gap-5">
//           <div className="pht w-[60px] h-[60px] bg-green-400 object-cover rounded-full">
//             <img src={item.img} className='object-cover w-[60px] h-[60px] rounded-full' alt="" />
//           </div>
//           <div className="details text-xs flex text-left font-[550] mt-1 flex-col">
//             <p className="name text-lg text-[#AFB2BF]">{item.name}</p>
//             <div className="email text-md text-[#6E727F]">{item.email}</div>
//           </div>
//         </div>

//         <div className="text text-[#C5C7D4] text-md text-left px-5">
//         {item.text}
//         </div>

//         <div className="rating flex gap-3 p-5 text-xl">
//           <div className="num text-yellow-600 font-bold">{item.rate}</div>
//           <div className="stars flex gap-1 text-2xl">
//             <FaStar className='text-yellow-600'/>
//             <FaStar className='text-yellow-600'/>
//             <FaStar className='text-yellow-600'/>
//             <FaStar className='text-yellow-600'/>
//             <FaStar/>
//           </div>
//         </div>

//        </div>
//        ))}
//        </Slider>
//     </div>
//   )
// }

// export default ReviewCard


import React from 'react'
import { FaStar } from "react-icons/fa6";
import Women from "../../../assets/images/Women.png"
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ReviewCard = () => {

  // Data array should be above the settings
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
    speed: 800,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: false,
    pauseOnHover: false,
    // responsive: [
    //   {
    //     breakpoint: 1024,
    //     settings: {
    //       slidesToShow: Math.min(3, data.length),
    //     }
    //   },
    //   {
    //     breakpoint: 768,
    //     settings: {
    //       slidesToShow: Math.min(2, data.length),
    //     }
    //   },
    //   {
    //     breakpoint: 480,
    //     settings: {
    //       slidesToShow: 1,
    //     }
    //   }
    // ]
  };

  return (
    <div className="parent  w-[90vw] mt-20">
      <div className="">
        <Slider {...settings}>
         {data.map((item, index) => (
  <div key={index} className="box w-[350px] h-[250px] bg-[#161D29]">
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
  </div>
))}
        </Slider>
      </div>
    </div>
  )
}

export default ReviewCard;


