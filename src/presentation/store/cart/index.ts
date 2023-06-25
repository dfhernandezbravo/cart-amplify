import { RootState } from "@hooks/storeHooks";
import { createSlice } from "@reduxjs/toolkit";
import { CartItemModel } from "@store/cart/types";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: [] as CartItemModel[],
  },
  reducers: {
    addProductInCart: (state, { payload }) => {
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
    removeProductInCart: (state, { payload }) => {
      const removeItem = state.cartItems.filter(
        (item: CartItemModel) => item.productId !== payload.productId
      );

      state.cartItems = removeItem;
    },
    incrementProductQuantity: (state, { payload }) => {
      const productInCart = state.cartItems?.find(
        (item: CartItemModel) => item.productId === payload.productId
      );

      if (productInCart) {
        const quantity = productInCart.quantity ?? 0;
        productInCart.quantity = quantity + 1;
      }
    },
    decrementProductQuantity: (state, { payload }) => {
      const productInCart = state.cartItems?.find(
        (item: CartItemModel) => item.productId === payload.productId
      );

      if (productInCart) {
        const quantity = productInCart.quantity ?? 0;
        productInCart.quantity = quantity > 1 ? quantity - 1 : 1;
      }
    },
    updateProductQuantity: (state, { payload }) => {
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

// actions
export const {
  addProductInCart,
  removeProductInCart,
  incrementProductQuantity,
  decrementProductQuantity,
  updateProductQuantity,
} = cartSlice.actions;

// selectors
export const selectCart = (state: RootState) => state.cart;

export const selectTotalProductsInCart = (state: RootState) => {
  return state.cart.cartItems?.reduce(
    (acc: number, cur: CartItemModel) => acc + (cur?.quantity ?? 0) ?? 0,
    0
  );
};
