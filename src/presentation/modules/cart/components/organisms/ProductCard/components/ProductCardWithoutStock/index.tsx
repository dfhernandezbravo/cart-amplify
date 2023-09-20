import ProductImage from "@components/molecules/ProductImage";
import ProductBrand from "@components/molecules/ProductBrand";
import ProductName from "@components/molecules/ProductName";
import DeleteButton from "@components/molecules/DeleteButton";
import { useAppSelector } from "@hooks/storeHooks";

import {
  Container,
  ProductInfoContainer,
  ProductInfoAndPriceContainer,
  QuantitySelectorAndDeleteContainer
} from "../../styles";
import { Item } from "@entities/cart/cart.entity";

type Props = {
  items: Item[];
  onRemoveFromCart: (index: number) => void
}

const ProductCardWithoutStock = (props: Props) => {
  const { items, onRemoveFromCart } = props;

  return (
    <>
      {items.map((item, index) => {
        return (
          <Container key={index}>
            <ProductInfoAndPriceContainer>
              <ProductInfoContainer>
                <ProductImage src={item?.product?.images} alt={""} />
                <div>
                  <ProductBrand brand={item?.product?.brand} />
                  <ProductName productName={item?.product?.description} />
                  <p>Producto no disponible</p>
                </div>
              </ProductInfoContainer>
            </ProductInfoAndPriceContainer>
            <QuantitySelectorAndDeleteContainer>
              <DeleteButton hasIcon={true} onRemoveFromCart={() => onRemoveFromCart(item.index as number)} />
            </QuantitySelectorAndDeleteContainer>
          </Container>
        )
      })}
    </>

  );
};

export default ProductCardWithoutStock;
