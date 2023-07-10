import { RootState } from "@hooks/storeHooks";
import { createSlice } from "@reduxjs/toolkit";
import { CartItemModel } from "@store/cart/types";
import { Cart, Item } from "@entities/cart/cart.entity";
import getCart from "@use-cases/cart/get-cart";
import addItem from "@use-cases/cart/add-item";
import updateItem from "@use-cases/cart/update-item";
import deleteItem from "@use-cases/cart/delete-item";

type CartState = {
  cartItems: CartItemModel[];
  cartBFF: Cart | null;
  error: string;
  loading: boolean;
};

const initialState: CartState = {
  cartItems: [],
  cartBFF: {} as Cart,
  error: "",
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
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
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        console.log("extraReducers getCart payload ", payload);
        state.cartBFF = payload ?? state.cartBFF;
        state.loading = false;
      })
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, { payload }) => {
        console.log("extraReducers addItem payload ", payload);
        state.cartBFF = payload ?? state.cartBFF;
        state.loading = false;
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, { payload }) => {
        console.log("extraReducers updateItem payload ", payload);
        state.cartBFF = payload ?? state.cartBFF;
        state.loading = false;
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, { payload }) => {
        console.log("extraReducers deleteItem payload ", payload);
        state.cartBFF = payload ?? state.cartBFF;
        state.loading = false;
      });
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
  const total = state.cart.cartBFF?.items?.reduce(
    (acc: number, cur: Item) => acc + (cur?.quantity ?? 0) ?? 0,
    0
  );
  return total ? total : 0;
};
