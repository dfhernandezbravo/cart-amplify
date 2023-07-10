import DeleteButton from "@components/molecules/DeleteButton";
import QuantitySelector from "@components/molecules/QuantitySelector";
import ProductImage from "@components/molecules/ProductImage";
import ProductPrice from "@components/molecules//ProductPrice";
import { ProductCardProps } from "./types";
import {
  ProductCardContainer,
  ProductInfoContainer,
  ImageAndDeleteContainer,
} from "./styles";
import ProductBrand from "@components/molecules/ProductBrand";
import ProductName from "@components/molecules/ProductName";

const ProductCard = (props: ProductCardProps) => {
  const { item, onIncrementQuantity, onDecrementQuantity, onRemoveFromCart } =
    props;

  return (
    <ProductCardContainer>
      <ImageAndDeleteContainer>
        <ProductImage src={item.product.images} alt="" />
        <DeleteButton onRemoveFromCart={onRemoveFromCart} />
      </ImageAndDeleteContainer>

      <ProductInfoContainer>
        <ProductBrand brand={item?.product?.brand} />
        <ProductName productName={item?.product?.description} />
        <ProductPrice
          offerPrice={item?.product?.prices?.offerPrice ?? 0}
          normalPrice={item?.product?.prices?.normalPrice ?? 0}
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
