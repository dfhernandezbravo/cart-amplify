import LogoImage from "@modules/cart/components/molecules/LogoImage";
import { Container, TextContainer } from "./styles";

const Header = () => {
  return (
    <Container>
      <LogoImage />
      <TextContainer>
        Tu compra es <span>100% segura</span>
      </TextContainer>
    </Container>
  );
};

export default Header;
