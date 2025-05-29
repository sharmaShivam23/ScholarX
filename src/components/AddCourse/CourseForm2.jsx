

import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import YellowArrowBtn from "../cores/Homepage/YellowArrowBtn";
import { CreateCourse } from "../../services/apis";
import { apiConnect } from "../../services/apiconnect";
import { useSelector } from "react-redux";
import { IoIosAddCircle } from "react-icons/io";
import { SectionName } from "../../services/apis";


const CourseForm2 = () => {

  const [benefitArray , setData] = useState(["khkkl"])
  const {token} = useSelector((state) => state.auth);
  const {user} = useSelector((state) => state.profile);
  const userId = user._id


  const [formData, setFormData] = useState({
    sectionName: "",
    courseId : "680b8abb2df6766c51ef251d"
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

      setFormData({ ...formData, [name]: value });

  };


  // const handleKeyDown = (e) => {
  //   console.log(e.key);
    
  //   if (e.key === "Enter") {
  //     e.preventDefault();
  //     handleAdd();
  //   }
  // };
  
  // const handleAdd = (key) => {
  //   console.log(key);
  //   console.log(formData.benefits);
  //    setData((prev) => [...prev , formData.whatYouWillLearn])
  //    setFormData((prev) => ({ ...prev, whatYouWillLearn: [""] }));
  //  }
 


  // const handleRemove = (name) => {
  //   setData(benefitArray.filter((item) => item != name) );
  //   console.log(name);
    

  // }
  
  // const handleFileChange = (e) => {
  //   setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
  //   // setFormData({ ...formData, thumbnail: e.target.files[0] });
  // };

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData);
    
    try{
      const response = await apiConnect('POST' , SectionName.CREATE_SECTION_API , formData)
      console.log(response);
      
    }catch(Err){
      console.log(Err);
      
    }
  }



 
  return (
    <div className="w-[45vw] h-auto  flex-col text-white flex justify-center items-center mt-10 p-10 rounded-2xl border-[#2C333F] bg-[#161D29]">
      <form action="" onSubmit={handleSubmit}>
        <h1 className="text-3xl font-semibold">Course Builder</h1>
      <div className="flex justify-center mt-10 flex-col w-[40vw] gap-5">
        {/* Title */}
        <div>
          <label htmlFor="sectionName" className="text-md font-[400]">
            Section Name
          </label>
          <input
            type="text"
            id="sectionName"
            name="sectionName"
            value={formData.sectionName}
            onChange={handleInputChange}
            placeholder="Add a section name"
            className="h-[60px] w-full bg-[#2C333F] mt-3 placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
          />
        </div>

      </div>

      <div className="btn w-[200px] h-[50px] mt-10 rounded-lg gap-3 font-bold text-[#FFD60A] border-[1px] border-[#FFD60A] flex justify-center items-center ">
        Create Section  <IoIosAddCircle className="text-[#FFD60A] text-2xl"/>
      </div>
     
     
      <div className="b flex justify-end w-full mt-6 items-center">
         
        <YellowArrowBtn text="Next"/>
      </div>
      </form>
    </div>

  );
};

export default CourseForm2;
