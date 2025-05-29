

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: localStorage.getItem('token') ? JSON.parse(localStorage.getItem('token')) : null,
  signupData: null,
  loading: false,
  emailSent: false,
  profileImage: localStorage.getItem('profileImage') ? localStorage.getItem('profileImage') : null,
  count : 0 
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    setToken(state, action) {
      state.token = action.payload;
    },
    setSignupData(state, action) {
      state.signupData = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setEmailSent(state, action) {
      state.emailSent = action.payload;
    },
    logout(state) {
      state.token = null;
      state.profileImage = null;
      localStorage.removeItem('token'); 
      localStorage.removeItem('profileImage'); 
      localStorage.removeItem('user'); 
      localStorage.removeItem('signupData'); 
    },
    setProfileImage(state, action) {
      state.profileImage = action.payload;
      localStorage.setItem("profileImage", action.payload); 
    },
    setCount(state,action){
      state.count += Number(action.payload)|| 0
    }
  }
});

export const { setToken, setSignupData, setLoading, setEmailSent, logout, setProfileImage , setCount } = authSlice.actions;
export default authSlice.reducer;
