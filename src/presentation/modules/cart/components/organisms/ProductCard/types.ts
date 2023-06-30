import { CartItemModel } from "@store/cart/types";

export type ProductCardProps = {
  item: CartItemModel;
  onRemoveFromCart: (product: CartItemModel) => void;
  onIncrementQuantity: (product: CartItemModel) => void;
  onDecrementQuantity: (product: CartItemModel) => void;
};
