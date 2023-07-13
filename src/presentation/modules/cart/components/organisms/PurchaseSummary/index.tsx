import Button from "@components/atoms/Button";
import TotalPriceCencosud from "@components/molecules/TotalPriceCencosud";
import TotalPrice from "@components/molecules/TotalPrice";
import PromotionalCode from "@modules/cart/components/molecules/PromotionalCode";
import { useAppSelector } from "@hooks/storeHooks";
import { selectCart } from "@store/cart";
import { formattedCLP } from "@utils/helpers";
import { Container, Divider } from "./styles";

const PurchaseSummary = () => {
  // hooks
  const { cartBFF } = useAppSelector(selectCart);

  // methods
  const methods = {
    handleGoToCheckout: () => {
      console.log("handleGoToCheckout clicked!");
    },
  };

  return (
    <Container>
      <h1>Resumen de mi compra</h1>
      <Divider />
      <p>
        Subtotal
        <span>{formattedCLP(cartBFF?.totals?.subtotal ?? 0)}</span>
      </p>
      <p>
        Costo de envío desde{" "}
        <span>{formattedCLP(cartBFF?.totals?.shippingPrice ?? 0)}</span>
      </p>
      <p>
        Descuentos:{" "}
        <span>-{formattedCLP(Math.abs(cartBFF?.totals?.discount ?? 0))}</span>
      </p>
      <Divider className="light" />
      <TotalPriceCencosud className="purchaseSummary" />
      <TotalPrice className="purchaseSummary" />
      {/* <BuyButton text="Ir a comprar" /> */}
      <Button
        className="cartBtn cartBtn--primary fullWidth"
        onClick={methods.handleGoToCheckout}
      >
        Continuar tu compra
      </Button>
      <PromotionalCode />
    </Container>
  );
};

export default PurchaseSummary;
