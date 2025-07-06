
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: JSON.parse(localStorage.getItem('user')) || null,
  logoutState: false,
  hideMenu : true
};

const profileSlice = createSlice({
  name: "profile",
  initialState: initialState,
  reducers: {
    setUser(state, action) {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    setLogoutState(state, action) {
      state.logoutState = action.payload;
    },
    setMenu(state , action) {
      state.hideMenu = action.payload;
    }
  }
});

export const { setUser, setLogoutState , setMenu } = profileSlice.actions;
export default profileSlice.reducer;

// import { createSlice } from "@reduxjs/toolkit";


// let userData = null;
// try {
//   const storedUser = localStorage.getItem("user");
//   if (storedUser) {
//     userData = JSON.parse(storedUser);
//   }
// } catch (error) {
//   console.error("Failed to parse 'user' from localStorage:", error);
//   localStorage.removeItem("user");
// }

// const initialState = {
//   user: userData,
//   logoutState: false,
// };

// const profileSlice = createSlice({
//   name: "profile",
//   initialState,
//   reducers: {
//     setUser(state, action) {
//       state.user = action.payload;
//       try {
//         localStorage.setItem("user", JSON.stringify(action.payload));
//       } catch (error) {
//         console.error("Error saving 'user' to localStorage:", error);
//       }
//     },
//     setLogoutState(state, action) {
//       state.logoutState = action.payload;
//     }
//   }
// });

// export const { setUser, setLogoutState } = profileSlice.actions;
// export default profileSlice.reducer;
