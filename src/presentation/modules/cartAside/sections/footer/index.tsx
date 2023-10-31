import BuyButton from '@components/molecules/BuyButton';
import GoToCartButton from '@components/molecules/GoToCartButton';
import TotalPriceCencosud from '@components/molecules/TotalPriceCencosud';
import TotalPrice from '@components/molecules/TotalPrice';
import { FooterContainer } from './styles';
import TotalCencopayPrice from '@components/molecules/TotalCencopayPrice';

const Footer = () => {
  return (
    <FooterContainer>
      <TotalCencopayPrice cartAside={true} />
      <TotalPriceCencosud className="cartAside" cartAside={true} />
      <TotalPrice className="cartAside" cartAside={true} />
      <BuyButton text="Comprar ahora" />
      <GoToCartButton />
    </FooterContainer>
  );
};

export default Footer;
