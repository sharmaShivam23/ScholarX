import React, { useEffect } from "react";
import { FaStar } from "react-icons/fa6";
import { setCourseId } from "../../slices/CategoryCourse";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { apiConnect } from "../../services/apiconnect";
import { getEachCourse } from "../../services/apis";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { setCourseData } from "../../slices/CategoryCourse";
const CarouselCourses = ({ id, courses }) => {
  const { courseId } = useSelector((state) => state.Category);
  const navigate = useNavigate()
  const dispatch = useDispatch();

  const handleClick = async (id) => {
   

    const toastId = toast.loading("Loading course...");

    try {
      const response = await apiConnect(
        "GET",
        getEachCourse(id).GET_COURSE_API
      );

      // console.log(response);
      

      if (response?.data?.success) {
        toast.success("Course loaded successfully", { id: toastId })
        navigate(`/catalog/courses/${courseId}`)
         dispatch(setCourseId(id));
         dispatch(setCourseData(response?.data?.data))

      } else {
        toast.error(response?.data?.message || "Failed to load course", {
          id: toastId,
        });
      }
    } catch (err) {
      console.error("Error fetching course:", err);
      toast.error("Something went wrong while loading course", { id: toastId });
    }
  };

  return (
    <div className="p-4 sm:p-8 md:p-12 flex justify-evenly items-center w-full  flex-wrap lg:p-12">
      {courses.map((item, index) => (
        // <Link to={`/catalog/courses/${courseId}`}>
          <div
            key={index}
            onClick={() => handleClick(item._id)}
            className="w-full max-w-sm border-2 mt-10 cursor-pointer border-white  shadow-lg hover:shadow-xl transition-shadow duration-300 mx-auto p-6 flex flex-col items-start text-left space-y-4"
          >
            <img
              src={item.thumbnail}
              alt="Course thumbnail"
              className="w-full h-48 object-cover rounded-xl"
            />

            <p className="text-white text-md">
              {item.coursedescription
                ? item.coursedescription
                : " Lorem ipsum dolor sit amet consectetur, adipisicing elit. Alias molestiae, vel perspiciatis excepturi quisquam explicabo laboriosam, natus libero omnis."}
            </p>

            <h3 className="font-semibold text-xl text-white">
              {item.courseName ? item.courseName : "Python"}
            </h3>

            <div className="flex items-center gap-1 text-yellow-500 text-lg">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} />
              ))}
            </div>

            <div className="text-md text-2xl font-bold  text-blue-400">
              Rs. {item.price}
            </div>
          </div>
       
      ))}
    </div>


  );
};

export default CarouselCourses;
