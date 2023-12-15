import { Item } from '@entities/cart/cart.entity';

export type ProductCardProps = {
  item: Item;
  itemStockModify: number | null;
  onRemoveFromCart: (product: Item) => void;
  handleChangeQuantity: (value: string) => void;
  index: number;
};
