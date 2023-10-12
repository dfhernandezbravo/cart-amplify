import { Item } from '@entities/cart/cart.entity';

export type DeleteButtonProps = {
  hasIcon?: boolean;
  onRemoveFromCart: (product: Item) => void;
};
