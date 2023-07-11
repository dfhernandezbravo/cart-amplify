export type GetCartRequest = {
  cartId: string;
};

export type AddItemRequest = { cartId: string; items: AddBodyItem[] };

export type UpdateItemRequest = { cartId: string; items: UpdateBodyItem[] };

export type DeleteItemRequest = { cartId: string; itemIndex: number };

export type AddBodyItem = {
  quantity: number;
  id: string;
};

export type AddOrderItems = {
  orderItems: AddBodyItem[];
};

export type UpdateBodyItem = {
  quantity: number;
  index: number;
};

export type UpdateOrderItems = {
  orderItems: UpdateBodyItem[];
};
