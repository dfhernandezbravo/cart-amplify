import { RootState } from "@hooks/storeHooks";
import { createSlice } from "@reduxjs/toolkit";
import { Cart, Item } from "@entities/cart/cart.entity";
import updateItem from "@use-cases/cart/update-item";
import deleteItem from "@use-cases/cart/delete-item";
import dispatchCartHeaderEvent from "@use-cases/cart/dispatch-cart-header-event";
import dispatchCartDataEvent from "@use-cases/cart/dispatch-cart-data-event";
import totalItems from "@utils/helpers";

type CartState = {
  cartBFF: Cart | null;
  cartId: string | undefined;
  error: string;
  loading: boolean;
};

const initialState: CartState = {
  cartBFF: {} as Cart,
  cartId: undefined,
  error: "",
  loading: false,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addCartId: (state, { payload }) => {
      state.cartId = payload;
    },
    addProductInCart: (state, { payload }) => {
      state.cartBFF = payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, { payload }) => {
        state.cartBFF = payload ?? state.cartBFF;
        state.loading = false;
        const totalQuantity = totalItems(state.cartBFF?.items);
        dispatchCartHeaderEvent(totalQuantity);
        dispatchCartDataEvent(payload ?? state.cartBFF);
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, { payload }) => {
        state.cartBFF = payload ?? state.cartBFF;
        state.loading = false;
        const totalQuantity = totalItems(state.cartBFF?.items);
        dispatchCartHeaderEvent(totalQuantity);
        dispatchCartDataEvent(payload ?? state.cartBFF);
      });
  },
});

export default cartSlice;

// actions
export const { addProductInCart, addCartId } = cartSlice.actions;

// selectors
export const selectCart = (state: RootState) => state.cart;

export const selectTotalProductsInCart = (state: RootState) => {
  const total = state.cart.cartBFF?.items?.reduce(
    (acc: number, cur: Item) => acc + (cur?.quantity ?? 0) ?? 0,
    0
  );
  return total ? total : 0;
};
