
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stateCourse : 1,
  subSectionToggle : false,
  SectionToggle : false,
  TotalSections : [],
  TotalSubSections : [],
  CourseId : null,
  SectionId : null,
  Course : {}
};

const CourseSlice = createSlice({
  name: "Course",
  initialState: initialState,
  reducers: {
    setState(state, action) {
      state.stateCourse = action.payload;
  },
  setSubSectionToggle(state, action) {
      state.subSectionToggle = action.payload;
    },
  setSectionToggle(state, action) {
      state.SectionToggle = action.payload;
    },
    setTotalSections(state, action) {
      state.TotalSections = action.payload;
    },
    setTotalSubSections(state, action) {
      state.TotalSubSections = action.payload;
    },
    setCourseId(state, action) {
      state.CourseId = action.payload;
    },
    setSectionId(state, action) {
      state.SectionId = action.payload;
    },
    setCourse(state, action) {
      state.Course = action.payload;
    }

}
});

export const { setState , setSubSectionToggle , setSectionToggle ,setTotalSections , setTotalSubSections , setCourseId , setSectionId , setCourse} = CourseSlice.actions;
export default CourseSlice.reducer;