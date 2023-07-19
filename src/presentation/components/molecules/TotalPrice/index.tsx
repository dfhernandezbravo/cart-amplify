import { useAppSelector } from "@hooks/storeHooks";
import { selectCart } from "@store/cart";
import { formattedCLP } from "@utils/helpers";
import { Container } from "./styles";
import { TotalPriceProps } from "./types";

const TotalPrice = (props: TotalPriceProps) => {
  // hooks
  const { cartBFF, loading } = useAppSelector(selectCart);

  // props
  const { className } = props;

  return (
    <Container className={className}>
      Total con otros medios de pago
      {loading ? (
        <span className="skeleton"></span>
      ) : (
        <span>{formattedCLP(cartBFF?.totals?.totalPrice ?? 0)}</span>
      )}
    </Container>
  );
};

export default TotalPrice;
