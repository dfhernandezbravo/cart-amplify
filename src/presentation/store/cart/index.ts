import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

//Thunks
import getCart from "@use-cases/minicart/get-cart";
import updateItem from "@use-cases/minicart/update-item";
import addCouponCode from "@use-cases/cart/addCouponCode";
import removeCouponCode from "@use-cases/cart/removeCouponCode";


export const quantitySelected = { quantity: null, index: null, availableQuantity: null }

const initialValue: InitialState = {
  cartBFF: undefined,
  loading: false,
  quantitySelected,
  openDetailsMobile: false,
}


const cartSlice = createSlice({
  name: 'cart',
  initialState: initialValue,
  reducers: {
    setQuantitySelected: (state, { payload }) => {
      state.quantitySelected = payload
    },
    setOpenDetailsMobile: (state, { payload }) => {
      state.openDetailsMobile = payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(getCart.pending, state => {
      state.loading = true
    })
    builder.addCase(getCart.fulfilled, (state, { payload }) => {
      console.log({ payload })
      state.cartBFF = payload
      state.loading = false
    })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, { payload }) => {

        const { index, quantity } = state.quantitySelected

        state.cartBFF = payload ?? state.cartBFF;
        state.loading = false;

        if (state.cartBFF?.items &&
          index !== undefined &&
          quantity !== undefined &&
          state.cartBFF.items[index!]?.quantity !== undefined &&
          state.cartBFF.items[index!]?.quantity < quantity!
        ) {
          state.quantitySelected = {
            index,
            quantity,
            availableQuantity: state.cartBFF.items[index!]?.quantity
          }
        }
      })
      .addCase(addCouponCode.pending, (state) => {
        state.loading = true
      })
      .addCase(addCouponCode.fulfilled, (state, { payload }) => {
        state.cartBFF = payload
        state.loading = false
      })
      .addCase(removeCouponCode.pending, (state) => {
        state.loading = true
      })
      .addCase(removeCouponCode.fulfilled, (state, { payload }) => {
        state.cartBFF = payload
        state.loading = false
      })
  }
})


export default cartSlice