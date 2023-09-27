import { Cart } from "@entities/cart/cart.entity"


export type QuantitySelectedProps = {
    index: number | null;
    quantity: number | null;
    availableQuantity: number | null
  };

export type InitialState = {
    cartBFF:  Cart | undefined
    loading: boolean;
    quantitySelected: QuantitySelectedProps,
    openDetailsMobile: boolean;
}