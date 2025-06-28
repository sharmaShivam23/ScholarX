
// const mongoose = require('mongoose');

// const userSchema = new mongoose.Schema({
//   firstName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   lastName: {
//     type: String,
//     required: true,
//     trim: true,
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   password: {
//     type: String,
//     required: true,
//   },
//   accountType: {
//     type: String,  
//     enum: ["Admin", "Student", "Instructor"],
//     required: true,
//   },
//   additionalDetails: {
//     type: mongoose.Schema.Types.ObjectId,
//     ref: "Profile",
//   },
//   courses: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Course",
//     },
//   ],
//   image: {
//     type: String,
//     required: true,
//   },
//   courseProgress: [
//     {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "courseProgress",
//     },
//   ],
//   token: {
//     type: String
//   },
//   resetPasswordExpires: {
//     type: Date, 
//   },
//   googleId: 
  
//   String, 
//   githubId: String
// });

// module.exports = mongoose.model("User", userSchema);

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
  },
  lastName: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    // Not required for OAuth users
  },
  accountType: {
    type: String,
    enum: ["Admin", "Student", "Instructor"],
    required: true,
    default: "Student"
  },
  additionalDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profile",
  },
  courses: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Course",
    },
  ],
  image: {
    type: String,
  },
  courseProgress: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "courseProgress",
    },
  ],
  token: {
    type: String
  },
  resetPasswordExpires: {
    type: Date, 
  },
  googleId: {
    type: String,
    index: true,
    sparse: true,
  },
  githubId: {
    type: String,
    index: true,
    sparse: true,
  }
});

module.exports = mongoose.model("User", userSchema);
