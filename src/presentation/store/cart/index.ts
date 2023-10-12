import { createSlice } from "@reduxjs/toolkit";
import { InitialState } from "./types";

//Thunks
import getCart from "@use-cases/cart/get-cart";
import updateItem from "@use-cases/cart/update-item";
import addCouponCode from "@use-cases/cart/addCouponCode";
import removeCouponCode from "@use-cases/cart/removeCouponCode";
import { createNewItem, totalItems } from "@utils/helpers";
import dispatchCartHeaderEvent from "@use-cases/cart/dispatch-cart-header-event";
import dispatchCartDataEvent from "@use-cases/cart/dispatch-cart-data-event";
import deleteItem from "@use-cases/cart/delete-item";
import { RootState } from "@hooks/storeHooks";
import { Item } from "@entities/cart/cart.entity";


export const quantitySelected = { quantity: null, index: null, availableQuantity: null }

const initialValue: InitialState = {
  cartBFF: undefined ,
  cartId: '',
  couponId: '',
  loading: false,
  quantitySelected,
  openDetailsMobile: false,
}


const cartSlice = createSlice({
  name: 'cart',
  initialState: initialValue,
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
    },
    setQuantitySelected: (state, { payload }) => {
      state.quantitySelected = payload
    },
    setOpenDetailsMobile: (state, { payload }) => {
      state.openDetailsMobile = payload
    },
    setCouponId: (state, {payload}) => {
      state.couponId = payload
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

        dispatchCartHeaderEvent(totalQuantity);
        dispatchCartDataEvent(payload ?? state.cartBFF);

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
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, { payload }) => {
        state.cartBFF = payload ?? state.cartBFF;
        state.loading = false;
        const totalQuantity = totalItems(state.cartBFF?.items);
        dispatchCartHeaderEvent(totalQuantity);
        dispatchCartDataEvent(payload ?? state.cartBFF);
      })
      .addCase(addCouponCode.pending, (state) => {
        state.loading = true
      })
      .addCase(addCouponCode.fulfilled, (state, { payload }) => {
        state.cartBFF = payload
        state.loading = false
      })
      .addCase(addCouponCode.rejected, (state, {payload}) => {
        console.log('coupon rejected', {payload})
        state.loading = false
      })
      .addCase(removeCouponCode.pending, (state) => {
        state.loading = true
      })
      .addCase(removeCouponCode.fulfilled, (state, { payload }) => {
        state.cartBFF = payload
        state.couponId = ''
        state.loading = false
      })
  }
})

// selectors

export const selectTotalProductsInCart = (state: RootState) => {

  const total = state.cart.cartBFF?.items?.reduce(
    (acc: number, cur: Item) => acc + (cur?.quantity ?? 0) ?? 0,
    0,
  );
  return total ? total : 0;
};


export default cartSlice