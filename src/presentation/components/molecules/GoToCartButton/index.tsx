import Button from "@components/atoms/Button";

const GoToCartButton = () => {
  const handleClickBtn = () => {
    console.log("GoToCartButton clicked");
  };

  return (
    <Button className="linkBtn goToCartBtn" onClick={handleClickBtn}>
      Ir al carro de compras
    </Button>
  );
};

export default GoToCartButton;
