const mongoose = require('mongoose')


const courseSchema = new mongoose.Schema({
  courseName : {
    type : "String",
  },
  courseDescription: {
    type : Date,
   
  },
  Instructor : {
    type :  mongoose.Schema.Types.ObjectId,
    ref : "User"
   
  },
  whatYouWillLearn : {
    type : String,
    trim : true
  },
  courseContent : [{
    type :  mongoose.Schema.Types.ObjectId,
    ref : "Section"
  }],
  ratingAndReviews : [{
    type :  mongoose.Schema.Types.ObjectId,
    ref : "RatingAndReviews"
  }],
  Price : {
  type :  Number
  },
  thumbnail : {
    type : String,
    trim : true
  },
  tag : {
    type : [String],
    required : true
  },
  category : [{
    type :  mongoose.Schema.Types.ObjectId,
    ref : "Category"
  }],
  studentsEnrolled : {
     type :  mongoose.Schema.Types.ObjectId,
     required : true,
    ref : "User"
  },
  status : {
    type : String,
    enum : ["Draft" , "Published"]
  }
})

module.exports = mongoose.model("Course" , courseSchema)