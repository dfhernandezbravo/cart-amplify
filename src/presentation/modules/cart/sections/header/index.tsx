import LogoImage from "@modules/cart/components/molecules/LogoImage";
import { Container, Title } from "./styles";

const Header = () => {
  return (
    <Container>
      <LogoImage />
      <Title>Carro</Title>
      {/* TODO: call Regionalizer component */}
    </Container>
  );
};

export default Header;
