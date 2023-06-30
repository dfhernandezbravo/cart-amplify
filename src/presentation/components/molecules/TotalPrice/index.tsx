import { useAppSelector } from "@hooks/storeHooks";
import { selectCart } from "@store/cart";
import { CartItemModel } from "@store/cart/types";
import { formattedCLP } from "../../../utils/helpers";
import { Container } from "./styles";
import { TotalPriceProps } from "./types";

const TotalPrice = (props: TotalPriceProps) => {
  // hooks
  const { cartItems } = useAppSelector(selectCart);

  // props
  const { text, className } = props;

  // methods
  const methods = {
    totalPrice: () => {
      return cartItems?.reduce((acc: number, cur: CartItemModel) => {
        const quantity = cur?.quantity ?? 0;
        const price = cur?.items?.[0].sellers?.[0].commertialOffer?.Price ?? 0;

        return acc + quantity * price;
      }, 0);
    },
  };

  return (
    <Container className={className}>
      {text}
      <span>{formattedCLP(methods.totalPrice())}</span>
    </Container>
  );
};

export default TotalPrice;
