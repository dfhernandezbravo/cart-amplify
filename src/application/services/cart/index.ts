import Cookies from "js-cookie";
import axios from "axios";
import { bffWebInstance } from "@data-sources/bbf-web-instance";
import { AddOrderItems, UpdateOrderItems } from "@entities/cart/cart.request";
import CartService from "@interfaces/cart-service.interface";

const httpInstance = bffWebInstance;

httpInstance.interceptors.request.use(function (config) {
  const checkoutAuth = Cookies.get("checkoutAuth");
  config.headers.checkoutAuth = checkoutAuth ? checkoutAuth : "";
  return config;
});

const cartService: CartService = {
  getCart: (data) => {
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
};

export default cartService;
