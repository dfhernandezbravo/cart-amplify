import { ProductBrandProps } from "./types";
import { Container } from "./styles";

const ProductBrand = (props: ProductBrandProps) => {
  const { brand } = props;

  return <Container>{brand?.slice(0, 30)}</Container>;
};

export default ProductBrand;