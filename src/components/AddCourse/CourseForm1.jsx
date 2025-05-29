import React, { useEffect, useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { RxCross1 } from "react-icons/rx";
import YellowArrowBtn from "../cores/Homepage/YellowArrowBtn";
import { CreateCourse } from "../../services/apis";
import { apiConnect } from "../../services/apiconnect";
import { useSelector } from "react-redux";
import { categories } from "../../services/apis";
import CourseForm2 from "./CourseForm2";
import toast from "react-hot-toast";
import { setState } from "../../slices/CourseSlice";
import { useDispatch } from "react-redux";

const CourseForm1 = () => {
  const [benefitInput, setBenefitInput] = useState("");
  const [benefitArray, setBenefitArray] = useState([]);

  const { token } = useSelector((state) => state.auth);
  const { stateCourse } = useSelector((state) => state.Course);
  const { user } = useSelector((state) => state.profile);
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();

  const userId = user._id;

  const [formData, setFormData] = useState({
    courseName: "",
    courseDescription: "",
    price: "",
    category: "",
    tag: "",
    thumbnail: null,
    whatYouWillLearn: [],
  });

  const handleBenefitChange = (e) => {
    setBenefitInput(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    if (user && user._id) {
      setFormData((prev) => ({ ...prev, userId: user._id }));
    }
  }, [user]);

  const handleKeyDown = (e) => {
    console.log(e.key);

    if (e.key === "Enter") {
      e.preventDefault();
      handleAdd();
    }
  };

  const handleAdd = () => {
    if (benefitInput.trim() === "") return;

    setBenefitArray((prev) => [...prev, benefitInput.trim()]);
    setFormData((prev) => ({
      ...prev,
      whatYouWillLearn: [...prev.whatYouWillLearn, benefitInput.trim()],
    }));
    setBenefitInput(""); // clear input
  };

  const handleRemove = (itemToRemove) => {
    const updatedArray = benefitArray.filter((item) => item !== itemToRemove);
    setBenefitArray(updatedArray);
    setFormData((prev) => ({
      ...prev,
      whatYouWillLearn: updatedArray,
    }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, thumbnail: e.target.files[0] }));
    // setFormData({ ...formData, thumbnail: e.target.files[0] });
  };

  useEffect(() => {
  
    const fetchCategories = async () => {
      try {
        const response = await apiConnect("GET", categories.CATEGORIES_API);
        console.log("cat", response.data.response);
        setCategoryData(response.data.response);
         
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
     const toastId = toast.loading("Creating Course...");

    try {
      const data = new FormData();
      data.append("courseName", formData.courseName);
      data.append("courseDescription", formData.courseDescription);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("tag", formData.tag);
      data.append("whatYouWillLearn", formData.whatYouWillLearn);
      data.append("thumbnail", formData.thumbnail);
      console.log("io", CreateCourse.CREATECOURSE_API);
      console.log(token);

      const response = await apiConnect(
        "POST",
        CreateCourse.CREATECOURSE_API,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success(response.data.message, {id : toastId})
      if(response.data.success == true){
        dispatch(setState(2))
        console.log("state" , stateCourse);
        ClearFields()

      }
      console.log(response);
    } catch (Err) {
      console.log("bhbh",Err);
      toast.error(Err.response.data.message, {id : toastId})
    }
  };


  function ClearFields(){
    setFormData({
      courseName: "",
      courseDescription: "",
      price: "",
      category: "",
      tag: "",
      thumbnail: null,
      whatYouWillLearn: [],
    });
    setBenefitArray([])
    setBenefitInput("")

   
    
  }

  
  return (
    <div className="w-[45vw]  flex-col text-white flex justify-center items-center mt-10 p-10 rounded-2xl border-[#2C333F] bg-[#161D29]">
      <form action="" onSubmit={handleSubmit}>
        <div className="flex justify-center flex-col w-[40vw] gap-5">
          {/* Title */}
          <div>
            <label htmlFor="courseName" className="text-md mb-1.5 font-[400]">
              Course Title
            </label>
            <input
              type="text"
              id="courseName"
              name="courseName"
              value={formData.courseName}
              onChange={handleInputChange}
              placeholder="Enter Course courseName"
              className="h-[60px] w-full bg-[#2C333F] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
            />
          </div>

          {/* Description */}
          <div>
            <label
              htmlFor="courseDescription"
              className="text-md mb-1.5 font-[400]"
            >
              Description
            </label>
            <textarea
              id="courseDescription"
              name="courseDescription"
              value={formData.courseDescription}
              onChange={handleInputChange}
              placeholder="Enter course courseDescription"
              rows={4}
              className="w-full bg-[#2C333F] placeholder:font-[600] pl-3 pt-2 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
            />
          </div>

          {/* Price */}
          <div>
            <label htmlFor="price" className="text-md mb-1.5 font-[400]">
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleInputChange}
              placeholder="Enter course price"
              className="h-[60px] w-full bg-[#2C333F] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
            />
          </div>

          {/* Category */}
          <div>
            <label htmlFor="category" className="text-md mb-1.5 font-[400]">
              Category
            </label>
            <select
              id="category"
              name="category"
              value={formData.category}
              onChange={handleInputChange}
              className="h-[60px] w-full bg-[#2C333F] text-white placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
            >
              <option value="">Select a category</option>
              {categoryData.map((item, index) => (
                <option key={index} value={item._id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Tags */}
          <div>
            <label htmlFor="tag" className="text-md mb-1.5 font-[400]">
              Tags
            </label>
            <input
              type="text"
              id="tag"
              name="tag"
              value={formData.tag}
              onChange={handleInputChange}
              placeholder="eg. JavaScript, Web, React"
              className="h-[60px] w-full bg-[#2C333F] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
            />
          </div>

          {/* Thumbnail */}
          <div>
            <label htmlFor="thumbnail" className="text-md mb-1.5 font-[400]">
              Thumbnail
            </label>
            <div className="w-full h-[150px] bg-[#2C333F] border border-dashed border-white flex items-center justify-center rounded-xl cursor-pointer">
              {formData.thumbnail ? (
                <img
                  src={URL.createObjectURL(formData.thumbnail)}
                  alt={formData.thumbnail.name}
                  className="w-full h-full object-cover rounded-xl"
                />
              ) : (
                <label
                  htmlFor="thumbnail"
                  className="flex flex-col items-center justify-center cursor-pointer"
                >
                  <FaCloudUploadAlt className="text-4xl text-[#FFD60A]" />
                  <p className="text-md font-[500] text-white mt-2">
                    Upload Thumbnail
                  </p>
                  <p className="text-xs text-center">
                    drag and drop an image, or Browse <br />
                    Max 6MB each (12MB for videos)
                  </p>
                </label>
              )}
              <input
                type="file"
                id="thumbnail"
                // name="thumbnail"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </div>

          <input
            type="text"
            value={benefitInput}
            id="whatYouWillLearn"
            name="whatYouWillLearn"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAdd();
              }
            }}
            onChange={handleBenefitChange}
            placeholder="Benefit"
            className="h-[50px] mb-2 w-full bg-[#2C333F] placeholder:font-[600] pl-3 rounded-xl shadow-[0px_1px_2px_rgba(255,255,255,0.6)]"
          />

          <div
            onClick={handleAdd}
            className="btn cursor-pointer text-lg font-bold text-yellow-400 ml-2"
          >
            Add
          </div>

          <ul className="mt-3 flex gap-4 flex-wrap">
            {benefitArray.map((item, index) => (
              <li
                key={index}
                className="flex gap-2 bg-[#2C333F] max-w-max p-2 rounded-2xl"
              >
                {item}
                <RxCross1
                  onClick={() => handleRemove(item)}
                  className="mt-1 text-red-500 text-xl font-bold cursor-pointer"
                />
              </li>
            ))}
          </ul>
        </div>

        <button className="w-full flex justify-end" type="submit">
            <p className="b flex justify-end w-full items-center">
        <YellowArrowBtn text="Next" />
      </p>
        </button>
      </form>
    
    </div>
  );
};

export default CourseForm1;
