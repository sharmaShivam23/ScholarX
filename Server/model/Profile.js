const mongoose = require('mongoose')

const profileSchema = new mongoose.Schema({
  gender : {
    type : "String",
    required : true
  },
  dob : {
    type : Date,
    required : true
  },
  phoneNumber : {
    type : Number,
    required : true
  },
  about : {
    type : String,
    trim : true
  }
})

module.exports = mongoose.model("Profile" , profileSchema)