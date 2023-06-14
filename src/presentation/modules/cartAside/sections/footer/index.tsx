import BuyButton from "@components/molecules/BuyButton";
import GoToCartButton from "@components/molecules/GoToCartButton";
import TotalPriceCencosud from "@components/molecules/TotalPriceCencosud";
import TotalPrice from "@components/molecules/TotalPrice";
import { FooterContainer } from "./styles";

const Footer = () => {
  return (
    <FooterContainer>
      <TotalPriceCencosud />
      <TotalPrice />
      <BuyButton />
      <GoToCartButton />
    </FooterContainer>
  );
};

export default Footer;
