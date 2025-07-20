

const jwt = require("jsonwebtoken");
require("dotenv").config();
const user = require("../model/user");

// ✅ AUTH MIDDLEWARE
exports.auth = async (req, res, next) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header("Authorization")?.replace("Bearer ", "").trim();

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Token is missing",
      });
    }

    try {
      const decode = jwt.verify(token, process.env.JWT_SECRET);
      // console.log("Decoded token: ", decode);
      req.user = decode;
    } catch (err) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    next();
  } catch (err) {
    console.log(err);
    return res.status(401).json({
      success: false,
      message: "Error verifying token",
    });
  }
};

// ✅ ADMIN GUARD
exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Admin") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Admins only",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Admin role cannot be verified, try again",
    });
  }
};

// ✅ STUDENT GUARD
exports.isStudent = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Student") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Students only",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Student role cannot be verified, try again",
    });
  }
};

// ✅ INSTRUCTOR GUARD
exports.isInstructor = async (req, res, next) => {
  try {
    if (req.user.accountType !== "Instructor") {
      return res.status(401).json({
        success: false,
        message: "This is a protected route for Instructors only",
      });
    }
    next();
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Instructor role cannot be verified, try again",
    });
  }
};
