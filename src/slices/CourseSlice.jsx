
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  stateCourse : 1
};

const CourseSlice = createSlice({
  name: "Course",
  initialState: initialState,
  reducers: {
    setState(state, action) {
      state.user = action.payload;
  }
}
});

export const { setState } = CourseSlice.actions;
export default CourseSlice.reducer;