import React, { useState } from "react";
import YellowIconBtn from "../components/cores/Homepage/YellowIconBtn";
import { IoIosAddCircle } from "react-icons/io";
import { useEffect } from "react";
import { getInstructorCourses } from "../services/apis";
import { apiConnect } from '../services/apiconnect';
import { useSelector } from "react-redux";
import { FaClock } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin2Fill } from "react-icons/ri";
import { FaEdit } from "react-icons/fa";
import { deleteCourse } from "../services/apis";
import toast from "react-hot-toast";
//  DELETE_COURSE_API
const MyCourses = () => {

  const {user} = useSelector((state) => state.profile)
  const handleClick = () => {
    navigate("/dashboard/add-course");
  }
  const navigate = useNavigate();
  const [courses , setCourse] = useState([])
  const getCourses = async () => {
    try {
      const response = await apiConnect(
        "GET",
        getInstructorCourses(user._id).INSTRUCTOR_COURSES_API
      )
      console.log("r",response);
      setCourse(response?.data?.data)
    } catch (error) {
      console.log(error);
    }
  };



  useEffect(() => {
    getCourses();
  }, []);

  const handleDelete = async (courseId) => {
    const toastId = toast.loading("Deleting course...");
    console.log("Deleting course with ID:", courseId);
   
    try{
    const response = await apiConnect("DELETE", deleteCourse.DELETE_COURSE_API, { courseId , userId: user._id });
     toast.success(response?.data?.message, { id: toastId });
     getCourses()
    console.log(response);
    
    }catch(err){
      console.log(err);
      toast.error(err?.response?.data?.message, { id: toastId });
      
    }
  }


  return (
    <div className="md:max-w-[85vw] overflow-x-hidden w-full p-10 md:p-20 ml-auto h-screen mt-16">
      <div className="content w-full md:max-w-[60vw] m-auto">
        {/* head */}
        <div className="hea flex-col sm:flex-row justify-center   flex md:justify-between">
          <p className="text-3xl font-semibold text-white flex justify-center items-center">
            My Courses
          </p>
          <div onClick={handleClick} className="btn">
            <YellowIconBtn text="Add Course" icon={<IoIosAddCircle />} />
          </div>
        </div>

        {/* table */}

        <div className="tb mt-14">
          <div className="head font-semibold text-lg">
            {/* head */}
            <ul className="sm:flex hidden border-[0.5px]  border-[#999DAA] p-3 text-[#999DAA] justify-between ">
              <div className="flex">
                <li className="mr-4">COURSES</li>
              </div>

              <div className="flex gap-8">
                <li>DURATION</li>
                <li>PRICE</li>
                <li>ACTIONS</li>
              </div>
            </ul>
          </div>

          {/* course */}
           {courses.length > 0 ? (
           courses.map((courseDetail , index) => (
          <div key={index} className="course h-auto text-lg text-[#999DAA] sm:flex-row flex-col flex justify-between border-[1px] border-t-0 border-[#999DAA] p-5">
            <div className="left flex gap-8">
              {/* <div className="img w-[250px] rounded-sm h-[150px] bg-green-50">
                <img
                  src={courseDetail?.thumbnail}
                  className="object-contain w-full h-full"
                  alt=""
                />
              </div> */}
             <div className="relative w-[250px] aspect-video rounded-sm overflow-hidden bg-green-50">
  <img
    src={courseDetail?.thumbnail}
    className="absolute top-0 left-0 w-full h-full object-cover"
    alt=""
  />
</div>


              <div className="details text-start">
                <ul className="flex  text-white font-semibold justify-evenly gap-3 flex-col">
                  <li>{courseDetail?.courseName}</li>
                  <li>{courseDetail?.whatYouWillLearn}</li>
                  <li>Created : {new Date(courseDetail?.createdAt).toLocaleString()}</li>
                  <li className={`flex font-bold gap-2 text-sm bg-[#2C333F] px-2  max-w-max p-1 rounded-xl  ${courseDetail.status == "Draft" ?  "text-[#F37290]" : "text-green-400"}`}><FaClock className="mt-1"/> {courseDetail?.status}</li>
                  {/* <li>{courseDetail?.price}</li> */}
                </ul>
              </div>
            </div>

            <div className="right">
              <ul className="flex gap-10 text-xl font-semibold ">
                <li>{courseDetail?.duration || "2h 30min"}</li>
                <li>{courseDetail?.price || "1000"}</li>
                <div className="i flex justify-center items-center gap-4 text-2xl">
                <li onClick={() => handleDelete(courseDetail._id)} className="cursor-pointer hover:text-red-500 transition-all ease-in-out duration-700 hover:scale-110"><RiDeleteBin2Fill/></li>
                <li  className="cursor-pointer transition-all hover:text-green-400 ease-in-out duration-700 hover:scale-110"><FaEdit/></li>
                </div>
              </ul>
            </div>
          </div>
          ))
          ) : (
            <h1 className="text-4xl font-bold text-white flex justify-center items-center mt-10">No Course found</h1>
          )}
        </div>
        
      </div>
    </div>
  );
};

export default MyCourses;
