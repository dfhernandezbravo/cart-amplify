import { ColorCode } from './cart.entity';

export type GetCartRequest = {
  cartId: string;
};

export type SentFrom = 'MINICART' | 'CART';

export type AddItemRequest = {
  cartId: string;
  items: AddBodyItem[];
  sentFrom: SentFrom;
};

export type UpdateItemRequest = {
  cartId: string;
  items: UpdateBodyItem[];
  sentFrom: SentFrom;
};

export type DeleteItemRequest = {
  cartId: string;
  itemIndex: number;
  sentFrom: SentFrom;
};

export type AddBodyItem = {
  quantity: number;
  id: string;
  paintingCode?: ColorCode;
};

export type AddOrderItems = {
  orderItems: AddBodyItem[];
};

export type UpdateBodyItem = {
  quantity: number;
  index: number;
  paintingCode?: ColorCode;
};

export type UpdateOrderItems = {
  orderItems: UpdateBodyItem[];
};

export type AddProductServiceBody = {
  id: string;
};

export type AddProductServiceRequest = {
  cartId: string;
  itemIndex: number;
  id: string;
};

export type DeleteProductServiceRequest = {
  cartId: string;
  itemIndex: number;
  optionId: string;
};
