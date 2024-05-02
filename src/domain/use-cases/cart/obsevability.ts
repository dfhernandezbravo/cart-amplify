import { ObservabilityCart } from '@entities/cart/observability';
import cartService from '@services/cart';

export const observability = async (info: ObservabilityCart) => {
  try {
    return await cartService.observability(info);
  } catch (error) {
    throw new Error('error to send info to new relic');
  }
};

export default observability;
