import { Cart } from "@entities/cart/cart.entity";
import { CartDataEventPayload } from "@entities/events/cart-data-event";
import WindowsEvents from "@events/index";
import { customDispatchEvent } from "@store/events/dispatchEvents";

const dispatchCartDataEvent = (data: Cart | null) => {
  customDispatchEvent<CartDataEventPayload>({
    name: WindowsEvents.CART_DATA,
    detail: {
      shoppingCart: data,
    },
  });
};

export default dispatchCartDataEvent;
