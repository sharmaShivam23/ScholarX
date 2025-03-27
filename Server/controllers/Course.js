const course = require("../model/Course");
const user = require("../model/user");
const Category = require("../model/Category");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createCourse = async (req, res) => {
  try {
    const { courseName, courseDescription, whatYouWillLearn, price, category } =
      req.body;
    const thumbnail = req.files.thumbnail;

    if (
      !courseName ||
      !courseDescription ||
      !whatYouWillLearn ||
      !price ||
      !category ||
      !thumbnail
    ) {
      return res.status(404).send({
        success: false,
        message: "All fields are required",
      });
    }

    //check for instauctor
    const userId = req.user.id;
    const InstructorDetails = await user.findById(userId);
    console.log(InstructorDetails);
    if (!InstructorDetails) {
      res.status(404).send({
        success: false,
        message: "instructor not found",
      });
    }

    const tagDetails = await user.findById(category);
    if (!tagDetails) {
      res.status(404).send({
        success: false,
        message: "tags not found",
      });
    }

    //upload image to cloudinary
    const thumbnailImage = await uploadImageToCloudinary(
      thumbnail,
      process.env.FOLDER_NAME
    );

    const newCourse = await course.create({
      courseName,
      courseDescription,
      Instructor: InstructorDetails._id,
      whatYouWillLearn: whatYouWillLearn,
      price,
      category: tagDetails._id,
      thumbnail: thumbnailImage.secure_url,
    });

    //add the new course to the user schema of instructor
    await user.findByIdAndUpdate(
      { _id: InstructorDetails.id },
      {
        $push: {
          course: newCourse._id,
        },
      },
      { new: true }
    );

    res.status(200).send({
      success: true,
      message: "Course updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "error to update the course",
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
    ).populate("instructor").exec()
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


exports.getCourseDetails = async(req,res) => {
  try{

  }catch(err){
    console.log(err);
    
  }
}