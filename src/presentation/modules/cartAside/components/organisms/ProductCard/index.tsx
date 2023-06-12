import Button from "@components/atoms/Button";
import QuantitySelector from "@components/molecules/QuantitySelector";
import ProductImage from "@components/molecules/ProductImage";
import ProductPrice from "@components/molecules//ProductPrice";
import { ProductCardProps } from "./types";
import {
  ProductCardContainer,
  ProductName,
  ProductInfoContainer,
  ProductBrand,
  ImageAndDeleteContainer,
} from "./styles";

const ProductCard = (props: ProductCardProps) => {
  const { item, onIncrementQuantity, onDecrementQuantity, onRemoveFromCart } =
    props;

  return (
    <ProductCardContainer>
      <ImageAndDeleteContainer>
        {item?.items?.[0].images?.[0].imageUrl && (
          <ProductImage image={item?.items?.[0].images?.[0]} />
        )}
        <Button className="linkBtn" onClick={onRemoveFromCart}>
          Eliminar
        </Button>
      </ImageAndDeleteContainer>

      <ProductInfoContainer>
        <ProductBrand>{item?.brand?.slice(0, 30)}</ProductBrand>
        <ProductName>{item?.productName?.slice(0, 50)}</ProductName>
        <ProductPrice
          offerPrice={item?.items?.[0].sellers?.[0].commertialOffer?.Price ?? 0}
          normalPrice={
            item?.items?.[0].sellers?.[0].commertialOffer?.ListPrice ?? 0
          }
        />
        <QuantitySelector
          item={item}
          onIncrementQuantity={onIncrementQuantity}
          quantity={item?.quantity ?? 0}
          onDecrementQuantity={onDecrementQuantity}
        />
      </ProductInfoContainer>
    </ProductCardContainer>
  );
};

export default ProductCard;
