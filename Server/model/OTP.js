const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')

const otpSchema = new mongoose.Schema({
 
 email : {
   type : String,
   required : true,
 },
 otp : {
  type : String,
  required : true
 },
 createdAt : {
  type : Date,
  default : Date.now,
  expires : 5*60
 }

})


const sendVerificationMail = async(email,otp) => {
  try{
   const mailResponse = await mailSender(email , "verify email from schloarX" , otp)
   console.log(mailResponse);
   
  }catch(err){
    console.log(`error occured to send mail`);
    console.log(err.message);
    
  }
}


otpSchema.pre("save" , async function(next){
  await sendVerificationMail(this.email , this.otp)
  next()
})


module.exports = mongoose.model("OTP" , otpSchema)