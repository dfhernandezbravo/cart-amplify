import { Container } from './styles';

interface Props {
  id: string;
}

const ProductSku = ({ id }: Props) => {
  return <Container>SKU {id}</Container>;
};

export default ProductSku;
