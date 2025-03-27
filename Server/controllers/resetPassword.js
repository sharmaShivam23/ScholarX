
require("dotenv").config()
const user =  require("../model/user")
const bcrypt = require("brcypt")
const mailSender = require("../utils/mailSender")


exports.resetPasswordToken = async (req,res,next) => {
  try{
    const {email} = req.body
    const existEmail = await user.findOne({email})
    if(!existEmail){
      res.status(400).json({
        success : false,
        message : "email not found for this user"
      })
    }
    if(!email){
      res.status(400).json({
        success : false,
        message : "email is required"
      })
    }

    const token = crypto.randomUUID()
    const updateDetails = await user.findByIdAndUpdate(
      {email : email},
      {
        token : token,
        expiresIn : Date.now() + 5*60*1000
      },
      {new : true}
    )

    const url = `https:localhost:3000/update-password/${token}`

    await mailSender(email , "Password reset link" , `This link is for password reset : ${url}`)

    res.status(400).json({
      success : true,
      message : "password reset successfully"
    })
  }catch(err){
    console.log(err);
    res.status(400).json({
      success : false,
      message : "failed to reset password"
    })
  }
}


exports.resetPassword = async(req,res) => {
  try{
    const {password , confirmPassword , token} = req.body

    if(password !== confirmPassword){
     return res.json({
         success : false,
      message : "password mismatched"
      })
    }

    const userDetails = await user.findOne({token : token})
    if(!userDetails){
      return res.json({
        success : false,
        message : "token is invalid"
     })
    }    
    if(userDetails.expiresIn < Date.now()){
      return res.json({
        success : false,
     message : "token expired"
     })
    }

    const hashedPassword = await bcrypt.hash(password , 10)
    await user.findOneAndUpdate(
      {token : token},
      {password : hashedPassword},
      {new : true}

    )

   return  res.status(200).json({
      success : true,
      message : "password udated successfully"
   })
  }catch(err){
    console.log(err);
    res.status(500).json({
      success : false,
      message : "error to reset password , try again"
   })
  }
}