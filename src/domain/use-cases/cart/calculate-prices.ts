import { Prices } from '../../entities/cart/cart.entity';

const calculatePrices = (prices: Prices, itemQuantity: number): Prices => {
  const normalPrice = prices?.normalPrice;
  const brandPrice = prices?.brandPrice;
  const offerPrice = prices?.offerPrice;

  return {
    ...prices,
    normalPrice: normalPrice * itemQuantity,
    brandPrice: brandPrice ? brandPrice * itemQuantity : null,
    offerPrice: offerPrice ? offerPrice * itemQuantity : null,
  };
};

export default calculatePrices;
