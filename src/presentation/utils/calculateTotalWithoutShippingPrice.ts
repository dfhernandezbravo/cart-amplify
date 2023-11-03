import { PriceType, Totals } from '@entities/cart/cart.entity';

const calculateTotalWithoutShippingPrice = (
  totals: Totals,
  priceType: PriceType,
) => {
  const totalPrice = totals ? totals[priceType] || 0 : 0;
  const shippingPrice = totals?.shippingPrice ?? 0;
  return totalPrice - shippingPrice;
};

export default calculateTotalWithoutShippingPrice;
