/* eslint-disable react/display-name */
import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "@store/cart";

const store = configureStore({
  reducer: {
    cart: cartSlice.reducer,
  },
});

export default store;
