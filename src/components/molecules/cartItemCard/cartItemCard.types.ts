import { CartItemModel } from "@/store/cart/cart.type";

export type ProductCardProps = {
    item: CartItemModel;
    onAddToCart: (product: CartItemModel) => void;
    onRemoveFromCart: (product: CartItemModel) => void;
    onDeleteItem: (product: CartItemModel) => void;
}