import { Cart, Item } from "@entities/cart/cart.entity";

const totalProductInCart = (cart: Cart) => {
  const total = cart?.items?.reduce(
    (acc: number, cur: Item) => acc + (cur?.quantity ?? 0) ?? 0,
    0,
  );
  return total ? total : 0;
};

export default  totalProductInCart
