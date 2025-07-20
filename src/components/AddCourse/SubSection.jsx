import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { setSubSectionToggle } from "../../slices/CourseSlice";
import { useDispatch } from "react-redux";
import YellowArrowBtn from "../cores/Homepage/YellowArrowBtn";
import { apiConnect } from "../../services/apiconnect";
import { SubSectionName } from "../../services/apis";
import { useMemo, useEffect } from "react";
import toast from "react-hot-toast";
import { setTotalSubSections } from "../../slices/CourseSlice";
import { setState } from "../../slices/CourseSlice";

// updatedSubSection
const SubSection = ({nextPage , setNextPage}) => {
  const { subSectionToggle, TotalSubSections , SectionId } = useSelector(
    (state) => state.Course
  );
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    video: null,
    title: "",
    description: "",
    sectionId: SectionId,
  });

  // useEffect(() => {
  //   console.log("x", TotalSubSections);
  // }, []);

   useEffect(() => {
    if (SectionId) {
      // console.log("Section ID is set:", SectionId);
      setFormData(prev => ({ ...prev, SectionId }));
    }
  }, [SectionId]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, video: e.target.files[0] }));
  };

  const videoPreviewUrl = useMemo(() => {
    return formData.video ? URL.createObjectURL(formData.video) : null;
  }, [formData.video]);

  // 🧹 Clean up URL when component unmounts or video changes
  useEffect(() => {
    return () => {
      if (videoPreviewUrl) {
        URL.revokeObjectURL(videoPreviewUrl);
      }
    };
  }, [videoPreviewUrl]);

  const handleCross = () => {
    dispatch(setSubSectionToggle(false));
  };
   
   const handleVideoClick = () => {
    setFormData((prev) => ({ ...prev, video: null }));
   }

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(formData);
    const form = new FormData();
    form.append("video", formData.video);
    form.append("title", formData.title);
    form.append("description", formData.description);
    form.append("sectionId", formData.sectionId);
    

    if(!valid()){
      return
    }

    const toastId = toast.loading("Creating Sub-Section for your Course...");

    try {
      const response = await apiConnect(
        "POST",
        SubSectionName.CREATE_SUB_SECTION_API,
        form
      );
      // console.log(response);
      if (response?.data?.success === true) {
        dispatch(setSubSectionToggle(false));
        toast.success(response?.data?.message, { id: toastId });
        // dispatch(setState(3)); 
        setNextPage(true)
        // Assuming this is to set the state to "2" after creating a subsection
        const newSection = response?.data.createSub;  
const newSubsection = response?.data?.createSub; // this is the created subsection
  const sectionId = formData.sectionId;
dispatch(setTotalSubSections({
    ...TotalSubSections,
    [sectionId]: [
      ...(TotalSubSections[sectionId] || []),
      newSubsection,
    ]
  }));
      }
    } catch (Error) {
      // console.log(Error);
      toast.error(Error?.response?.data?.message, { id: toastId });
    }
  };

  const valid = () => {
    if(!formData.video){
      toast.error("Uploaded Video is required")
      return false;
    }

    if(!formData.title){
       toast.error("Title is required")
      return false;
    }

    if(!formData.description){
       toast.error("Description is required")
      return false;
    }

    return true

  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#161D29]/60 backdrop-blur-sm">
      <div className="bg-[#1E2532] rounded-xl p-8 shadow-lg w-[90%] max-w-[600px]">
        <div
          onClick={handleCross}
          className="c float-right cursor-pointer text-2xl font-bold mb-1"
        >
          <RxCross2 />
        </div>

        <form onSubmit={handleSubmit}>
          {/* Video Upload */}
          <div className="mb-6">
            <label
              htmlFor="video"
              className="text-md font-medium text-white mb-2 block"
            >
              Video
            </label>
            <div className="w-full h-[250px] bg-[#2C333F] border border-dashed border-white flex items-center justify-center rounded-xl cursor-pointer overflow-hidden">
              {formData.video ? (
                <div className="flex flex-col">
                <video
                  src={videoPreviewUrl}
                  className="w-full h-full object-contain rounded-xl"
                  controls
                />
                
                </div>
              ) : (
                <label
                  htmlFor="video"
                  className="flex flex-col items-center justify-center text-white cursor-pointer"
                >
                  <FaCloudUploadAlt className="text-4xl text-[#FFD60A]" />
                  <p className="text-md font-semibold mt-2">Upload Video</p>
                  <p className="text-xs text-center">
                    Drag and drop a video, or browse
                    <br />
                    Max 12MB
                  </p>
                </label>
              )}
              <input
                type="file"
                id="video"
                name="video"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <div onClick={handleVideoClick} className="p text-white cursor-pointer z-50 text-center underline">Cancel</div>

          {/* Title Input */}
          <div className="mb-6">
            <label
              htmlFor="title"
              className="text-md font-medium text-white mb-2 block"
            >
              Course Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              placeholder="Enter course title"
              className="h-[60px] w-full bg-[#2C333F] text-white placeholder:font-semibold pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)] outline-none"
            />
          </div>

          {/* Description Input */}
          <div>
            <label
              htmlFor="description"
              className="text-md font-medium text-white mb-2 block"
            >
              Course Description
            </label>
            <input
              type="text"
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              placeholder="Enter description"
              className="h-[60px] w-full bg-[#2C333F] text-white placeholder:font-semibold pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)] outline-none"
            />
          </div>

          <div className="mt-5 w-full flex justify-end">
            <YellowArrowBtn text="Save" type="button" className="" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default SubSection;
