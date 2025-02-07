import { createSlice } from '@reduxjs/toolkit';
import { InitialState } from './types';

//Thunks
import getCart from '@use-cases/cart/get-cart';
import updateItem from '@use-cases/cart/update-item';
import addCouponCode from '@use-cases/cart/addCouponCode';
import removeCouponCode from '@use-cases/cart/removeCouponCode';
import {
  createNewItem,
  createNewItemHeadless,
  totalItems,
} from '@utils/helpers';
import dispatchCartHeaderEvent from '@use-cases/cart/dispatch-cart-header-event';
import dispatchCartDataEvent from '@use-cases/cart/dispatch-cart-data-event';
import deleteItem from '@use-cases/cart/delete-item';
import { RootState } from '@hooks/storeHooks';
import { Cart, Item } from '@entities/cart/cart.entity';
import addItem from '@use-cases/cart/add-item';
import addProductService from '@use-cases/cart/add-product-service';
import deleteProductService from '@use-cases/cart/delete-product-service';
// import { changeOfAmount } from '@components/atoms/ToastContainer/customMessage';

export const quantitySelected = {
  quantity: null,
  index: null,
  availableQuantity: null,
};

const initialValue: InitialState = {
  cartBFF: undefined,
  cartId: '',
  loading: false,
  quantitySelected,
  openDetailsMobile: false,
  hasHybridation: false,
  isCencopayActive: false,
  isEnabledCheckoutV1: false,
  isHeadless: false,
  cartAsideIsOpen: false,
  selectedQuantityMinicart: {
    index: null,
    availableQuantity: null,
    sentQuantity: null,
  },
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialValue,
  reducers: {
    addCartId: (state, { payload }) => {
      localStorage.setItem('vtxorderform', payload);
      state.cartId = payload;
    },
    addProductInCart: (state, { payload }) => {
      state.cartBFF = payload;
    },
    simulateAddProduct: (state, { payload }) => {
      const productInCart = state.cartBFF?.items?.find(
        (item) => item.product.id === payload?.items[0]?.itemId,
      );

      const quantityValue = payload?.quantityValue; // PDP quantity from vtex hybridation

      if (productInCart) {
        const quantity = productInCart.quantity ?? 0;
        productInCart.quantity = quantityValue
          ? quantity + parseInt(quantityValue)
          : quantity + 1;
        return;
      }

      const newItem = quantityValue
        ? createNewItem(payload, parseInt(quantityValue))
        : createNewItem(payload);

      if (state.cartBFF?.items) {
        state.cartBFF.items?.push(newItem);
      } else {
        state.cartBFF = {
          id: '',
          currencyCode: '',
          items: [newItem],
          channel: 'web',
        };
      }
    },
    simulateAddProductHeadless: (state, { payload }) => {
      const productInCart = state.cartBFF?.items?.find(
        (item) => item.product.id === payload?.id,
      );

      if (productInCart) {
        const quantity = productInCart?.quantity ?? 0;
        productInCart.quantity = quantity + 1;
        return;
      }

      const newItem = createNewItemHeadless(payload);

      if (state.cartBFF?.items) {
        state.cartBFF.items?.push(newItem);
      } else {
        state.cartBFF = {
          id: '',
          currencyCode: '',
          items: [newItem],
          channel: 'web',
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
      state.quantitySelected = payload;
    },
    setOpenDetailsMobile: (state, { payload }) => {
      state.openDetailsMobile = payload;
    },
    setCart: (state, { payload }: { payload: Cart }) => {
      state.cartBFF = payload;
    },
    setLoading: (state, { payload }: { payload: boolean }) => {
      state.loading = payload;
    },
    setIsHeadless: (state, { payload }) => {
      state.isHeadless = payload;
    },
    setCartAsideIsOpen: (state, { payload }) => {
      state.cartAsideIsOpen = payload;
    },
    setParams: (state, { payload }) => {
      state.hasHybridation = payload?.isEnabledMiniCart;
      state.isCencopayActive = payload?.isCencopayActive;
      state.isEnabledCheckoutV1 = payload?.isEnabledCheckoutV1;
    },
    setSelectedQuantityMinicart: (state, { payload }) => {
      state.selectedQuantityMinicart = {
        index: payload.index,
        availableQuantity: payload.availableQuantity,
        sentQuantity: payload.sentQuantity,
      };
    },
    resetSelectedQuantityMinicart: (state) => {
      state.selectedQuantityMinicart = {
        index: null,
        availableQuantity: null,
        sentQuantity: null,
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCart.fulfilled, (state, { payload }) => {
        localStorage.setItem('cbff', JSON.stringify(payload));
        state.cartBFF = payload;
        state.loading = false;
      })
      .addCase(addItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(addItem.fulfilled, (state, { payload }) => {
        localStorage.setItem('cbff', JSON.stringify(payload));
        state.cartBFF = payload;
        state.loading = false;
      })
      .addCase(addItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(updateItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateItem.fulfilled, (state, { payload }) => {
        const { index, quantity } = state.quantitySelected;
        // state.cartBFF = payload ?? state.cartBFF; // TODO: Revisar
        localStorage.setItem('cbff', JSON.stringify(payload));
        state.cartBFF = payload;
        state.loading = false;
        const totalQuantity = totalItems(state.cartBFF?.items);

        dispatchCartHeaderEvent(totalQuantity);
        dispatchCartDataEvent(payload ?? state.cartBFF);

        if (
          state.cartBFF?.items &&
          index !== undefined &&
          quantity !== undefined &&
          state.cartBFF.items[index!]?.quantity !== undefined &&
          state.cartBFF.items[index!]?.quantity < quantity!
        ) {
          const availableItemNewResponse =
            state.cartBFF.items[index!]?.quantity;
          state.quantitySelected = {
            index,
            quantity,
            availableQuantity:
              availableItemNewResponse < (quantity as number)
                ? availableItemNewResponse
                : null,
          };

          // if (availableItemNewResponse < (quantity as number)) {
          //   changeOfAmount();
          // }
        }
      })
      .addCase(updateItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteItem.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteItem.fulfilled, (state, { payload }) => {
        // state.cartBFF = payload ?? state.cartBFF; // TODO: Revisar
        localStorage.setItem('cbff', JSON.stringify(payload));
        state.cartBFF = payload;
        state.loading = false;
        const totalQuantity = totalItems(state.cartBFF?.items);
        dispatchCartHeaderEvent(totalQuantity);
        dispatchCartDataEvent(payload ?? state.cartBFF);
      })
      .addCase(deleteItem.rejected, (state) => {
        state.loading = false;
      })
      .addCase(addCouponCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(addCouponCode.fulfilled, (state, { payload }) => {
        localStorage.setItem('cbff', JSON.stringify(payload));
        state.cartBFF = payload;
        state.loading = false;
      })
      .addCase(addCouponCode.rejected, (state, { payload }) => {
        state.loading = false;
      })
      .addCase(removeCouponCode.pending, (state) => {
        state.loading = true;
      })
      .addCase(removeCouponCode.fulfilled, (state, { payload }) => {
        localStorage.setItem('cbff', JSON.stringify(payload));
        state.cartBFF = payload;
        state.loading = false;
      })
      .addCase(addProductService.pending, (state) => {
        state.loading = true;
      })
      .addCase(addProductService.fulfilled, (state, { payload }) => {
        localStorage.setItem('cbff', JSON.stringify(payload));
        state.cartBFF = payload;
        state.loading = false;
      })
      .addCase(addProductService.rejected, (state) => {
        state.loading = false;
      })
      .addCase(deleteProductService.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteProductService.fulfilled, (state, { payload }) => {
        localStorage.setItem('cbff', JSON.stringify(payload));
        state.cartBFF = payload;
        state.loading = false;
      })
      .addCase(deleteProductService.rejected, (state) => {
        state.loading = false;
      });
  },
});

// selectors

export const selectTotalProductsInCart = (state: RootState) => {
  const total = state.cart.cartBFF?.items?.reduce(
    (acc: number, cur: Item) => acc + (cur?.quantity ?? 0) ?? 0,
    0,
  );
  return total ? total : 0;
};

export default cartSlice;
