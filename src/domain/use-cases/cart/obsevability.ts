import { Observability } from '@entities/cart/observability';
import cartService from '@services/cart';
import getInstanceHttp from './get-instance-http';

export const observability = async (info: Observability) => {
  try {
    return await cartService(getInstanceHttp()).observability(info);
  } catch (error) {
    throw new Error('error to send info to new relic');
  }
};

export default observability;
