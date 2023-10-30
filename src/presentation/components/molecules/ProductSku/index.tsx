import { Container } from './styles';

interface Props {
  id: string;
}

const ProductSku = ({ id }: Props) => {
  return <p>SKU {id}</p>;
};

export default ProductSku;
