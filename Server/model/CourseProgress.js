const mongoose = require('mongoose')

//course id, 
const courseProgressSchema = new mongoose.Schema({
 courseId : {
   type : mongoose.Schema.Types.ObjectId,
    ref : "Course",
 },
 completedVideos : [{
   type : mongoose.Schema.Types.ObjectId,
    ref : "subSection"
 }]
})

module.exports = mongoose.model("courseProgress" , courseProgressSchema)