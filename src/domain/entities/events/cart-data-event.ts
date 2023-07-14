import { Cart } from "@entities/cart/cart.entity";

export type CartDataEventPayload = {
  shoppingCart: Cart | null;
};
