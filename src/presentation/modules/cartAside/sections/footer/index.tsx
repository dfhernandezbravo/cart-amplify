import BuyButton from '@components/molecules/BuyButton';
import GoToCartButton from '@components/molecules/GoToCartButton';
import TotalPriceCencosud from '@components/molecules/TotalPriceCencosud';
import TotalPrice from '@components/molecules/TotalPrice';
import { FooterContainer } from './styles';

const Footer = () => {
  return (
    <FooterContainer>
      <TotalPriceCencosud className="cartAside" cartAside={true} />
      <TotalPrice className="cartAside" cartAside={true} />
      <BuyButton text="Comprar ahora" />
      <GoToCartButton />
    </FooterContainer>
  );
};

export default Footer;
