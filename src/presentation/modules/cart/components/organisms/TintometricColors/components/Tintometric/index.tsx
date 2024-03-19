import React, { useState } from 'react';
import QuantitySelector from '@components/atoms/CartQuantitySelector';
import DeleteButton from '@components/molecules/DeleteButton';
import ModalQuantity from '../../../ModalQuantity';
import { Color, ColorContainer, Container } from './styles';
import { Props } from './types';

const Tintometric = ({
  colorCode,
  quantity,
  index,
  prevTotalQuantity, //   handleRemoveFromCart,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityValue, setQuantityValue] = useState('');

  const handleRemoveFromCart = () => {
    console.log('Remove from cart ', colorCode);
    const newQuantity = prevTotalQuantity - colorCode.quantity;
    console.log('prevTotalQuantity', { prevTotalQuantity, newQuantity, index });
    // update with quantity 0
    // quantity: newQuantity,
    // index: index
    // paintingCode: {
    //     ...colorCode,
    //     quantity: 0
    // }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeQuantity = (quantity: string) => {
    // Hacer el update del item
    const newQuantity =
      prevTotalQuantity - colorCode.quantity + Number(quantity);
    console.log('Update item with new quantity');
    console.log('handleChangeQuantity ', {
      quantity,
      index,
      prevTotalQuantity,
      colorCode,
      newQuantity,
    });
  };

  const handleSelectedQuantity = (quantity: string) => {
    if (quantity === '6 +') {
      return setIsModalOpen(true);
    }
    handleChangeQuantity(quantity);
  };

  const handleOnClickQuantity = () => {
    handleSelectedQuantity(quantityValue);
    setQuantityValue('');
    setIsModalOpen(false);
  };

  return (
    <>
      <Container>
        <ColorContainer>
          <Color color={colorCode.hexColor}></Color>
          {colorCode.code}
        </ColorContainer>
        <QuantitySelector
          quantitySelected={(value: string) => handleSelectedQuantity(value)}
          quantity={colorCode.quantity}
        />
        <DeleteButton
          hasIcon={true}
          onRemoveFromCart={() => handleRemoveFromCart()}
        />
      </Container>

      <ModalQuantity
        quantityValue={quantityValue}
        isModalOpen={isModalOpen}
        handleQuantityValue={(value) => setQuantityValue(value)}
        handleCloseModal={handleCloseModal}
        handleOnClick={handleOnClickQuantity}
      />
    </>
  );
};

export default Tintometric;
