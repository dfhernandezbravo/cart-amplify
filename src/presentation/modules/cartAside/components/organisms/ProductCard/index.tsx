import DeleteButton from '@components/molecules/DeleteButton';
import QuantitySelector from '@components/molecules/MinicartQuantitySelector';
import ProductImage from '@components/molecules/ProductImage';
import ProductPrice from '@components/molecules//ProductPrice';
import ProductBrand from '@components/molecules/ProductBrand';
import ProductName from '@components/molecules/ProductName';
import { ProductCardProps } from './types';
import {
  ProductCardContainer,
  ProductInfoContainer,
  ImageAndDeleteContainer,
  MainContainer,
} from './styles';
import ProductService from '@modules/cartAside/components/molecules/ProductService';
import { useAppSelector } from '@hooks/storeHooks';

const ProductCard = (props: ProductCardProps) => {
  const {
    item,
    index,
    onIncrementQuantity,
    onDecrementQuantity,
    onRemoveFromCart,
  } = props;

  const { isHeadless } = useAppSelector((state) => state.cart);

  if (item.product.availability !== 'available') return null;

  const hasAppliedServices = item.product.options?.filter(
    (obj) => obj.isApplied === true,
  );

  return (
    <ProductCardContainer>
      <MainContainer>
        <ImageAndDeleteContainer>
          <ProductImage src={item.product.images} alt="" />
          <DeleteButton onRemoveFromCart={onRemoveFromCart} />
        </ImageAndDeleteContainer>

        <ProductInfoContainer>
          <ProductBrand brand={item?.product?.brand} />
          <ProductName productName={item?.product?.description} />
          <ProductPrice
            prices={item?.product?.prices}
            quantity={item?.quantity ?? 0}
            adjustment={item?.adjustment}
          />
          <QuantitySelector
            index={index}
            onIncrementQuantity={onIncrementQuantity}
            quantity={item?.quantity ?? 0}
            onDecrementQuantity={onDecrementQuantity}
            item={item}
          />
        </ProductInfoContainer>
      </MainContainer>
      {isHeadless && hasAppliedServices?.length
        ? hasAppliedServices.map((obj) => (
            <ProductService key={obj.id} option={obj} />
          ))
        : null}
    </ProductCardContainer>
  );
};

export default ProductCard;
