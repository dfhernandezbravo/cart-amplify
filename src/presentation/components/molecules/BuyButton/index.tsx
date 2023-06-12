import Button from "@components/atoms/Button";

const BuyButton = () => {
  const handleClickBtn = () => {
    console.log("BuyButton clicked");
  };

  return (
    <Button className="buyBtn" onClick={handleClickBtn}>
      Comprar ahora
    </Button>
  );
};

export default BuyButton;
