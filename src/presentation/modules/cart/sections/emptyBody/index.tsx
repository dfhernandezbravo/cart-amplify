import Image from "next/image";
import { useRouter } from "next/router";
import Button from "@components/atoms/Button";
import { Container, Description, Title } from "./styles";

const EmptyBody = () => {
  const router = useRouter();

  const handleSearchProducts = () => {
    router.push("/");
  };

  return (
    <Container>
      <Image
        src={`/images/empty-cart.svg`}
        width={98}
        height={94}
        alt="empty-cart"
      />
      <Title>Tu carro está vacío</Title>
      <Description>Miles de productos y ofertas te están esperando</Description>
      {/* <Button className="cartBtn cartBtn--primary" onClick={handleLogin}>
        Iniciar sesión
      </Button> */}
      <Button
        className=" cartBtn cartBtn--secondary"
        onClick={handleSearchProducts}
      >
        Buscar productos
      </Button>
    </Container>
  );
};

export default EmptyBody;
