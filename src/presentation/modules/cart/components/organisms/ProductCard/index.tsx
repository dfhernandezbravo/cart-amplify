import { useState } from "react";

import ProductImage from "@components/molecules/ProductImage";

import ProductBrand from "@components/molecules/ProductBrand";
import ProductName from "@components/molecules/ProductName";
import ProductPrice from "@components/molecules/ProductPrice";
import DeleteButton from "@components/molecules/DeleteButton";
import QuantitySelector from "@components/atoms/QuantitySelector";
import { useAppSelector } from "@hooks/storeHooks";
import { ProductCardProps } from "./types";
import {
  Container,
  ProductInfoContainer,
  ProductInfoAndPriceContainer,
  QuantitySelectorAndDeleteContainer,
  Loader,
  ImageContainer,
  QuantitySelectorContainer,
} from "./styles";
import AvailableQuantity from "./components/AvailableQuantity";
import Modal from "@components/atoms/modal";

const ProductCard = (props: ProductCardProps) => {
  const { item, onRemoveFromCart, handleChangeQuantity, itemStockModify } =
    props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityValue, setQuantityValue] = useState('')

  const { loading } = useAppSelector((state) => state.cart);

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSelectedQuantity = (quantity: string) => {
    if (quantity === "6 +") {
      return setIsModalOpen(true);
    }
    handleChangeQuantity(quantity);
  };

  const handleOnClickQuantity = () => {
    handleSelectedQuantity(quantityValue)
    setQuantityValue('')
    setIsModalOpen(false)
  }

  if (item.product.availability !== "available") return null;

  return (
    <>
      <Container>
        {/* TODO  Improve the loader*/}
        {loading && <Loader>Loading...</Loader>}
        <ProductInfoAndPriceContainer>
          <ProductInfoContainer>
            <ImageContainer>
              <ProductImage src={item?.product?.images} alt={""} />
              {itemStockModify && (
                <AvailableQuantity quantity={itemStockModify as number} />
              )}
            </ImageContainer>
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
          <QuantitySelector
            quantitySelected={(value: string) => handleSelectedQuantity(value)}
            quantity={item?.quantity}
          />
          <DeleteButton hasIcon={true} onRemoveFromCart={onRemoveFromCart} />
        </QuantitySelectorAndDeleteContainer>
      </Container>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <QuantitySelectorContainer>
        <p>Elige cantidad</p>
        <input type="number" value={quantityValue}  placeholder="Ingresa la cantidad" onChange={(value) => setQuantityValue(value.target.value)}/>
        <button onClick={ () => handleOnClickQuantity()}>Aplicar</button>
        </QuantitySelectorContainer>
      </Modal>
    </>
  );
};

export default ProductCard;
