import { Cart } from '@entities/cart/cart.entity';

const getCouponCodeId = (cartBFF: Cart) => {
  return cartBFF?.adjustments?.filter(
    (adjustment) => adjustment.type === 'coupon',
  );
};

export default getCouponCodeId;
