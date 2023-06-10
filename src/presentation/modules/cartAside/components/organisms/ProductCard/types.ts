import { CartItemModel } from "@store/cart/types";

export type ProductCardProps = {
  item: CartItemModel;
  // onAddToCart: (product: CartItemModel) => void;
  onRemoveFromCart: (product: CartItemModel) => void;
  onIncrementQuantity: (product: CartItemModel) => void;
  onDecrementQuantity: (product: CartItemModel) => void;
};
