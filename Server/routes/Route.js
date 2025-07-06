

const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const {auth , isAdmin , isInstructor , isStudent} = require('../middlewares/Auth')

// Auth Controllers
const { sendOTP, signUp, login, changePassword } = require('../controllers/auth');

// Category Controllers
const { createCategory, showAllCategory , getCourseDeatils } = require('../controllers/categorys');

// Course Controllers
const { createCourse, showAllCourses , CourseDetails , updateCourseStatus , getCoursesByInstructor , deleteCourse} = require('../controllers/Course');

// Profile Controllers
const { profile, getAllUserDetails, delteProfile , uploadProfileImage } = require('../controllers/Profile');

// Section Controllers
const { createSection, updatedSection, deleteSection } = require('../controllers/Section');

// Subsection Controllers
const { createSubSection, updatedSubSection, deletesubSection } = require('../controllers/subSection');

// Password Reset Controllers
const { resetPassword, resetPasswordToken , updatePassword } = require('../controllers/resetPassword');


const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 3,
  message: {
    success: false,
    message: "Too many registration attempts. Please try again after an hour."
  },
  standardHeaders: true,
  legacyHeaders: false,
});
exports.limiter = limiter;



// Auth Routes*
router.post('/send-otp', limiter ,  sendOTP);
router.post('/signup', limiter ,  signUp);
router.post('/login', limiter ,  login);
router.post('/change-password', changePassword);

// Category Routes*
// router.post('/create-category', createCategory);
router.post('/create-category',auth, isAdmin, createCategory);
router.get('/categories', showAllCategory);
router.post('/category/course', getCourseDeatils);

// Course Routes*
// router.post('/create-course', createCourse);
// router.post('/create-course', createCourse);
router.post('/create-course', auth , isInstructor, createCourse);
router.get('/courses', showAllCourses);
router.get('/course/:courseId',CourseDetails);
router.put('/updateCourseStatus',updateCourseStatus);
router.get('/getInstructorCourse/:id', getCoursesByInstructor);
router.delete("/deleteCourse", deleteCourse);


// Profile Routes*
router.put('/profile', profile);
router.post('/userdetails', getAllUserDetails);
router.delete('/delete-profile/:id', delteProfile); 
router.put('/updateImage/:id', uploadProfileImage); 

// Section Routes*
router.post('/create-section', createSection);
router.put('/update-section', updatedSection);
router.delete('/delete-section', deleteSection);

// Subsection Routes
router.post('/create-subsection', createSubSection);
router.put('/update-subsection', updatedSubSection);
router.delete('/delete-subsection', deletesubSection);

// Password Reset Routes*
router.post('/reset-password-token', limiter ,  resetPasswordToken);
router.post('/reset-password', resetPassword)
router.put('/update-password', updatePassword)

module.exports = router;


