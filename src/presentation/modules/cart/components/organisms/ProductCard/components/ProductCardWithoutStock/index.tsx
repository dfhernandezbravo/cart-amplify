import ProductImage from '@components/molecules/ProductImage';
import ProductBrand from '@components/molecules/ProductBrand';
import ProductName from '@components/molecules/ProductName';
import DeleteButton from '@components/molecules/DeleteButton';
import { useAppSelector } from '@hooks/storeHooks';

import {
  Container,
  ProductInfoContainer,
  ProductInfoAndPriceContainer,
  QuantitySelectorAndDeleteContainer,
} from '../../styles';
import { Item } from '@entities/cart/cart.entity';
import WarningProductWithoutStock from '@components/atoms/WarningProductWithoutStock';

type Props = {
  items: Item[];
  onRemoveFromCart: (index: number) => void;
};

const ProductCardWithoutStock = (props: Props) => {
  const { items, onRemoveFromCart } = props;

  return (
    <>
      <WarningProductWithoutStock />
      {items.map((item, index) => {
        const isLastItem = items?.length === index + 1;
        return (
          <Container key={index} isLastItem={isLastItem}>
            <ProductInfoAndPriceContainer>
              <ProductInfoContainer>
                <ProductImage src={item?.product?.images} alt={''} />
                <div>
                  <ProductBrand brand={item?.product?.brand} />
                  <ProductName
                    productName={item?.product?.description}
                    productUrl={item?.product?.detailUrl}
                  />
                </div>
              </ProductInfoContainer>
            </ProductInfoAndPriceContainer>
            <QuantitySelectorAndDeleteContainer>
              <DeleteButton
                hasIcon={true}
                onRemoveFromCart={() => onRemoveFromCart(item.index as number)}
              />
            </QuantitySelectorAndDeleteContainer>
          </Container>
        );
      })}
    </>
  );
};

export default ProductCardWithoutStock;
