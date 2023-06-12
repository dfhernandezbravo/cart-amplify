import { createSlice } from "@reduxjs/toolkit";
import { CartItemModel } from "@store/cart/types";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [] as CartItemModel[],
  },
  reducers: {
    setAddProductInCart: (state, { payload }) => {
      const productInCart = state.cartItems?.find(
        (item: CartItemModel) => item.productId === payload.productId
      );

      if (productInCart) {
        const quantity = productInCart.quantity ?? 0;
        productInCart.quantity = quantity + 1;
      } else {
        state.cartItems.push({ ...payload, quantity: 1 });
      }
    },
    setRemoveProductInCart: (state, { payload }) => {
      const removeItem = state.cartItems.filter(
        (item: CartItemModel) => item.productId !== payload.productId
      );

      state.cartItems = removeItem;
    },
    setIncrementProductQuantity: (state, { payload }) => {
      const productInCart = state.cartItems?.find(
        (item: CartItemModel) => item.productId === payload.productId
      );

      if (productInCart) {
        const quantity = productInCart.quantity ?? 0;
        productInCart.quantity = quantity + 1;
      }
    },
    setDecrementProductQuantity: (state, { payload }) => {
      const productInCart = state.cartItems?.find(
        (item: CartItemModel) => item.productId === payload.productId
      );

      if (productInCart) {
        const quantity = productInCart.quantity ?? 0;
        productInCart.quantity = quantity > 1 ? quantity - 1 : 1;
      }
    },
    setUpdateProductQuantity: (state, { payload }) => {
      const productInCart = state.cartItems?.find(
        (item: CartItemModel) => item.productId === payload.item.productId
      );

      if (productInCart && productInCart.quantity !== payload.newQuantity) {
        productInCart.quantity = payload.newQuantity;
      }
    },
  },
});

export default cartSlice;
