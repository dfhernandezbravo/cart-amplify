import ProductsService from '@interfaces/products-service.interface';
import { bffWebInstanceV2 as httpInstance } from '@data-sources/bff-v2/bff-instance';
const productsService: ProductsService = {
  getProductsByIds: (data) => {
    const url = `/products/list?productIds=${encodeURIComponent(data)}`;
    return httpInstance.get(url);
  },
};

export default productsService;
