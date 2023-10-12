import ProductImage from "@components/molecules/ProductImage";
import ProductBrand from "@components/molecules/ProductBrand";
import ProductName from "@components/molecules/ProductName";
import DeleteButton from "@components/molecules/DeleteButton";


//Types
import { Item } from "@entities/cart/cart.entity";

//Styles
import {
  Container
} from './styles'
import { QuantitySelectorAndDeleteContainer } from "../../styles";
import { Divider } from "@mui/material";

type Props = {
  items: Item[];
  onRemoveFromCart: (index: number) => void
}

const ProductCardWithoutStockMobile = (props: Props) => {
  const { items, onRemoveFromCart } = props;

  return (
    <>
      {items.map((item, index) => {
        return (
          <Container key={index}>
            <div className='image-container'>
              <ProductImage src={item?.product?.images} alt={item?.product?.brand} />
            </div>

            <div className='main-container'>
              <ProductBrand brand={item?.product?.brand} />
              <ProductName productName={item?.product?.description} />
              <p className="product-without-stock-text">Producto no disponible</p>
              <QuantitySelectorAndDeleteContainer>
                <DeleteButton hasIcon={true} onRemoveFromCart={() => onRemoveFromCart(item.index as number)} />
              </QuantitySelectorAndDeleteContainer>
            </div>
          </Container>
        )
      })}
      <Divider/>
    </>
  );
};

export default ProductCardWithoutStockMobile