import { AxiosResponse } from 'axios';
import { Cart, CouponCode } from '@entities/cart/cart.entity';
import {
  AddItemRequest,
  AddProductServiceRequest,
  DeleteItemRequest,
  GetCartRequest,
  UpdateItemRequest,
  DeleteProductServiceRequest,
} from '@entities/cart/cart.request';
import { ObservabilityCart } from '@entities/cart/observability';
import { AccesTokenProps } from '@entities/cart/access-token-response';

export default interface CartService {
  getCart(data: GetCartRequest): Promise<AxiosResponse<Cart>>;
  addItem(data: AddItemRequest): Promise<AxiosResponse<Cart>>;
  updateItem(data: UpdateItemRequest): Promise<AxiosResponse<Cart>>;
  deleteItem(data: DeleteItemRequest): Promise<AxiosResponse<Cart>>;
  addCoupon(code: CouponCode): Promise<AxiosResponse<Cart>>;
  removeCoupon(code: CouponCode): Promise<AxiosResponse<Cart>>;
  addProductService(
    data: AddProductServiceRequest,
  ): Promise<AxiosResponse<Cart>>;
  deleteProductService(
    data: DeleteProductServiceRequest,
  ): Promise<AxiosResponse<Cart>>;
  observability(info: ObservabilityCart): Promise<void>;
  getAccessToken(): Promise<AxiosResponse<AccesTokenProps>>;
}
