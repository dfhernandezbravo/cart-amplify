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
// import ProductService from '@modules/cartAside/components/molecules/ProductService';
import AvailableQuantity from '@modules/cart/components/organisms/ProductCard/components/AvailableQuantity';
import { useAppSelector } from '@hooks/storeHooks';

const ProductCard = (props: ProductCardProps) => {
  const { selectedQuantityMinicart } = useAppSelector((state) => state.cart);
  const {
    item,
    index,
    onIncrementQuantity,
    onDecrementQuantity,
    onRemoveFromCart,
  } = props;

  if (item.product.availability !== 'available') return null;

  // const hasServiceApplied = item.product.options?.filter(
  //   (obj) => obj.isApplied === true,
  // );

  return (
    <ProductCardContainer>
      <MainContainer>
        <ImageAndDeleteContainer>
          <ProductImage src={item.product.images} alt="" />
          <DeleteButton onRemoveFromCart={onRemoveFromCart} />
        </ImageAndDeleteContainer>

        <ProductInfoContainer>
          <ProductBrand brand={item?.product?.brand} />
          <ProductName
            productName={item?.product?.description}
            productUrl={item?.product?.detailUrl}
          />
          <ProductPrice
            prices={item?.product?.prices}
            quantity={item?.quantity ?? 0}
            adjustment={item?.adjustment}
          />
          {selectedQuantityMinicart.index === index &&
          selectedQuantityMinicart.quantity &&
          item?.quantity < selectedQuantityMinicart.quantity ? (
            <AvailableQuantity quantity={item?.quantity} />
          ) : null}
          <QuantitySelector
            index={index}
            onIncrementQuantity={onIncrementQuantity}
            quantity={item?.quantity ?? 0}
            onDecrementQuantity={onDecrementQuantity}
            item={item}
          />
        </ProductInfoContainer>
      </MainContainer>
      {/* {hasServiceApplied?.length
        ? hasServiceApplied.map((obj) => (
            <ProductService key={obj.id} option={obj} />
          ))
        : null} */}
    </ProductCardContainer>
  );
};

export default ProductCard;
