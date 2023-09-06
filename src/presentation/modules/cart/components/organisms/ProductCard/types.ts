import { Item } from "@entities/cart/cart.entity";

export type ProductCardProps = {
  item: Item;
  onRemoveFromCart: (product: Item) => void;
  handleChangeQuantity: (product:Item, value: string) => void;
};
