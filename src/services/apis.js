
const BASE_URL = 	import.meta.env.VITE_API_BASE_URL 

console.log("base",BASE_URL);


export const categories = {
  CATEGORIES_API: `${BASE_URL}/categories`
}

export const signUp = {
  SIGNUP_API: `${BASE_URL}/signUp`
}

export const login = {
 LOGIN_API: `${BASE_URL}/login`
}

export const sendOTP = {
  OTP_API: `${BASE_URL}/send-otp`
}

export const forgotpassword = {
  FORGOTPASS_API: `${BASE_URL}/reset-password-token`
}

export const resetpassword = {
  RESETPASS_API: `${BASE_URL}/reset-password`
}

export const updateUser = {
  UPDATEUSER_API: `${BASE_URL}/profile`
}

export const updatePassword = {
  NEWPASS_API: `${BASE_URL}/update-password`
}


export const updateProfileImage = (userId) => ({
  UPDATEIMAGE_API: `${BASE_URL}/updateImage/${userId}`
})

export const deleteProfile = (userId) => ({
  DELPROFILE_API: `${BASE_URL}/delete-profile/${userId}`
})

// export const CreateCourse = () => ({
//   CREATECOURSE_API: `${BASE_URL}/create-course`
// })



export const CreateCourse = {
  CREATECOURSE_API: `${BASE_URL}/create-course`
}


export const SectionName = {
  CREATE_SECTION_API: `${BASE_URL}/create-section`
}

export const SubSectionName = {
  CREATE_SUB_SECTION_API: `${BASE_URL}/create-subsection`
}

export const DeleteSection = {
  DELETE_SECTION_API: `${BASE_URL}/delete-section`
}

export const DeleteSubSection = {
  DELETE_Sub_SECTION_API: `${BASE_URL}/delete-subsection`
}

export const updateCourseStatus = {
  COURSE_STATUS_API: `${BASE_URL}/updateCourseStatus`
}

export const deleteCourse = {
  DELETE_COURSE_API: `${BASE_URL}/deleteCourse`
}

export const getInstructorCourses = (userId) => ({
  INSTRUCTOR_COURSES_API: `${BASE_URL}/getInstructorCourse/${userId}`
})