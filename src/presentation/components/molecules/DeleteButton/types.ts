import { CartItemModel } from "@store/cart/types";

export type DeleteButtonProps = {
  hasIcon?: boolean;
  onRemoveFromCart: (product: CartItemModel) => void;
};
