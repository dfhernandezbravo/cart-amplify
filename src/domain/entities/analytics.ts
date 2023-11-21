export type AnalyticsEvents =
  | 'removeFromCart'
  | 'addToCart'
  | 'PageviewVirtual';

export type ProductAnalytics = {
  name: string;
  id: string;
  price: string;
  brand: string;
  category: string;
  variant: string;
  quantity: number;
};

export type RemoveProductImpressions = {
  currencyCode: string;
  remove: {
    products: ProductAnalytics[];
  };
};

export type AddProductImpressions = {
  currencyCode: string;
  add: {
    products: ProductAnalytics[];
  };
};

export type QuantityProductEvent = {
  event: AnalyticsEvents;
  eventType: string;
  ecommerce: RemoveProductImpressions | AddProductImpressions;
};

type PageviewVirtualEvent = {
  event: AnalyticsEvents;
  page: string;
  title: string;
  location: string;
};

export interface UseAnalytics {
  dispatchAnalyticsEvent: <T>(data: T) => void;
  sendQuantityClickEvent: (data: QuantityProductEvent) => void;
  sendPageviewVirtualEvent: (data: PageviewVirtualEvent) => void;
}
