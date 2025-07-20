const category = require("../model/Category");
const Course = require("../model/Course");

exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;
    if (!name || !description) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const response = await category.create({ name, description });
    // console.log(response);

    res.status(200).json({
      success: true,
      message: "category created successfully",
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error to create category",
    });
  }
};
 
exports.showAllCategory = async (req, res) => {
  try {
    const response = await category.find({}, { name: true, description: true }); //this ensure all atgs must have name and description
    res.status(200).json({
      success: true,
      message: "Getting all tags successfully",
      response,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error to find category",
    });
  }
};

exports.getCourseDeatils = async (req, res) => {
  try {
    const { categoryId } = req.body;
    if (!categoryId) {
      return res.status(400).json({
        success: false,
        message: "Category ID is required",
      });
    }
    // const response = await category.findById(categoryId).populate("course")
    const response = await category.findById(categoryId).populate({
      path: "course",
      populate: {
        path: "courseContent",
        populate : {
          path : "subSection"
        }
      },
    });

    if (!response) {
      return res.status(404).json({
        success: false,
        message: "Category not found",
      });
    }
    res.status(200).json({
      success: true,
      message: "Getting course details successfully",
      response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error to get course details",
    });
  }
};
