
const user = require('../model/user')
const OTP = require('../model/OTP')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")
require("dotenv").config()


//send otp
exports.sendOTP = async(req,res) => {
  try{
  const {email} = req.body

  // const existUser= await user.findOne({email})
  // if(existUser){
  //   res.status(401).json({
  //     success : false,
  //     message : "user already exits"
  //   })
  // }

  let otp = otpGenerator.generate(6 , {
    upperCaseAlphabets : false,
    lowerCaseAlphabets : false,
    specialChars : false,
  })
 console.log(otp);

 const result = await OTP.findOne({otp : otp})
 //check umique otp
 while(result){
  otp = otpGenerator.generate(6 , {
    upperCaseAlphabets : false,
    lowerCaseAlphabets : false,
    specialChars : false,
  })
  result = await user.findOne({otp : otp})
 }
 
 const otpPayload = {email,otp}
 const otpresult = await OTP.create(otpPayload)
 console.log(otpresult);
 

 res.status(200).json({
  success : true,
  message : "otp send successfully",
  otp
 })
  }catch(err){
   console.log(err);
   res.status(500).json({
    success : true,
    message : err.message
   })
   
  }
}


//signup
exports.signUp = async(req,res) => {
  try{
  
    const {firstName , lastName , email , password ,confirmpassword, accountType ,contactNumber, otp} = req.body
    if(!firstName || !lastName || !email || !password || !contactNumber || !otp){
      res.status(403).json({
        success : false,
        message : "All details are required"
      })
    }
    if(password !== confirmpassword){
      res.status(403).json({
        success : false,
        message : "password does not match"
      })
    }
    const existEmail = await user.findOne({email})
    if(existEmail){
      res.status(400).json({
        success : false,
        message : "User email already exist"
      })
    }
    if(firstName.includes('012345678') || lastName.includes('012345678') ){
      res.status(401).json({
        success : false,
        message : "name can't takes number"
      })
    }

    //find recent used otp
    const recentOTP = await user.find({email}).sort({createdAt : -1}).limit(1)
    if(recentOTP.length == 0){
      res.status(400).json({
        success : false,
        message : "invalid otp"
      })
    }
    else if(recentOTP !== otp){
      res.status(400).json({
        success : false,
        message : "invalid otp"
      })
    }

    //hash password
    const hashedPassword = await bcrypt.hash(password,10)

    const profileDetails = await Profile.create({
      gender : null,
      dob : null,
      phoneNumber : null,
      about : null
    })

    const result = await user.create( {firstName , lastName , email , password : hashedPassword , accountType ,contactNumber, additionalDetails : profileDetails._id,
      image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
    })
    console.log(result);
    

    res.status(200).json({
      success : true,
        message : "user registered succesfully",
        user
    })

  }catch(err){
    console.log(err);
    res.status(500).json({
      success : false,
        message : "failed to registered"
    })


  }
}




//login
exports.login = async (req,res) => {
  try{
    const {email , password} = req.body
    if(!email || !password){
      res.status(400).json({
        success : false,
        message : "all details are required"
      })
    }
    const existEmail = await user.findOne({email})
    if(!existEmail){
      res.status(400).json({
        success : false,
        message : "invalid email"
      })
    }
    const checkPassword = await bcrypt.compare(password , existEmail.password)
    if(checkPassword){
      const payload = {
        email : user.email,
        id : user._id,
        accountType : user.accountType
      }
      const token = jwt.sign(payload , process.env.JWT_SECRET , {expiresIn : "2h"})
      user.token = token
      user.password = undefined

      //create cookie
      const options = {
        expires : new Date(Date.now() + 3*24*60*60*1000),
        httpOnly  : true
      }
      res.cookie("token" , token, options).status(200).json({
        success : true,
        token,
        user,
        message : "user successfully login"
      })
    }
    else{
      res.status(400).json({
        success : false,
        message : "invalid password"
      })
    }
    res.status(200).json({
      success : true,
      message : "login successfully",
      user : existEmail
    })

  }catch(Err){
    console.log(Err);
    res.status(500).json({
      success : false,
      message : "link sent successfully for reset password",
    })
  }
}


exports.changePassword = async(req,res) => {
  try{
    
  }catch(err){
    res.status(500).json({
      success : false,
      message : "failed to  send link  for reset password",
    })
  }
}