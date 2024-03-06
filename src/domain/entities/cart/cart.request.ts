export type GetCartRequest = {
  cartId: string;
};

export type AddItemRequest = { cartId: string; items: AddBodyItem[] };

export type UpdateItemRequest = { cartId: string; items: UpdateBodyItem[] };

export type DeleteItemRequest = { cartId: string; itemIndex: number };

type PaintingCode = {
  code: string;
  hexColor: string;
};

export type AddBodyItem = {
  quantity: number;
  id: string;
  paintingCode?: PaintingCode;
};

export type AddOrderItems = {
  orderItems: AddBodyItem[];
};

export type UpdateBodyItem = {
  quantity: number;
  index: number;
  paintingCode?: PaintingCode;
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
