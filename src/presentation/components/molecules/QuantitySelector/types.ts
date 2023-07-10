import { Item } from "@entities/cart/cart.entity";

export type QuantitySelectorProps = {
  item: Item;
  quantity: number;
  onIncrementQuantity?: (product: Item) => void;
  onDecrementQuantity?: (product: Item) => void;
};
