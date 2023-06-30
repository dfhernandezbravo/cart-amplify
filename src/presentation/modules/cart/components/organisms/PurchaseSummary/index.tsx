import TotalPriceCencosud from "@components/molecules/TotalPriceCencosud";
import TotalPrice from "@components/molecules/TotalPrice";
import BuyButton from "@components/molecules/BuyButton";
import { Container } from "./styles";
import { useAppSelector } from "@hooks/storeHooks";
import { selectCart } from "@store/cart";
import { CartItemModel } from "@store/cart/types";
import { formattedCLP } from "../../../../../utils/helpers";

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
  };

  return (
    <Container>
      <h1>Resumen de mi compra</h1>
      <p>
        Costo de tus productos:
        <span>{formattedCLP(methods.normalPriceSummary())}</span>
      </p>
      <p>
        Costo de envío: <span>A partir de: $xx.xxx</span>
      </p>
      <p>
        Descuentos: <span>-{formattedCLP(methods.discounts())}</span>
      </p>

      <TotalPriceCencosud className="purchaseSummary" text="Subtotal" />
      <TotalPrice className="purchaseSummary" text="Total" />
      <BuyButton text="Ir a comprar" />
    </Container>
  );
};

export default PurchaseSummary;
