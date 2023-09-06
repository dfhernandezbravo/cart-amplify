import ProductImage from "@components/molecules/ProductImage";
import ProductBrand from "@components/molecules/ProductBrand";
import ProductName from "@components/molecules/ProductName";
import ProductPrice from "@components/molecules/ProductPrice";
import DeleteButton from "@components/molecules/DeleteButton";
import QuantitySelector from '@components/atoms/QuantitySelector'
import { useAppSelector } from "@hooks/storeHooks";
import { ProductCardProps } from "./types";
import {
  Container,
  ProductInfoContainer,
  ProductInfoAndPriceContainer,
  QuantitySelectorAndDeleteContainer,
  Loader,
} from "./styles";

const ProductCard = (props: ProductCardProps) => {
  const { item, onRemoveFromCart, handleChangeQuantity } = props;

  const {loading} = useAppSelector(state => state.cart)

  const handleSelectedQuantity = (quantity:string) => {
    handleChangeQuantity(item, quantity)
  }

  if(item.product.availability !== 'available') return null

  return (
    <Container>
      {/* TODO  Improve the loader*/}
      {loading && <Loader>Loading...</Loader>}
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
        <QuantitySelector quantitySelected={(value:string) =>handleSelectedQuantity(value) } quantity={item?.quantity}/>
        <DeleteButton hasIcon={true} onRemoveFromCart={onRemoveFromCart} />
      </QuantitySelectorAndDeleteContainer>
    </Container>
  );
};

export default ProductCard;
