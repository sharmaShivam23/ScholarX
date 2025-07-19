const mongoose = require("mongoose")

const ContactSchema = new mongoose.Schema({
  
  email: {
    type: String,
    required: true,
    trim: true,
  },

  
  firstname: {
    type: String,
    required: true,
    trim: true,
  },

  
  lastname: {
    type: String,
    trim: true,
  },

  
  message: {
    type: String,
    required: true,
    trim: true,
  },

  
  phoneNo: {
    type: String,
    required: true,
    trim: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
})

module.exports = mongoose.model("Contact", ContactSchema)
