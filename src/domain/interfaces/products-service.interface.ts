import { AxiosResponse } from 'axios';
import { Product } from '@cencosud-ds/easy-design-system';

export default interface ProductsService {
  getProductsByIds(data: string): Promise<AxiosResponse<Product[] | any>>;
}
