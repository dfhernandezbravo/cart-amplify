import { ProductNameProps } from "./types";
import { Container } from "./styles";

const ProductName = (props: ProductNameProps) => {
  const { productName } = props;

  return <Container>{productName?.slice(0, 50)}</Container>;
};

export default ProductName;
