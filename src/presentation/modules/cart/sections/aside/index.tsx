import PurchaseSummary from "@modules/cart/components/organisms/PurchaseSummary";
import PromotionalCode from "@modules/cart/components/molecules/PromotionalCode";
import { Container } from "./styles";

const Aside = () => {
  return (
    <Container>
      <PromotionalCode />
      <PurchaseSummary />
    </Container>
  );
};

export default Aside;
