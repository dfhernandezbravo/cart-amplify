import ProductImage from '@components/molecules/ProductImage';
import ProductBrand from '@components/molecules/ProductBrand';
import ProductName from '@components/molecules/ProductName';
import DeleteButton from '@components/molecules/DeleteButton';

//Types
import { Item } from '@entities/cart/cart.entity';

//Styles
import { Container } from './styles';
import { QuantitySelectorAndDeleteContainer } from '../../styles';
import { Divider } from '@mui/material';
import WarningProductWithoutStock from '@components/atoms/WarningProductWithoutStock';

type Props = {
  items: Item[];
  onRemoveFromCart: (index: number) => void;
};

const ProductCardWithoutStockMobile = (props: Props) => {
  const { items, onRemoveFromCart } = props;

  return (
    <>
      <WarningProductWithoutStock />
      {items.map((item, index) => {
        return (
          <Container key={index}>
            <div className="image-container">
              <ProductImage
                src={item?.product?.images}
                width={50}
                height={50}
                alt={item?.product?.brand}
              />
            </div>

            <div className="main-container">
              <div className="description-container">
                <ProductBrand brand={item?.product?.brand} />
                <ProductName
                  productName={item?.product?.description}
                  productUrl={item?.product?.detailUrl}
                />
              </div>
              <QuantitySelectorAndDeleteContainer>
                <DeleteButton
                  hasIcon={true}
                  onRemoveFromCart={() =>
                    onRemoveFromCart(item.index as number)
                  }
                />
              </QuantitySelectorAndDeleteContainer>
            </div>
          </Container>
        );
      })}
      <Divider />
    </>
  );
};

export default ProductCardWithoutStockMobile;
