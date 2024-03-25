import ProductsService from '@interfaces/products-service.interface';
import { bffWebInstanceV1 } from '@data-sources/bff-v1/bff-instance';

const productsService = (httpInstance = bffWebInstanceV1): ProductsService => ({
  getProductsByIds: (data) => {
    const url = `/products/list?productIds=${encodeURIComponent(data)}`;
    return httpInstance.get(url);
  },
});

export default productsService;
