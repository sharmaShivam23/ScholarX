import React, { useState, useEffect } from "react";
import YellowIconBtn from "../components/cores/Homepage/YellowIconBtn";
import { IoIosAddCircle } from "react-icons/io";
import { getInstructorCourses, deleteCourse } from "../services/apis";
import { apiConnect } from "../services/apiconnect";
import { useSelector } from "react-redux";
import { FaClock, FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { RiDeleteBin2Fill } from "react-icons/ri";
import toast from "react-hot-toast";
import Loading from "../components/common/Loading";

const MyCourses = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  const [courses, setCourse] = useState([]);
  const [loading , setLoading] = useState(false)

  const handleClick = () => {
    navigate("/dashboard/add-course");
  };

  const getCourses = async () => {
    setLoading(true)
    try {
      const response = await apiConnect(
        "GET",
        getInstructorCourses(user._id).INSTRUCTOR_COURSES_API
      );
      setCourse(response?.data?.data);
    } catch (error) {
      // console.log(error);
      toast.error(error?.response?.data?.message || "failed");
    }
    finally{
      setLoading(false)
    }
  };

  const handleDelete = async (courseId) => {
    const toastId = toast.loading("Deleting course...");
    try {
      const response = await apiConnect("DELETE", deleteCourse.DELETE_COURSE_API, {
        courseId,
        userId: user._id,
      });
      toast.success(response?.data?.message, { id: toastId });
      getCourses();
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message, { id: toastId });
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  return (
    <div className="w-full min-h-screen md:max-w-[85vw] border-2  ml-auto p-4 md:p-10 lg:p-20 mt-16 overflow-x-hidden">
     
      <div className="max-w-7xl mx-auto w-full">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-6">
          <h1 className="text-3xl sm:text-3xl font-semibold text-white">My Courses</h1>
          <div onClick={handleClick}>
            <YellowIconBtn text="Add Course" icon={<IoIosAddCircle />} />
          </div>
        </div>

        {/* Table Header */}
        <div className="hidden sm:flex border border-[#999DAA] text-[#999DAA] font-semibold text-sm sm:text-base mt-10 px-4 py-3 justify-between">
          <div>COURSES</div>
          <div className="flex gap-6 sm:gap-10">
            <span>DURATION</span>
            <span>PRICE</span>
            <span>ACTIONS</span>
          </div>
        </div>

        {/* Course List */}
         {loading ? <Loading/> : (
        <div className="flex  flex-col gap-6 mt-6">
          {courses.length > 0 ? (
            courses.map((courseDetail, index) => (
              <div
                key={index}
                className="flex flex-col sm:flex-row justify-between  gap-4 sm:gap-6 border border-[#999DAA] border-t-0 p-4 sm:p-6 rounded-md bg-[#1C1F26]"
              >
                {/* Left Side - Image + Info */}
                <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                 
                    <img
      src={courseDetail?.thumbnail}
      alt={courseDetail?.courseName}
      className="h-40 sm:h-40 w-full sm:w-56 rounded-md object-cover"
    />


                  {/* Details */}
                  <div className="text-white  font-medium text-sm sm:text-base space-y-2">
                    <div>{courseDetail?.courseName}</div>
                    <div className="text-[#BBBBBB] ">{courseDetail?.whatYouWillLearn}</div>
                    <div>Created: {new Date(courseDetail?.createdAt).toLocaleString()}</div>
                    <div
                      className={`flex items-center gap-2 text-xs font-bold px-3 py-1 w-max rounded-xl ${
                        courseDetail.status === "Draft" ? "text-[#F37290]" : "text-green-400"
                      } bg-[#2C333F]`}
                    >
                      <FaClock />
                      {courseDetail?.status}
                    </div>
                  </div>
                </div>
                

                {/* Right Side - Actions */}
                <div className="flex items-center justify-between sm:justify-end gap-6 sm:gap-10 text-white font-semibold text-base sm:text-lg">
                  <div>{courseDetail?.duration || `${Math.floor(Math.random() * 10)}h ${Math.floor(Math.random() * 61)}min`}</div>
                  <div>{courseDetail?.price || "1000"}</div>
                  <div className="flex gap-4 text-xl">
                    <button
                      onClick={() => handleDelete(courseDetail._id)}
                      className="text-red-500 hover:scale-110 transition"
                      title="Delete"
                    >
                      <RiDeleteBin2Fill />
                    </button>
                    <button
                      onClick={() => navigate(`/dashboard/edit-course/${courseDetail._id}`)}
                      className="text-green-400 hover:scale-110 transition"
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <h1 className="text-center text-2xl sm:text-4xl font-bold text-white mt-10">
              No Course Found
            </h1>
          )}

          
        </div>
        )}
      </div>
      
    </div>
    
  );
};

export default MyCourses;
