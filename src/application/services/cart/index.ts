import { bffWebInstance } from '@data-sources/bbf-web-instance';
import { AddOrderItems, UpdateOrderItems } from '@entities/cart/cart.request';
import CartService from '@interfaces/cart-service.interface';
import { CouponCode } from '@entities/cart/cart.entity';

const httpInstance = bffWebInstance;

const valitadeId = (id: string | undefined) => {
  const localId = localStorage.getItem('vtxorderform');
  if (localId && localId !== 'undefined') {
    return localId;
  }
  if (id && id?.length > 0) return id;
};

const cartService: CartService = {
  getCart: async (data) => {
    const url = `/shoppingcart/${valitadeId(data.cartId)}`;
    return httpInstance.get(url);
  },
  addItem: (data) => {
    const url = `/shoppingcart/${valitadeId(data.cartId)}/items`;
    const body: AddOrderItems = { orderItems: data.items };
    // const body: AddOrderItems = {
    //   orderItems: [
    //     {
    //       id: '000',
    //       quantity: 1,
    //     },
    //   ],
    // };

    return httpInstance.post(url, body);
  },
  updateItem: (data) => {
    const url = `/shoppingcart/${valitadeId(data.cartId)}/items`;
    const body: UpdateOrderItems = { orderItems: data.items };
    // const body: UpdateOrderItems = {
    //   orderItems: [
    //     {
    //       index: 9,
    //       quantity: 1,
    //     },
    //   ],
    // };
    return httpInstance.patch(url, body);
  },
  deleteItem: (data) => {
    const url = `/shoppingcart/${valitadeId(data.cartId)}/items/${
      data.itemIndex
      // 9
    }`;
    return httpInstance.delete(url);
  },
  addCoupon: (data: CouponCode) => {
    const url = `/shoppingcart/${valitadeId(data.cartId)}/coupon`;
    return httpInstance.post(url, { couponCode: data.couponCode });
  },
  removeCoupon: (data) => {
    const url = `/shoppingcart/${valitadeId(data.cartId)}/coupon/${
      data.couponCode
    }`;
    return httpInstance.delete(url);
  },
};

export default cartService;
