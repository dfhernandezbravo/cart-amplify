import { ColorCode } from '@entities/cart/cart.entity';

export type Props = {
  colorCode: ColorCode;
  quantity: number;
  index: number;
  prevTotalQuantity: number;
  // handleRemoveFromCart: (colorCode: ColorCode) => void;
};
