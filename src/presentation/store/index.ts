/* eslint-disable react/display-name */
import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage";
import minicartSlice from "@store/cart";
import cartSlice from "@store/cart";
import errorSlice from "@store/error";

const persistMiniCartConfig = {
  key: "minicart",
  storage,
};

const persistCartConfig = {
  key: 'cart',
  storage
}

const persistedReducer = persistReducer(persistMiniCartConfig, minicartSlice.reducer);

const persistedCartReducer = persistReducer(persistCartConfig, cartSlice.reducer)

const store = configureStore({
  reducer: {
    cart: persistedCartReducer,
    minicart: persistedReducer,
    error: errorSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;

export const persistor = persistStore(store);
