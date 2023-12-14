export type AnalyticsEvents =
  | 'removeFromCart'
  | 'addToCart'
  | 'PageviewVirtual'
  | 'customCart';

export type ProductAnalytics = {
  name: string;
  id: string;
  price: string;
  brand: string;
  category: string;
  variant: string;
  quantity: number;
  dimension1?: string;
  dimension2?: string;
  dimension3?: string;
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

export type CartProductEvent = {
  event: AnalyticsEvents;
  eventType: string;
  ecommerce: RemoveProductImpressions | AddProductImpressions;
};

export type CustomCartImpression = {
  checkout: {
    actionField: {
      step: string;
      action: string;
    };
  };
  products: ProductAnalytics[];
};

type PageviewVirtualEvent = {
  event: AnalyticsEvents;
  page: string;
  title: string;
  location: string;
};

type CustomCartEvent = {
  event: AnalyticsEvents;
  title: string;
  ecommerce: CustomCartImpression;
};

export interface UseAnalytics {
  dispatchAnalyticsEvent: <T>(data: T) => void;
  sendQuantityClickEvent: (data: CartProductEvent) => void;
  sendRemoveFromCart: (data: CartProductEvent) => void;
  sendPageviewVirtualEvent: (data: PageviewVirtualEvent) => void;
  sendCustomCart: (data: CustomCartEvent) => void;
}
