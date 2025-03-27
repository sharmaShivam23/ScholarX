const {instance} = require("../config/razorpay")
const user = require("../model/user")
const mailSender = require("../utils/mailSender")
const Course = require("../model/Course")
const { default: mongoose } = require("mongoose")

exports.capturePayment = async (req , res) => {
  //get courseId and userId
  //validation
  //validate  course id
  //validate  course details
  //check user alredy pay or not
  //order create
  //return response

  let {course_id} = req.body
  let userId = req.user.id  // extracting id from the token send through login
  if(!course_id){
    res.status(400).json({
      success : false,
      message : "course id is required"
    })
  }
  let course
  try{
    course = await Course.findById({course_id})
    if(!course){
      res.status(400).json({
        success : false,
        message : "invalid course"
      })
    }
    const uid = new mongoose.Types.ObjectId(userId)
    if(course.studentsEnrolled.includes(uid)){
      res.status(400).json({
        success : false,
        message : "User already enrolled"
      })
    }

    const amount = course.Price
    const currency = "INR"
    const options = {
      amount : amount*100,
      currency,
      receipt : Math.random(Date.now()).toString(),
      notes : {
        courseID : course_id,
        userId
      }
    }

    try{
      const paymentResponse = await instance.orders.create(options)
      console.log(paymentResponse);

      res.status(200).json({
        success : true,
        courseName : course.courseName,
        courseDescription : course.courseDescription,
        thumbnail : course.thumbnail,
        orderId : paymentResponse.id,
        currency : paymentResponse.currency,
        amount : paymentResponse.amount
      })
      
    }catch(err){
      console.log(err);
      
      res.status(500).json({
        success : false,
        message : "Could not initiate order"
      })
    }
  }catch(err){
   console.log(err);
   res.status(500).json({
    success : false,
    message : "error to find course"
  })
  }
}


exports.verifySignature = async(req,res) => {
  try{
     const webHookSecret = "12345678"

     const signature = req.header["x-razorpay-signature"]
     const shasum = crypto.createHmac("sha256",webHookSecret)
     shasum.upadate(JSON.stringify(req.body))
     const digest = shasum.digest("hex")
     if(signature == digest){
      console.log("payment is authorised");

       const {userId , courseID} = req.body.payload.payment.entity.notes
       try{
        const enrolledCourse = await Course.findOneAndUpdate(
          {_id : courseID},
          {$push : {studentsEnrolled : userId}},
          {new : true}
        )
        if(!enrolledCourse){
          res.status(500).json({
            success : false,
            message : "Course not found"
          })
        }
        const enrolledStudent = await user.findOneAndUpdate(
          {_id : userId},
          {$push : {courses : courseID}},
          {new : true}
        )
        console.log(enrolledStudent);

        const emailResponse = await mailSender(
                                    enrolledStudent.email,
                                    "Congratulations",
                                    "COngratulations you are getting you course"
        )
        console.log(emailResponse);
        res.status(200).json({
          success : true,
          message : "Course added"
        })
        
        
       }catch(err){
        res.status(500).json({
          success : false,
          message : err.message
        })
       }
     }
     else{
     res.status(500).json({
      success : false,
      message : "invalid request"
    })
  }
  }catch(err){
    res.status(500).json({
      success : false,
      message : "Course not found"
    })
  }
}