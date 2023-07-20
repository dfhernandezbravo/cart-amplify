/* eslint-disable react/display-name */
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import cartSlice from "@store/cart";
import errorSlice from "@store/error";

const persistCartConfig = {
  key: "cart",
  storage,
};

const persistedReducer = persistReducer(persistCartConfig, cartSlice.reducer);

const store = configureStore({
  reducer: {
    cart: persistedReducer,
    error: errorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);
