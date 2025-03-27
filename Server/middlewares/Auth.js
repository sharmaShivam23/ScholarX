const jwt = require("jsonwebtoken")
require("dotenv").config()
const user =  require("../model/user")


exports.auth = async (req,res,next) => {
  try{

    const token = req.cookies.token || req.body.token || req.header("Authorisation").replace("Bearer ", "")

    try{
    const decode = bcrypt.verify(token , process.env.JWT_SECRET)
    console.log(decode);
    
    req.user = decode
    }catch(Err){
       res.status(401).json({
        success : false,
        message : "invalid token"
       })
    }
    next()
    
  }catch(err){
    console.log(err);
    res.status(401).json({
      success : false,
      message : "error to verify token"
     })
  }

}



exports.isStudent= async(req,res) => {
   try{

    if(req.user.accountType !== "Student"){
    return  res.status(401).json({
      success : false,
      message : "This is protected route for students"
     })
    }

   }catch(err){
    console.log(err);
    res.status(500).json({
      success : false,
      message : "User role cannot be verified , try again"
     })
   }
}

exports.isInstructor = async(req,res) => {
   try{

    if(req.user.accountType !== "Instructor"){
    return  res.status(401).json({
      success : false,
      message : "This is protected route for instructors"
     })
    }

   }catch(err){
    console.log(err);
    res.status(500).json({
      success : false,
      message : "instuctor role cannot be verified , try again"
     })
   }
}

exports.isAdmin = async (req,res) => {
   try{

    if(req.user.accountType !== "Admin"){
    return  res.status(401).json({
      success : false,
      message : "This is protected route for Admin"
     })
    }

   }catch(err){
    console.log(err);
    res.status(500).json({
      success : false,
      message : "Admin role cannot be verified , try again"
     })
   }
}