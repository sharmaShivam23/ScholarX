
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  CategoryId : null,
  courseId : null,
  CourseData : null,
  videourl : null,
  content : null
};

const CategorySlice = createSlice({
  name: "Category",
  initialState: initialState,
  reducers: {
    setCategoryId(state, action) {
      state.CategoryId = action.payload;
  },
    setCourseId(state, action) {
      state.courseId = action.payload;
  },
  setCourseData(state , action){
    state.CourseData = action.payload
  },
  
  setVideoUrl(state , action){
    state.videourl = action.payload
  }
  ,
  setContent(state , action){
    state.content = action.payload
  }
  

}
});

export const { setCategoryId  , setCourseId , setCourseData , setVideoUrl , setContent} = CategorySlice.actions;
export default CategorySlice.reducer;