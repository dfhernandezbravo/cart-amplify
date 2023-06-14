import Image from "next/image";
import { ProductImageProps } from "./types";
import { Container } from "./styles";

const ProductImage = (props: ProductImageProps) => {
  const { image } = props;

  return (
    <Container>
      <Image
        src={image.imageUrl ?? ""}
        alt={image.imageText ?? "Imagen del producto"}
        width={100}
        height={100}
      />
    </Container>
  );
};

export default ProductImage;
