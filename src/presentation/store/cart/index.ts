import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

//Thunks
import getCart from "@use-cases/minicart/get-cart";
import updateItem from "@use-cases/minicart/update-item";
import { totalItems } from "@utils/helpers";



export const quantitySelected = { quantity: null, index: null, availableQuantity: null }

const initialValue: InitialState = {
  cartBFF: undefined,
  loading: false,
  quantitySelected,
  openDetailsMobile: false
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
        const totalQuantity = totalItems(state.cartBFF?.items);

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
  }
})


export default cartSlice