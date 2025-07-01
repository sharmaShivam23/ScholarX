const subSection = require("../model/subSection");
const section = require("../model/Section");
const { uploadImageToCloudinary } = require("../utils/imageUploader");

exports.createSubSection = async (req, res) => {
  try {
    const { title, description, courseDuration, sectionId } = req.body;
    const  video  = req.files.video;

    if (!title || !description || !sectionId) {
      return  res.status(400).send({
        success: false,
        message: "Section title and description",
      });
    }
    // if (!courseDuration) {
    // return  res.status(400).send({
    //     success: false,
    //     message: "Course duration is required",
    //   });
    // }

    if (!video) {
     return  res.status(400).send({
        success: false,
        message: "video is required",
      });
    }

    const videoUpload = await uploadImageToCloudinary(
      video,
      process.env.FOLDER_NAME
    );

    if(!videoUpload){
     return res.status(400).json({
        success: false,
        message: "failed to upload video",
      });
    }

    const createSub = await subSection.create({
      title,
      description,
      courseDuration,
      videoURL  : videoUpload.secure_url
    });

    const updatedSubSection = await section.findByIdAndUpdate(
      sectionId,
      {$push : {subSection : createSub._id}},
      {new : true}
    ).populate("subSection");

    res.status(200).json({
      success: true,
      message: "subsection created successfully",
      updatedSubSection,
      createSub : createSub,

    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "error to create subsection",
    });
  }
};


exports.updatedSubSection = async (req, res) => {
  try {
    const { title, description, courseDuration, subsectionId } = req.body;
    const { video } = req.files;

    // Validate input
    if (!title || !description || !subsectionId) {
      return res.status(400).send({
        success: false,
        message: "Section title, description and subsection Id are required",
      });
    }

    if (!courseDuration) {
      return res.status(400).send({
        success: false,
        message: "Course duration is required",
      });
    }

    if (!video) {
      return res.status(400).send({
        success: false,
        message: "Video is required",
      });
    }

    // Update the subsection
    const updatedSubSection = await subSection.findByIdAndUpdate(
      subsectionId,
      { title, description, courseDuration, video },
      { new: true }
    );

    if (!updatedSubSection) {
      return res.status(404).send({
        success: false,
        message: "Subsection not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subsection updated successfully",
      data: updatedSubSection,
    });
  } catch (err) {
    console.log(err);
    res.status(500).send({
      success: false,
      message: "Failed to update subsection",
      error: err.message,
    });
  }
};




exports.deletesubSection = async (req, res) => {
  try {
    const { subsectionId } = req.body;

    if (!subsectionId) {
      return res.status(400).json({
        success: false,
        message: "Subsection ID is required",
      });
    }

    const deletedSubSection = await subSection.findByIdAndDelete(subsectionId);

    if (!deletedSubSection) {
      return res.status(404).json({
        success: false,
        message: "Subsection not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Subsection deleted successfully",
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error deleting subsection",
      error: err.message,
    });
  }
};
