import { Item } from "@entities/cart/cart.entity";

export type ProductCardProps = {
  item: Item;
  onRemoveFromCart: (product: Item) => void;
  onIncrementQuantity?: (product: Item) => void;
  onDecrementQuantity?: (product: Item) => void;
};
