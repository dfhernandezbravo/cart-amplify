import { Item } from '@entities/cart/cart.entity';

export type QuantitySelectorProps = {
  index: number;
  quantity: number;
  onIncrementQuantity: (product: Item) => void;
  onDecrementQuantity: (product: Item) => void;
};
