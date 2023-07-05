import ProductImage from "@components/molecules/ProductImage";
import ProductBrand from "@components/molecules/ProductBrand";
import ProductName from "@components/molecules/ProductName";
import ProductPrice from "@components/molecules/ProductPrice";
import DeleteButton from "@components/molecules/DeleteButton";
import { ProductCardProps } from "./types";
import {
  Container,
  ProductInfoContainer,
  ProductInfoAndPriceContainer,
  QuantitySelectorAndDeleteContainer,
} from "./styles";

const ProductCard = (props: ProductCardProps) => {
  const { item, onRemoveFromCart } = props;

  return (
    <Container>
      <ProductInfoAndPriceContainer>
        <ProductInfoContainer>
          <ProductImage
            src={item?.items?.[0].images?.[0]?.imageUrl}
            alt={item?.items?.[0].images?.[0]?.imageText}
          />
          <div>
            <ProductBrand brand={item?.brand} />
            <ProductName productName={item?.productName} />
          </div>
        </ProductInfoContainer>
        <div>
          <ProductPrice
            offerPrice={
              item?.items?.[0].sellers?.[0].commertialOffer?.Price ?? 0
            }
            normalPrice={
              item?.items?.[0].sellers?.[0].commertialOffer?.ListPrice ?? 0
            }
            quantity={item?.quantity ?? 0}
          />
        </div>
      </ProductInfoAndPriceContainer>
      <QuantitySelectorAndDeleteContainer>
        <div>NewQuantitySelector</div>
        <DeleteButton hasIcon={true} onRemoveFromCart={onRemoveFromCart} />
      </QuantitySelectorAndDeleteContainer>
    </Container>
  );
};

export default ProductCard;
