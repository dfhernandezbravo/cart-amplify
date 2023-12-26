import { ProductNameProps } from './types';
import { Container } from './styles';
import Link from 'next/link';

const ProductName = (props: ProductNameProps) => {
  const { productName, productUrl } = props;

  return (
    <Container>
      <Link href={productUrl ? productUrl : ''}>
        {productName?.slice(0, 50)}
      </Link>
    </Container>
  );
};

export default ProductName;
