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
          <ProductImage src={item?.product?.images} alt={""} />
          <div>
            <ProductBrand brand={item?.product?.brand} />
            <ProductName productName={item?.product?.description} />
          </div>
        </ProductInfoContainer>
        <div>
          <ProductPrice
            offerPrice={item?.product?.prices?.offerPrice}
            normalPrice={item?.product?.prices?.normalPrice}
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
