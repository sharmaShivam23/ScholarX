const mongoose = require('mongoose')
const mailSender = require('../utils/mailSender')
const fs = require('fs');
const path = require('path');

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

     const templatePath = path.join(__dirname, '../Templates/Otp_Template.html');
        if (!fs.existsSync(templatePath)) {
          return res.status(500).json({
            success: false,
            message: "OTP template not found.",
          });
        }
    
        const otpTemplate = fs.readFileSync(templatePath, 'utf8');
        const htmlContent = otpTemplate.replace(/{{\s*otp\s*}}/g, otp);
    
        await mailSender(email, "Your ScholarX OTP", htmlContent);

   
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