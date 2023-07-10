import { AxiosResponse } from "axios";
import { Cart } from "@entities/cart/cart.entity";
import {
  AddItemRequest,
  DeleteItemRequest,
  GetCartRequest,
  UpdateItemRequest,
} from "@entities/cart/cart.request";

export default interface CartService {
  getCart(data: GetCartRequest): Promise<AxiosResponse<Cart>>;
  addItem(data: AddItemRequest): Promise<AxiosResponse<Cart>>;
  updateItem(data: UpdateItemRequest): Promise<AxiosResponse<Cart>>;
  deleteItem(data: DeleteItemRequest): Promise<AxiosResponse<Cart>>;
}
