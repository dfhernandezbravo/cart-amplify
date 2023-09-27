import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '@hooks/storeHooks';
import { Cart, Item } from '@entities/cart/cart.entity';
import { CartState, ProductQuantityMessage } from './types';
import updateItem from '@use-cases/minicart/update-item';
import deleteItem from '@use-cases/minicart/delete-item';
import dispatchCartHeaderEvent from '@use-cases/minicart/dispatch-cart-header-event';
import dispatchCartDataEvent from '@use-cases/minicart/dispatch-cart-data-event';
import { createNewItem, totalItems } from '@utils/helpers';

const initialState: CartState = {
  cartBFF: {} as Cart,
  cartId: '',
  error: '',
  loading: false,
};

const minicartSlice = createSlice({
  name: 'minicart',
  initialState,
  reducers: {

    addCartId: (state, { payload }) => {
      state.cartId = payload;
    },
    addProductInCart: (state, { payload }) => {
      state.cartBFF = payload;
    },
    simulateAddProduct: (state, { payload }) => {
      const productInCart = state.cartBFF?.items?.find(
        (item) => item.product.id === payload?.productReference,
      );

      if (productInCart) {
        const quantity = productInCart.quantity ?? 0;
        productInCart.quantity = quantity + 1;
        return;
      }

      const newItem = createNewItem(payload);

      if (state.cartBFF?.items) {
        state.cartBFF.items?.push(newItem);
      } else {
        state.cartBFF = {
          id: '',
          currencyCode: '',
          items: [newItem],
        };
      }
    },
    simulateRemoveProduct: (state, { payload }) => {
      const productInCart = state.cartBFF?.items?.find(
        (item) => item.product.id === payload,
      );

      if (productInCart) {
        const quantity = productInCart.quantity ?? 0;

        if (quantity <= 1) {
          const removeItem =
            state.cartBFF?.items.filter(
              (item) => item.product?.id !== payload,
            ) ?? [];
          state.cartBFF!.items = removeItem;
          return;
        }

        productInCart.quantity = quantity - 1;
      }
    },
    incrementProductQuantity: (state, { payload }) => {
      const productInCart = state.cartBFF?.items[payload];

      if (productInCart) {
        productInCart.quantity = productInCart.quantity + 1;
      }
    },
    decrementProductQuantity: (state, { payload }) => {
      const productInCart = state.cartBFF?.items[payload];

      if (productInCart) {
        productInCart.quantity = productInCart.quantity - 1;
      }
    },
    removeProduct: (state, { payload }) => {
      const removeItem =
        state.cartBFF?.items.filter((_, index) => index !== payload) ?? [];
      state.cartBFF!.items = removeItem;
    },
    updateProductQuantity: (state, { payload }) => {
      const productInCart = state.cartBFF?.items[payload.index];
      if (productInCart) {
        productInCart.quantity = payload.quantity;
      }
    }
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

export default minicartSlice;

// actions
export const {
  addProductInCart,
  simulateAddProduct,
  simulateRemoveProduct,
  addCartId,
  incrementProductQuantity,
  decrementProductQuantity,
  updateProductQuantity,
  removeProduct,
} = minicartSlice.actions;

// selectors
export const selectMinicart = (state: RootState) => state.minicart;

export const selectTotalProductsInCart = (state: RootState) => {

  const total = state.minicart.cartBFF?.items?.reduce(
    (acc: number, cur: Item) => acc + (cur?.quantity ?? 0) ?? 0,
    0,
  );
  return total ? total : 0;
};
