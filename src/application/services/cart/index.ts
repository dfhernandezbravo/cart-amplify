import Cookies from "js-cookie";
// import axios from "axios";
import { bffWebInstance } from "@data-sources/bbf-web-instance";
import { AddOrderItems, UpdateOrderItems } from "@entities/cart/cart.request";
import CartService from "@interfaces/cart-service.interface";
import { CouponCode } from "@entities/cart/cart.entity";

const httpInstance = bffWebInstance;

httpInstance.interceptors.request.use(function (config) {
  const checkoutAuth = Cookies.get("checkoutAuth");
  config.headers.checkoutAuth = checkoutAuth ? checkoutAuth : "";
  return config;
});

const cartService: CartService = {
  getCart: async  (data) => {
    // const url = `/api/cart/getCartById/${data.cartId}`
    // const response = await axios.get(url)
    // return response
    
    const url = `/shoppingcart/${data.cartId}`;
    return httpInstance.get(url);
  },
  addItem: (data) => {
    const url = `/shoppingcart/${data.cartId}/items`;
    const body: AddOrderItems = { orderItems: data.items };
    return httpInstance.post(url, body);
  },
  updateItem: (data) => {
    const url = `/shoppingcart/${data.cartId}/items`;
    const body: UpdateOrderItems = { orderItems: data.items };
    return httpInstance.patch(url, body);
  },
  deleteItem: (data) => {
    const url = `/shoppingcart/${data.cartId}/items/${data.itemIndex}`;
    return httpInstance.delete(url);
  },
  addCoupon: (data: CouponCode) => {
    const url = `/shoppingcart/${data.cartId}/coupon`
    return httpInstance.post(url, {couponCode:data.couponCode})
  },
  removeCoupon: (data) => {
    const url = `/shoppingcart/${data.cartId}/coupon/${data.couponCode}`
    return httpInstance.delete(url)
  }
};

export default cartService;
