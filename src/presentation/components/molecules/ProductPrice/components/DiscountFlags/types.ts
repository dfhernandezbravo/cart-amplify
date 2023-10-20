import { Adjustment } from '@entities/cart/cart.entity';

export interface DiscountProps {
  offerDiscount: Adjustment[];
  offerPrice: number;
  quantity: number;
}
