import { selectCart } from "@store/cart";
import { useAppSelector } from "@hooks/storeHooks";
import { formattedCLP } from "@utils/helpers";
import { TotalPriceCencosudProps } from "./types";
import { Container } from "./styles";

const TotalPriceCencosud = (props: TotalPriceCencosudProps) => {
  // hooks
  const { cartBFF, loading } = useAppSelector(selectCart);

  // props
  const { className } = props;

  return (
    <Container className={className}>
      Total con tarjeta Cencosud
      {loading ? (
        <span className="skeleton"></span>
      ) : (
        <span>{formattedCLP(cartBFF?.totals?.totalCardPrice ?? 0)}</span>
      )}
    </Container>
  );
};

export default TotalPriceCencosud;
