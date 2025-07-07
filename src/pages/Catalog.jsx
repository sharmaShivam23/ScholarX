

import React, { useEffect, useState } from "react";
import FirstPage from "../components/catalogcore/FirstPage";
import CarouselCourses from "../components/catalogcore/CarouselCourses";
import { CategoryCourse } from "../services/apis";
import { apiConnect } from "../services/apiconnect";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Catalog = () => {
  const { CategoryId  , coursePath} = useSelector((state) => state.Category);
  const [courses, setCourses] = useState([]);
  const [name, setname] = useState([]);
  const [des, setdes] = useState([]);
  const navigate = useNavigate()

  
  useEffect(() => {
    console.log("course", courses);
  }, [CategoryId]);

  useEffect(() => {
    const fetchCourses = async () => {
      const toastId = toast.loading("Loading courses...");

      try {
        const response = await apiConnect(
          "POST",
          CategoryCourse.CATEGORY_COURSE_API,
          {
            categoryId: CategoryId,
          }
        );

        console.log(response);

        if (response?.data?.success) {
          setCourses(response?.data?.response?.course || []);
          setname(response?.data?.response?.name);
          setdes(response?.data?.response?.description);
          toast.success("Courses loaded", { id: toastId });
          // navigate(`/catalog/${coursePath}`)
        } else {
          toast.error(response?.data?.message || "Failed to fetch courses", {
            id: toastId,
          });
        }
      } catch (err) {
        console.error("API error:", err);
        toast.error("Error loading courses", { id: toastId });
      }
    };

    if (CategoryId) {
      fetchCourses();
    }
  }, [CategoryId]);

  useEffect(() => {
    console.log("c", CategoryId);
    console.log(courses);
  }, [CategoryId]);

  return (
    <div className="mt-16 text-[#999DAA] w-full min-h-screen">
      <FirstPage name={{ name }} des={{ des }} />

      <div className="sec p-5 sm:p-10 md:p-20">
        <h1 className="text-3xl sm:text-4xl text-white font-semibold">
          Courses to get you started
        </h1>

        <div className="h mb-4">
          <ul className="flex mt-7 justify-start text-lg gap-6 text-white">
            <li className="cursor-pointer hover:underline">Most Popular</li>
            <li className="cursor-pointer hover:underline">New</li>
            <li className="cursor-pointer hover:underline">Trending</li>
          </ul>
          <hr className="mt-3 border-gray-600" />
        </div>

        <div className="mt-10">
          {courses.length > 0 ? (
            <CarouselCourses courses={courses} />
          ) : (
            <p className="text-white mt-4">
              No courses found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
