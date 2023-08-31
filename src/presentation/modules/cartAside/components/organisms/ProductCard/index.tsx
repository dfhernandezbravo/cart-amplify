import DeleteButton from "@components/molecules/DeleteButton";
import QuantitySelector from "@components/molecules/QuantitySelector";
import ProductImage from "@components/molecules/ProductImage";
import ProductPrice from "@components/molecules//ProductPrice";
import ProductBrand from "@components/molecules/ProductBrand";
import ProductName from "@components/molecules/ProductName";
import { ProductCardProps } from "./types";
import {
  ProductCardContainer,
  ProductInfoContainer,
  ImageAndDeleteContainer,
} from "./styles";

const ProductCard = (props: ProductCardProps) => {
  const {
    item,
    index,
    onIncrementQuantity,
    onDecrementQuantity,
    onRemoveFromCart,
  } = props;


  if(item.product.availability !== 'available') return

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
          offerPrice={item?.product?.prices?.offerPrice}
          normalPrice={item?.product?.prices?.normalPrice}
          quantity={item?.quantity ?? 0}
        />
        <QuantitySelector
          index={index}
          onIncrementQuantity={onIncrementQuantity}
          quantity={item?.quantity ?? 0}
          onDecrementQuantity={onDecrementQuantity}
        />
      </ProductInfoContainer>
    </ProductCardContainer>
  );
};

export default ProductCard;
