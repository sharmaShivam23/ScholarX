
const user = require('../model/user')
const OTP = require('../model/OTP')
const otpGenerator = require('otp-generator')
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
require("dotenv").config()
const mailSender = require("../utils/mailSender")
const Profile = require("../model/Profile");


//send otp
exports.sendOTP = async(req,res) => {
  try{
  const {email} = req.body

  const existUser= await user.findOne({email})
  if(existUser){
   return res.status(401).json({
      success : false,
      message : "user already exits"
    })
  }

  let otp = otpGenerator.generate(5 , {
    upperCaseAlphabets : false,
    lowerCaseAlphabets : false,
    specialChars : false,
  })
 console.log(otp);

 let result = await OTP.findOne({otp : otp})
 //ifthe genearted otp is already present in db genearte other unique otp
 while(result){
  otp = otpGenerator.generate(5 , {
    upperCaseAlphabets : false,
    lowerCaseAlphabets : false,
    specialChars : false,
  })
  result = await OTP.findOne({otp : otp})
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
  
    const {firstName , lastName , email , password ,confirmpassword, accountType , otp} = req.body
    if(!firstName || !lastName || !email || !password){
     return res.status(403).json({
        success : false,
        message : "All details are required"
      })
    }
   
    if(password !== confirmpassword){
    return  res.status(403).json({
        success : false,
        message : "password does not match"
      })
    }
    const existEmail = await user.findOne({email})
    if(existEmail){
     return  res.status(400).json({
        success : false,
        message : "User email already exist"
      })
    }
    if(!otp){
      return res.status(403).json({
         success : false,
         message : "OTP verification failed!"
       })
     }
   

    //find recent used otp
    const recentOTP = await OTP.findOne({ email }).sort({ createdAt: -1 }); // get latest OTP

    if (!recentOTP || recentOTP.otp !== otp) {
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }
    

    //hash password
    const hashedPassword = await bcrypt.hash(password,10)

    const profileDetails = await Profile.create({
      gender : null,
      dob : null,
      phoneNumber : null,
      about : null
    })

    const result = await user.create( {firstName , lastName , email , password : hashedPassword , accountType , additionalDetails : profileDetails._id,
      image : `https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`//dice bear url
    })
    console.log(result);
    

    res.status(200).json({
      success : true,
        message : "user registered succesfully",
       result
    })

  }catch(err){
    console.log(err);
    res.status(500).json({
      success : false,
        message : "failed to registered"
    })


  }
}




exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All details are required",
      });
    }

    const existEmail = await user.findOne({ email })
    if (!existEmail) {
      return res.status(400).json({
        success: false,
        message: "Invalid email",
      });
    }

    const checkPassword = await bcrypt.compare(password, existEmail.password);
    if (!checkPassword) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    // Password correct — create JWT
    const payload = {
      email: existEmail.email,
      id: existEmail._id,
      accountType: existEmail.accountType,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "3h" });

    // Set token in user and remove password before sending
    existEmail.token = token;
    existEmail.password = undefined;

    // Cookie options
    const options = {
      expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
      httpOnly: true,
    };

    const User = await existEmail.populate("additionalDetails")

    // Send cookie and response
    return res.cookie("token", token, options).status(200).json({
      success: true,
      token,
      user: User,
      message: "User successfully logged in",
    });

  } catch (err) {
    console.log("Login error:", err);
    return res.status(500).json({
      success: false,
      message: "Something went wrong during login",
    });
  }
};




exports.changePassword = async (req, res) => {
  try {
    const { email, newpassword, confirmNewpassword } = req.body;

    if (!email || !newpassword || !confirmNewpassword) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    const existEmail = await user.findOne({ email });
    if (!existEmail) {
      return res.status(400).json({
        success: false,
        message: "Account email not found",
      });
    }

    if (newpassword !== confirmNewpassword) {
      return res.status(400).json({
        success: false,
        message: "Passwords do not match",
      });
    }

    const hashedPassword = await bcrypt.hash(newpassword, 10);

    await user.findOneAndUpdate(
      { _id: existEmail._id },
      { password: hashedPassword },
      { new: true }
    );

    // Send mail but DO NOT send a response inside this block
    try {
      const mailResponse = await mailSender(email, "Password changed successfully");
      console.log("Mail sent:", mailResponse);
    } catch (err) {
      console.error("Error while sending mail:", err.message);
      // no res.json here to avoid double response
    }

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });

  } catch (err) {
    console.error("Error in changePassword function:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to change password",
    });
  }
};
