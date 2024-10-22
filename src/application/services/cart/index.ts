import Cookies from 'js-cookie';
import {
  AddOrderItems,
  AddProductServiceBody,
  UpdateOrderItems,
} from '@entities/cart/cart.request';
import CartService from '@interfaces/cart-service.interface';
import { CouponCode } from '@entities/cart/cart.entity';
import { ObservabilityCart } from '@entities/cart/observability';
import { bffWebInstanceV2 as httpInstance } from '@data-sources/bff-v2/bff-instance';

const valitadeId = (id: string | undefined) => {
  const tokenName = process.env['NEXT_PUBLIC_TOKEN_COOKIE_NAME'] || '';
  const accessToken = Cookies.get(tokenName);
  if (accessToken) return id;

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
    return httpInstance.post(url, body);
  },
  updateItem: (data) => {
    const url = `/shoppingcart/${valitadeId(data.cartId)}/items`;
    const body: UpdateOrderItems = { orderItems: data.items };
    return httpInstance.patch(url, body);
  },
  deleteItem: (data) => {
    const url = `/shoppingcart/${valitadeId(data.cartId)}/items/${
      data.itemIndex
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
  addProductService: (data) => {
    const url = `/shoppingcart/${valitadeId(data.cartId)}/items/${
      data.itemIndex
    }/options`;
    const body: AddProductServiceBody = { id: data.id };
    return httpInstance.post(url, body);
  },
  deleteProductService: (data) => {
    const url = `/shoppingcart/${valitadeId(data.cartId)}/items/${
      data.itemIndex
    }/options/${data.optionId}`;
    return httpInstance.delete(url);
  },
  getAccessToken: () => {
    const url = `/auth/guests/signIn`;
    return httpInstance.post(url);
  },
  observability: (data: ObservabilityCart) => {
    const url = `/observability/custom-events`;
    return httpInstance.post(url, data);
  },
};

export default cartService;
