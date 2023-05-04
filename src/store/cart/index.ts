import { CartItemModel } from '@/store/cart/cart.type';
import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: 'cart',
  initialState: {
    cartItems: [] as CartItemModel[]
  },
  reducers: {
    setAddProductInCart: (state, { payload }) => {
      const currentProduct = state.cartItems?.find((pr: CartItemModel) => pr.id === payload.id);
      if (currentProduct) {
        const quantity = currentProduct?.quantity || 0;
        const removeCurrent = state.cartItems?.filter((pr: CartItemModel) => pr.id !== payload.id);
        if (removeCurrent?.length > 0) {
          state.cartItems = [...removeCurrent, { ...currentProduct, quantity: quantity + 1 }];
        } else {
          state.cartItems = [{ ...currentProduct, quantity: quantity + 1 }];
        }
      } else {
        state.cartItems = [...state.cartItems, { ...payload, quantity: 1 }];
      }
    },
    setRemoveProductInCart: (state, { payload }) => {
      const currentProduct = state.cartItems?.find((pr: CartItemModel) => pr.id === payload.id);
      if (currentProduct) {
        const quantity = currentProduct?.quantity || 0;
        const removeCurrent = state.cartItems?.filter((pr: CartItemModel) => pr.id !== payload.id);
        if (quantity > 1) {
          state.cartItems = [...removeCurrent, { ...currentProduct, quantity: quantity - 1 }];
        } else {
          state.cartItems = removeCurrent
        }
      } else {
        state.cartItems = payload
      }
    }
  }
});
export default cartSlice;