const course = require("../model/Course");
const user = require("../model/user");
const section = require("../model/Section")

exports.createSection = async (req, res) => {
  try {

    const {sectionName , courseId} = req.body

    if(!sectionName || !courseId){
     return res.status(400).send({
        success : false,
        message : "Section name and course id is required"
      })
    }

    const newSection = await section.create({sectionName , courseId})

    const updatedCourse = await course.findByIdAndUpdate(
      courseId,
      {$push : {courseContent : newSection._id}},
      {new : true}
    )

    res.status(200).json({
      success: true,
      message: "section created successfully",
      updatedCourse
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      message: "Error to create section",
      error : error.message
    });
};
}





exports.updatedSection = async (req, res) => {
  try {
    const { sectionName, sectionId } = req.body;

    if (!sectionName || !sectionId) {
      return res.status(400).json({
        success: false,
        message: "Section name and id are required",
      });
    }

    const updatedSection = await section.findByIdAndUpdate(
      sectionId,
      { sectionName: sectionName },
      { new: true }
    );

    if (!updatedSection) {
      return res.status(404).json({
        success: false,
        message: "Section not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Section updated successfully",
      data: updatedSection,
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error updating section",
      error: err.message,
    });
  }
};



exports.deleteSection = async(req,res) => {
  try{
   
    const {sectionId} = req.body
    
    if(!sectionId){
      res.status(400).json({
        success : false,
        message : "Section  id is required"
      })
    }

    const delteSection = await section.findByIdAndDelete(
      sectionId
    )

    res.status(200).json({
      success: true,
      message: "section deleted successfully",
    });



  }catch(err){
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Error to delete section",
      err : err.message
    });
    
  }
}