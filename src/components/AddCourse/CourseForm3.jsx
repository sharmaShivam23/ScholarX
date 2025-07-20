import React from "react";
import YellowBtn from "../cores/Homepage/YellowBtn";
import Shadowbtn from "../cores/Homepage/Shadowbtn";
import { useSelector, useDispatch } from "react-redux";
import { setCourse, setState } from "../../slices/CourseSlice";
import { updateCourseStatus } from "../../services/apis";
import { apiConnect } from "../../services/apiconnect";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { setState } from "../../slices/CourseSlice";
// import { useDispatch } from "react-redux";

const CourseForm3 = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { Course  } = useSelector((state) => state.Course);

  const handleSave = () => {
    // console.log("clicked");
    
    toast.success("Course Added Successfully");
    navigate("/dashboard/my-courses");
    dispatch(setState(1))
  };

  const handlePublic = async (e) => {
    const newStatus = e.target.checked ? "Published" : "Draft";
    const toastId = toast.loading("Updating Status...");

    try {
      const response = await apiConnect("PUT", updateCourseStatus.COURSE_STATUS_API, {
        courseId: Course._id,
        status: newStatus,
      });

      if (response?.data?.data) {
        dispatch(setCourse(response.data.data));
        toast.success(response?.data?.message, { id: toastId });
      } else {
        console.warn("Course status updated, but no course data returned.");
      }
    } catch (err) {
      // console.error("Error updating course status:", err);
      toast.error(err?.response?.data?.message || "Error updating status", {
        id: toastId,
      });
    }
  };

  return (
    <div className="bg-[#2C333F] max-w-[95%] mb-10 m-auto w-full lg:max-w-[600px] mx-auto rounded-xl p-8 mt-10 shadow-md">
      <h2 className="text-2xl font-semibold text-white mb-6">Publish Settings</h2>

      <div className="flex items-start space-x-3 mb-8">
        <input
          type="checkbox"
          onChange={handlePublic}
          checked={Course?.status === "Published"}
          name="public"
          id="public"
          className="w-5 h-5 text-[#FFD60A] accent-[#FFD60A] mt-1 cursor-pointer"
        />
        <label
          htmlFor="public"
          className="text-white text-md cursor-pointer select-none"
        >
          Make this course public
        </label>
      </div>

      <div className="flex flex-wrap gap-4 justify-end">
        <Shadowbtn text="Back" />
        <div onClick={handleSave} className="b">
        <YellowBtn  text="Save Changes" />
        </div>
      </div>
    </div>
  );
};

export default CourseForm3;
