import DeleteButton from '@components/molecules/DeleteButton';
import QuantitySelector from '@components/molecules/MinicartQuantitySelector';
import ProductImage from '@components/molecules/ProductImage';
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
import Tintometric from '@components/molecules/Tintometric';
import Price from '@components/atoms/BitPrice';
import calculatePrices from '@use-cases/cart/calculate-prices';
import { formatAdjustments } from '@use-cases/cart/format-adjustments';

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

  const showMaxAvailableQuantityMessage =
    selectedQuantityMinicart.index !== null &&
    selectedQuantityMinicart.availableQuantity !== null &&
    selectedQuantityMinicart.sentQuantity !== null &&
    selectedQuantityMinicart.index === index &&
    selectedQuantityMinicart.sentQuantity >
      selectedQuantityMinicart.availableQuantity;

  return (
    <ProductCardContainer data-id={`product-card-${item.product.productId}`}>
      <MainContainer>
        <ImageAndDeleteContainer>
          <ProductImage
            src={item.product.imageUrl || item.product.images}
            alt=""
          />
          <DeleteButton onRemoveFromCart={onRemoveFromCart} />
        </ImageAndDeleteContainer>

        <ProductInfoContainer>
          <ProductBrand brand={item?.product?.brand} />
          <ProductName
            productName={item?.product?.description}
            productUrl={item?.product?.detailUrl}
          />
          <Price
            price={calculatePrices(item?.product?.prices, item?.quantity)}
            adjustments={formatAdjustments(item?.adjustment)}
          />
          <Tintometric item={item} />
          {showMaxAvailableQuantityMessage &&
          selectedQuantityMinicart.availableQuantity !== null ? (
            <AvailableQuantity
              quantity={selectedQuantityMinicart.availableQuantity}
            />
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
