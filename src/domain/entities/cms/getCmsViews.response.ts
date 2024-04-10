export type Content = {
  image: null | string;
  items?: string;
  products?: string;
  maxItems: null | number;
  fieldName: 'skuId' | 'productId' | 'clusterId' | 'sku';
  endDate: '';
  startDate: '';
  isActive: boolean;
  component: 'showcase' | 'featured-products';
  title: string;
};

export type GetCmsViewsResponse = {
  viewName: string;
  eventName: string;
  content: Content[];
};
