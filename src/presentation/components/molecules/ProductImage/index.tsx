import Image from 'next/image';
import { ProductImageProps } from './types';
import { Container } from './styles';

const ProductImage = (props: ProductImageProps) => {
  const { src, alt, width = 100, height = 100 } = props;

  return (
    <Container>
      <Image
        src={src ?? ''}
        alt={alt ?? 'Imagen del producto'}
        width={width}
        height={height}
        priority
      />
    </Container>
  );
};

export default ProductImage;
