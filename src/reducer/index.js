import { combineReducers } from "@reduxjs/toolkit";
import authReducer from '../slices/authSlice'
import profileReducer from "../slices/ProfileSlice"
import cartReducer from "../slices/cartSlice"
import CourseSlice from "../slices/CourseSlice"
const rootReducer = combineReducers({
  auth : authReducer,
  profile : profileReducer,
  cart :  cartReducer,
  Course : CourseSlice
})
export default rootReducer