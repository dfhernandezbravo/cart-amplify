import Button from "@components/atoms/Button";
import TotalPriceCencosud from "@components/molecules/TotalPriceCencosud";
import TotalPrice from "@components/molecules/TotalPrice";
import PromotionalCode from "@modules/cart/components/molecules/PromotionalCode";
import { useAppSelector } from "@hooks/storeHooks";
import { selectCart } from "@store/cart";
import { CartItemModel } from "@store/cart/types";
import { formattedCLP } from "@utils/helpers";
import { Container, Divider } from "./styles";

const PurchaseSummary = () => {
  // hooks
  const { cartItems } = useAppSelector(selectCart);

  // methods
  const methods = {
    normalPriceSummary: () => {
      return cartItems?.reduce((acc: number, cur: CartItemModel) => {
        const quantity = cur?.quantity ?? 0;
        const price =
          cur?.items?.[0].sellers?.[0].commertialOffer?.ListPrice ?? 0;

        return acc + quantity * price;
      }, 0);
    },
    offerPriceSummary: () => {
      return cartItems?.reduce((acc: number, cur: CartItemModel) => {
        const quantity = cur?.quantity ?? 0;
        const price = cur?.items?.[0].sellers?.[0].commertialOffer?.Price ?? 0;

        return acc + quantity * price;
      }, 0);
    },
    discounts: () => {
      return methods.normalPriceSummary() - methods.offerPriceSummary();
    },
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
        <span>{formattedCLP(methods.normalPriceSummary())}</span>
      </p>
      <p>
        Costo de envío desde <span>$xx.xxx</span>
      </p>
      <p>
        Descuentos: <span>-{formattedCLP(methods.discounts())}</span>
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
