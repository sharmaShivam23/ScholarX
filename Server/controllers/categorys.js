const category = require("../model/Category")

exports.createCategory = async(req,res) => {
  try{
    const {name , description} = req.body
    if(!name || !description){
      return res.status(400).json({
        success : false,
        message : "All fields are required"
      })
    }
    const response = await category.create({name , description})
    console.log(response);
    
    res.status(200).json({
      success : True,
      message : "Tag created successfully"
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      success : false,
      message : "Error to create tag"
    })
  }
}


exports.showAllCategory = async(req,res) => {
  try{
    const response = await category.find({} , {name :true , description : true}) //this ensure all atgs must have name and description
    res.status(200).json({
      success : true,
      message : "Getting all tags successfully",
      response
    })
  }catch(err){
    console.log(err);
    res.status(500).json({
      success : false,
      message : "error to find tags"
    })
  }
}