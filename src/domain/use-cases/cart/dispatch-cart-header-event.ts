import { CartHeaderEventPayload } from "@entities/events/cart-header-event";
import WindowsEvents from "@events/index";
import { customDispatchEvent } from "@store/events/dispatchEvents";

const dispatchCartHeaderEvent = (quantity: number) => {
  customDispatchEvent<CartHeaderEventPayload>({
    name: WindowsEvents.CART_HEADER,
    detail: {
      isShoppingCartUsed: true,
      quantityItems: quantity,
    },
  });
};

export default dispatchCartHeaderEvent;
