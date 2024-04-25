import { Adjustment } from '@entities/cart/cart.entity';
import { AdjustmentType as PriceAdjustmentType } from '@ccom-easy-design-system/atoms.price/types';

export const formatAdjustments = (
  adjustments: Adjustment[],
): PriceAdjustmentType[] => {
  return adjustments?.map(({ percentageDiscount, value, ...adjustment }) => ({
    ...adjustment,
    value: Math.abs(value),
    percentDiscount: percentageDiscount?.slice(0, -1),
  }));
};
