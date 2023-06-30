import ProductImage from "@components/molecules/ProductImage";
import ProductBrand from "@components/molecules/ProductBrand";
import ProductName from "@components/molecules/ProductName";
import QuantitySelector from "@components/molecules/QuantitySelector";
import ProductPrice from "@components/molecules/ProductPrice";
import DeleteButton from "@components/molecules/DeleteButton";
import { ProductCardProps } from "./types";
import {
  Container,
  ProductInfoContainer,
  ImageAndQuantityContainer,
  PriceAndDeleteContainer,
  TextAndQuantityContainer,
} from "./styles";

const ProductCard = (props: ProductCardProps) => {
  const { item, onIncrementQuantity, onDecrementQuantity, onRemoveFromCart } =
    props;

  return (
    <Container>
      <ProductInfoContainer>
        <ProductBrand brand={item?.brand} />
        <ProductName productName={item?.productName} />
        <ImageAndQuantityContainer>
          <ProductImage
            src={item?.items?.[0].images?.[0]?.imageUrl}
            alt={item?.items?.[0].images?.[0]?.imageText}
          />
          <TextAndQuantityContainer>
            <span>Cantidad:</span>
            <QuantitySelector
              item={item}
              onIncrementQuantity={onIncrementQuantity}
              quantity={item?.quantity ?? 0}
              onDecrementQuantity={onDecrementQuantity}
            />
          </TextAndQuantityContainer>
        </ImageAndQuantityContainer>
      </ProductInfoContainer>
      <PriceAndDeleteContainer>
        <ProductPrice
          offerPrice={item?.items?.[0].sellers?.[0].commertialOffer?.Price ?? 0}
          normalPrice={
            item?.items?.[0].sellers?.[0].commertialOffer?.ListPrice ?? 0
          }
          quantity={item?.quantity ?? 0}
        />
        <DeleteButton hasIcon={true} onRemoveFromCart={onRemoveFromCart} />
      </PriceAndDeleteContainer>
    </Container>
  );
};

export default ProductCard;
