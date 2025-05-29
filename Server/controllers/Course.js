const course = require("../model/Course");
const user = require("../model/user");
const Category = require("../model/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");


exports.createCourse = async (req, res) => {
  try {
    const {
      courseName,
      courseDescription,
      whatYouWillLearn,
      price,
      category, 
      tag, 
    } = req.body;


    const thumbnail  = req.files.thumbnail  


    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    if(!thumbnail){
      return res.status(401).json({
        success: false,
        message: "Thubmnail is required"
      });
    }


    const userId = req?.user?.id;

    if (!userId) {
      return res.status(401).json({
        success: false,
        message: "User not authenticated",
      });
    }

    const InstructorDetails = await user.findById(userId);
    if (!InstructorDetails || InstructorDetails.accountType !== "Instructor") {
      return res.status(403).json({
        success: false,
        message: "Only instructors can create courses",
      });
    }

    const categoryDetails = await Category.findById(category);
    if (!categoryDetails) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }

    const uploadedThumbnail = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await course.create({
      courseName,
      courseDescription,
      whatYouWillLearn,
      Price: price, 
      Instructor: InstructorDetails._id,
      thumbnail: uploadedThumbnail.secure_url,
      category: [categoryDetails._id], 
      tag: tag ? [tag] : [],
    });

    // Add course to instructor's profile
    await user.findByIdAndUpdate(
      userId,
      {
        $push: {
          courses: newCourse._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Course created successfully",
      data: newCourse,
    });
  } catch (error) {
    console.error("Error in createCourse:", error);
    return res.status(500).json({
      success: false,
      message: "Error creating course",
      error: error.message,
    });
  }
};

exports.showAllCourses = async (req, res) => {
  try {
    const response = await course.find(
      {},
      {
        courseName : true,
        whatYouWillLearn : true,
        Instructor : true,
        ratingAndReviews : true,
        studentsEnrolled : true,
        price : true
      }
    )
    res.status(200).json({
      success: true,
      message: "Getting all courses successfully",
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error to get courses",
    });
  }
};



exports.CourseDetails = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const courseDetails = await course.findById(courseId)
     .populate({
        path: "Instructor",
        populate: {
          path: "additionalDetails",
        },
      })
      .populate("category")
      .populate({
        path: "courseContent",
        populate: {
          path: "subSection",
        },
      }) // if you have this field // .populate("ratingAndReviews")
      .exec()
     

    if (!courseDetails) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Course details fetched successfully",
      data: courseDetails,
    });
  } catch (err) {
    console.log("Error fetching course details:", err);
    res.status(500).json({
      success: false,
      message: "Error fetching course details",
      error: err.message,
    });
  }
};
