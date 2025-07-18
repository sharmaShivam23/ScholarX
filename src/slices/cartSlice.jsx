
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cartItems: JSON.parse(localStorage.getItem("cartItems")) || [],
  totalItems: JSON.parse(localStorage.getItem("totalItems")) || 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(action.payload));
    },
    setTotalItems(state, action) {
      state.totalItems = action.payload;
      localStorage.setItem("totalItems", JSON.stringify(action.payload));
    },
    removeItem(state, action) {
  const newItems = state.cartItems.filter(item => item._id !== action.payload);
  state.cartItems = newItems;
  state.totalItems = newItems.length;
  localStorage.setItem("cartItems", JSON.stringify(newItems));
  localStorage.setItem("totalItems", JSON.stringify(newItems.length));
}

  }
});

export const { setCartItems, setTotalItems, removeItem } = cartSlice.actions;
export default cartSlice.reducer;
