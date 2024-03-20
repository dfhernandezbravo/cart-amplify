import { ColorCode } from '@entities/cart/cart.entity';

export type Props = {
  colorCode: ColorCode;
  itemIndex: number;
  prevTotalQuantity: number;
};
