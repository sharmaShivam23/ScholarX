import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import YellowArrowBtn from "../cores/Homepage/YellowArrowBtn";
// import { CreateCourse, DeleteSubSection } from "../../services/apis";
import { apiConnect } from "../../services/apiconnect";
import { useSelector } from "react-redux";
import { IoIosAddCircle } from "react-icons/io";
import { SectionName } from "../../services/apis";
import toast from "react-hot-toast";
import { RxDropdownMenu } from "react-icons/rx";
import { IoAddCircleSharp } from "react-icons/io5";
import SubSection from "./SubSection";
import {
  setState,
  setSubSectionToggle,
  setTotalSubSections,
} from "../../slices/CourseSlice";
import { useDispatch } from "react-redux";
import { setSectionToggle } from "../../slices/CourseSlice";
import { setTotalSections, setSectionId } from "../../slices/CourseSlice";
import { RiDeleteBin5Fill } from "react-icons/ri";
import { DeleteSection } from "../../services/apis";
import { DeleteSubSection } from "../../services/apis";


const CourseForm2 = () => {
  const [benefitArray, setData] = useState(["khkkl"]);
  const { token } = useSelector((state) => state.auth);
  const { Course } = useSelector((state) => state.Course);
  const { user } = useSelector((state) => state.profile);
  const userId = user._id;
  const [editSectionName, setEditSectionName] = useState(false);
  const [subSectionVisible, setSubSectionVisible] = useState(true);
  const [showSubsection, setShowSubSection] = useState({});
  const [nextPage , setNextPage] = useState(false)
  const dispatch = useDispatch();
  const {
    subSectionToggle,
    SectionToggle,
    TotalSections,
    TotalSubSections,
    CourseId,
    SectionId,
  } = useSelector((state) => state.Course);

  const [formData, setFormData] = useState({
    sectionName: "",
    // courseId: "6861145ec22defcda946e5eb",
    courseId : CourseId,
  });

  const handleNext = () => {
    if(nextPage){
      dispatch(setState(3))
    }
    else {
      toast.error("Please create a section ans sub section first");
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (CourseId) {
      // console.log("Course ID is set:", CourseId);
      setFormData((prev) => ({ ...prev, CourseId }));
    }
  }, [CourseId]);

  const handleSubsectionOpen = () => {
    dispatch(setSubSectionToggle(true));
  };

 
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!valid()) {
      return;
    }
    

    const finalFormData = {
      ...formData,
      CourseId,
    };

    if (!valid(finalFormData)) return;
    // console.log(formData);
    const toastId = toast.loading("Creating Section...");

    try {
      const response = await apiConnect(
        "POST",
        SectionName.CREATE_SECTION_API,
        finalFormData
      );
      // console.log(response?.data.Section);
      const newSection = response?.data?.Section;
      dispatch(setTotalSections([...TotalSections, newSection]));
      dispatch(setSectionId(newSection._id));
      // console.log("new", newSection._id);
     
      if (response?.data?.success === true) {
        dispatch(setSectionToggle(true));
         toast.success(response?.data?.message, { id: toastId });
      }
     
      ClearForm();
    } catch (Err) {
      // console.log(Err);
      toast.error(Err?.response?.data?.message, { id: toastId });
    }
  };

  const valid = () => {
    if (!formData.sectionName) {
      toast.error("Section name is required");
      return false;
    }
    return true;
  };

  const ClearForm = () => {
    setFormData({ ...formData, sectionName: "" });
    // setFormData(formData);
  };

  const handleDropDownMenu = (sectionId) => {
    // setShowSubSection((prev) => !prev);
    setShowSubSection((prev) => ({
    ...prev,
    [sectionId]: !prev[sectionId],
  }));
  };

  const handleSectionDelete = async (id) => {
    const toastId = toast.loading("Deleting Section...");
    try {
      const response = await apiConnect(
        "DELETE",
        DeleteSection.DELETE_SECTION_API,
        { sectionId: id }
      );

      if (response?.data?.success === true) {

        // Remove from Redux
        dispatch(
          setTotalSections(
            TotalSections.filter((section) => section._id !== id)
          )
        );
        toast.success(response?.data?.message, { id: toastId });
        
      }
    } catch (err) {
      // console.log(err);
      toast.error(err?.response?.data?.message || "Error deleting section", {
        id: toastId,
      });
    }
  };

  const DeletesubSection = async (id, index) => {
    const toastId = toast.loading("Deleting Sub Section...");
    console.log("Delete Sub-Section called with ID:", id);
    try {
      const response = await apiConnect(
        "DELETE",
        DeleteSubSection.DELETE_Sub_SECTION_API,
        { subsectionId: id }
      );

      if (response?.data?.success === true) {
        // Remove from Redux
        dispatch(
          setTotalSubSections(
            TotalSubSections.filter((section) => section._id !== id)
          )
        );
        toast.success(response?.data?.message, { id: toastId });
      }
    } catch (err) {
      // console.log(err);
      toast.error(err?.response?.data?.message || "Error deleting section", {
        id: toastId,
      });
    }
    // const toastId = toast.loading("Deleting Sub-Section...");
  };

  return (
    <div className="md:w-[45vw]  max-w-[95%] mb-10 m-auto h-auto  flex-col text-white flex justify-center items-center mt-10 p-10 rounded-2xl border-[#2C333F] bg-[#161D29]">
      <form className="w-full" action="">
        <h1 className="text-3xl font-semibold">Course Builder</h1>
        <div className="flex justify-center mt-10 flex-col w-full md:w-[40vw] gap-5">
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

        <div
          onClick={handleSubmit}
          type="submit"
          className="btn cursor-pointer w-[200px] h-[50px] mt-5 rounded-lg gap-3 font-bold text-[#FFD60A] border-[1px] border-[#FFD60A] flex justify-center items-center "
        >
          {editSectionName ? "Edit Section" : "Create Section"}
          <IoIosAddCircle className="text-[#FFD60A] text-2xl" />
        </div>

        {TotalSections.length > 0 &&  TotalSections.map(
          (section, index) =>
            SectionToggle && (
              <div
                key={section.id || index}
                className="p bg-[#424854] h-auto p-5 mt-5 rounded-2xl"
              >
                <div className="icon mb-1 flex text-xl">
                  <RxDropdownMenu
                    onClick={() => handleDropDownMenu(section._id)}
                    className="text-3xl  cursor-pointer"
                  />
                  <div className="p ml-3 text-lg w-full font-bold">
                    {section.sectionName}
                  </div>
                  <div className="del flex justify-end w-full mt-2">
                    <RiDeleteBin5Fill
                      className="cursor-pointer"
                      onClick={() => handleSectionDelete(section._id)}
                    />
                  </div>
                </div>

                <hr />

                {showSubsection[section._id] && (
                  <>
                    {TotalSubSections[section._id]?.map((subSection, subIndex) => (
                    // {TotalSubSections.map((subSection, subIndex) => (
                      <div key={subSection._id || subIndex} className="sub">
                        <div className="p bg-[#424854] h-auto p-5 mt-5 rounded-2xl">
                          <div className="icon mb-1 flex text-xl">
                            <RxDropdownMenu className="text-3xl cursor-pointer" />
                            <div className="p ml-3 w-full text-lg font-bold">
                              {subSection.title}
                            </div>
                            <div className="del flex justify-end w-full mt-2">
                              <RiDeleteBin5Fill
                                onClick={() =>
                                  DeletesubSection(subSection._id, subIndex)
                                }
                                className="cursor-pointer"
                              />
                            </div>
                          </div>
                          <hr />
                        </div>
                      </div>
                    ))}

                    <div
                      onClick={handleSubsectionOpen}
                      className="add text-[#FFD60A] font-bold items-center cursor-pointer flex gap-2 text-md mt-5 ml-3"
                    >
                      <IoAddCircleSharp className=" text-lg items-center flex md:text-2xl" /> Add Lecture
                    </div>
                  </>
                )}
              </div>
            )
        )}

        <div  onClick={handleNext} className={`b flex justify-end ${!nextPage ? "opacity-50 cursor-not-allowed disabled" : ""} w-full mt-6 items-center`}>
          {/* <YellowArrowBtn text="Next"  className = {`${!nextPage ? "opacity-50 cursor-not-allowed" : ""} `} /> */}
          {!nextPage ? (
            <>
             <button disabled className="cursor-not-allowed">Next</button>
             </>
          ) : (
            //  <button disabled className="cursor-not-allowed">Next</button>
            <YellowArrowBtn text="Next" />
          )}
          
        
        </div>
      </form>

      {subSectionToggle && <SubSection nextPage={nextPage} setNextPage={setNextPage} />}
    </div>
  );
};

export default CourseForm2;


