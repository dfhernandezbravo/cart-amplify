import { CartItemModel } from "@store/cart/types";

export type QuantitySelectorProps = {
  quantity: number;
  onIncrementQuantity?: (product: CartItemModel) => void;
  onDecrementQuantity?: (product: CartItemModel) => void;
};
