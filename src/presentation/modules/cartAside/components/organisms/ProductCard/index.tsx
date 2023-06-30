import DeleteButton from "@components/molecules/DeleteButton";
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
        <ProductImage
          src={item?.items?.[0].images?.[0]?.imageUrl}
          alt={item?.items?.[0].images?.[0]?.imageText}
        />
        <DeleteButton onRemoveFromCart={onRemoveFromCart} />
      </ImageAndDeleteContainer>

      <ProductInfoContainer>
        <ProductBrand>{item?.brand?.slice(0, 30)}</ProductBrand>
        <ProductName>{item?.productName?.slice(0, 50)}</ProductName>
        <ProductPrice
          offerPrice={item?.items?.[0].sellers?.[0].commertialOffer?.Price ?? 0}
          normalPrice={
            item?.items?.[0].sellers?.[0].commertialOffer?.ListPrice ?? 0
          }
          quantity={item?.quantity ?? 0}
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
