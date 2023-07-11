import { useRouter } from "next/router";
import Button from "@components/atoms/Button";

const GoToCartButton = () => {
  const router = useRouter();

  const handleClickBtn = () => {
    router.push("/cart");
  };

  return (
    <Button className="linkBtn goToCartBtn fullWidth" onClick={handleClickBtn}>
      Ir al carro de compras
    </Button>
  );
};

export default GoToCartButton;
