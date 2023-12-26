import React from 'react';
import { Item } from '@entities/cart/cart.entity';
import ProductImage from '@components/molecules/ProductImage';
import ProductBrand from '@components/molecules/ProductBrand';
import ProductName from '@components/molecules/ProductName';
import DeleteButton from '@components/molecules/DeleteButton';
import {
  WrapperContainer,
  Container,
  OutOfStockMessageContainer,
} from './styles';
import { Divider } from '@modules/cart/components/organisms/PurchaseSummary/styles';

type Props = {
  items: Item[];
  onRemoveFromCart: (value: any) => void;
};

const ProductCardWithouthStock = ({ items, onRemoveFromCart }: Props) => {
  return (
    <WrapperContainer>
      <OutOfStockMessageContainer>
        <p>Productos no disponibles para tu ubicación</p>
      </OutOfStockMessageContainer>
      {items.map((item, idx) => {
        return (
          <div key={idx}>
            <Container>
              <div>
                <ProductImage
                  src={item.product.images}
                  alt={item.product.brand}
                />
              </div>
              <div>
                <ProductBrand brand={item.product.brand} />
                <ProductName
                  productName={item.product.description}
                  productUrl={item?.product?.detailUrl}
                />
                <DeleteButton
                  onRemoveFromCart={() => onRemoveFromCart(item.index)}
                />
              </div>
            </Container>
            {items.length !== idx + 1 && <Divider />}
          </div>
        );
      })}
    </WrapperContainer>
  );
};

export default ProductCardWithouthStock;
