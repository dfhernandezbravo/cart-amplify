import { CartItemModel } from "@store/cart/types";

export type QuantitySelectorProps = {
  item: CartItemModel;
  quantity: number;
  onIncrementQuantity?: (product: CartItemModel) => void;
  onDecrementQuantity?: (product: CartItemModel) => void;
};
