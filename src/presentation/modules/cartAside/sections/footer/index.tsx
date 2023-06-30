import BuyButton from "@components/molecules/BuyButton";
import GoToCartButton from "@components/molecules/GoToCartButton";
import TotalPriceCencosud from "@components/molecules/TotalPriceCencosud";
import TotalPrice from "@components/molecules/TotalPrice";
import { FooterContainer } from "./styles";

const Footer = () => {
  return (
    <FooterContainer>
      <TotalPriceCencosud text="Total con Tarjeta Cencosud" />
      <TotalPrice text="Total con otros medios de pago" />
      <BuyButton text="Comprar ahora" />
      <GoToCartButton />
    </FooterContainer>
  );
};

export default Footer;
