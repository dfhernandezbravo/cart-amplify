import { Adjustment, Prices } from "@entities/cart/cart.entity";

export type ProductPriceProps = {
  adjustment: Adjustment[]
  prices: Prices
  quantity: number;
  
};
