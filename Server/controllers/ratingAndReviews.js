// const RatingAndReview = require("../model/ratingReview");
// const Course = require("../model/Course");
// const User = require("../model/user");
// const { default: mongoose } = require("mongoose");

// exports.createRating = async (req, res) => {
//   try {
//     const userId = req.user.id;
//     const { rating, review, courseId } = req.body;

//     const courseDetails = await Course.findOne({
//       _id: courseId,
//       studentsEnrolled: { $elemMatch: { $eq: userId } },
//     });

//     if (!courseDetails) {
//       return res.status(400).json({
//         success: false,
//         message: "User is not enrolled in this course",
//       });
//     }

//     const alreadyReviewed = await RatingAndReview.findOne({
//       user: userId,
//       course: courseId,
//     });

//     if (alreadyReviewed) {
//       return res.status(403).json({
//         success: false,
//         message: "You have already reviewe this course",
//       });
//     }

//     const ratingReview = await RatingAndReview.create({
//       rating,
//       review,
//       user: userId,
//       course: courseId,
//     });

//     await Course.findByIdAndUpdate(
//       courseId,
//       {
//         $push: {
//           ratingAndReviews: ratingReview._id,
//         },
//       },
//       { new: true }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Rating and review created successfully",
//       ratingReview,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       err: err.message,
//       message: "Failed to create rating",
//     });
//   }
// };

// exports.avgRating = async (req, res) => {
//   try {
//     const courseId = req.body.courseId;
//     const result = await RatingAndReview.aggregate([
//       {
//         $match: {
//           course: new mongoose.Types.ObjectId(courseId),
//         },
//       },
//       {
//         $group: {
//           _id: null,
//           averageRating: { $avg: "$rating" },
//         },
//       },
//     ]);

//     return res.status(200).json({
//       success: true,
//       message: "Average rating fetched successfully",
//       averageRating: result.length > 0 ? result[0].averageRating : 0,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       err: err.message,
//       message: "Failed to fetch average rating",
//     });
//   }
// };

// exports.getAllRating = async (req, res) => {
//   try {
//     const allReviews = await RatingAndReview.find({})
//       .sort({ rating: -1 })
//       .populate({
//         path: "course",
//         select: "courseName",
//       })
//       .populate({
//         path: "user",
//         select: "firstName lastName email",
//       });

//     return res.status(200).json({
//       success: true,
//       message: "All ratings fetched successfully",
//       allReviews,
//     });
//   } catch (err) {
//     console.log(err);
//     res.status(500).json({
//       success: false,
//       err: err.message,
//       message: "Failed to fetch ratings",
//     });
//   }
// };


const RatingAndReview = require("../model/ratingReview");
const Course = require("../model/Course");
const User = require("../model/user");
const { default: mongoose } = require("mongoose");

exports.createRating = async (req, res) => {
  try {
    const userId = req.user.id;
    const { rating, review, courseId } = req.body;

    // Check if the user is enrolled in the course
    const courseDetails = await Course.findOne({
      _id: courseId,
      studentsEnrolled: { $elemMatch: { $eq: userId } },
    });

    if (!courseDetails) {
      return res.status(400).json({
        success: false,
        message: "User is not enrolled in this course",
      });
    }

    // Check if the user has already reviewed the course
    const alreadyReviewed = await RatingAndReview.findOne({
      user: userId,
      course: courseId,
    });

    if (alreadyReviewed) {
      return res.status(403).json({
        success: false,
        message: "You have already reviewed this course",
      });
    }

    // Create the rating and review
    const ratingReview = await RatingAndReview.create({
      rating,
      review,
      user: userId,
      course: courseId,
    });

    // Push the review to the course's ratingAndReviews field
    await Course.findByIdAndUpdate(
      courseId,
      {
        $push: {
          ratingAndReviews: ratingReview._id,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      success: true,
      message: "Rating and review created successfully",
      ratingReview,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      err: err.message,
      message: "Failed to create rating",
    });
  }
};

exports.avgRating = async (req, res) => {
  try {
    const courseId = req.body.courseId;

    // Aggregate ratings and calculate the average
    const result = await RatingAndReview.aggregate([
      {
        $match: {
          course: new mongoose.Types.ObjectId(courseId),
        },
      },
      {
        $group: {
          _id: null,
          averageRating: { $avg: "$rating" },
        },
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Average rating fetched successfully",
      averageRating: result.length > 0 ? result[0].averageRating : 0,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      err: err.message,
      message: "Failed to fetch average rating",
    });
  }
};

exports.getAllRating = async (req, res) => {
  try {
    // Fetch all reviews and populate the course and user details
    const allReviews = await RatingAndReview.find({})
      .sort({ rating: -1 })
      .populate({
        path: "course",
        select: "courseName", // You may need to adjust this based on your model
      })
      .populate({
        path: "user",
        select: "firstName lastName email", // Adjust to include other fields if needed
      });

    return res.status(200).json({
      success: true,
      message: "All ratings fetched successfully",
      allReviews,
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      err: err.message,
      message: "Failed to fetch ratings",
    });
  }
};
