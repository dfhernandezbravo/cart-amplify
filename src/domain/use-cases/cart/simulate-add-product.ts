import { Cart, Product } from '@entities/cart/cart.entity';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import cartSlice from '@store/cart';

export const useSimulateAddProduct = () => {
  const { cartBFF } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();
  const { setCart } = cartSlice.actions;

  const createNewCart = (product: Product) => {
    const newCart: Cart = {
      id: '',
      currencyCode: '',
      channel: 'web',
      items: [
        {
          itemId: product.productId || '',
          quantity: 1,
          product: { ...product, availability: 'available' },
          adjustment: [],
          priceAfterDiscount: 0,
        },
      ],
    };
    console.log({ newCart });
    dispatch(setCart(newCart));
  };

  const addNewProduct = (product: Product) => {
    if (!cartBFF) return;

    const cart = {
      ...cartBFF,
      items: [
        ...cartBFF.items,
        {
          itemId: product.productId || '',
          quantity: 1,
          product: { ...product, availability: 'available' },
          adjustment: [],
          priceAfterDiscount: 0,
        },
      ],
    };
    dispatch(setCart(cart));
  };

  const updateQuantity = (product: Product) => {
    if (!cartBFF) return;

    const cart: Cart = {
      ...cartBFF,
      items: cartBFF.items.map((item) =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item,
      ),
    };

    dispatch(setCart(cart));
  };

  const simulateAddProduct = (product: Product) => {
    if (!cartBFF?.items) return createNewCart(product);

    const productInCart = cartBFF.items.findIndex(
      (item) => item.product.id === product.id,
    );

    if (productInCart < 0) {
      return addNewProduct(product);
    } else {
      return updateQuantity(product);
    }
  };

  return {
    simulateAddProduct,
  };
};
