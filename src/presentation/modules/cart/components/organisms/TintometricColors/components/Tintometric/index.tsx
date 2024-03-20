import React, { useState } from 'react';
import QuantitySelector from '@components/atoms/CartQuantitySelector';
import DeleteButton from '@components/molecules/DeleteButton';
import ModalQuantity from '../../../ModalQuantity';
import { Color, ColorCode, ColorContainer, Container } from './styles';
import { Props } from './types';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import updateItem from '@use-cases/cart/update-item';
import { UpdateItemRequest } from '@entities/cart/cart.request';

const Tintometric = ({ colorCode, itemIndex, prevTotalQuantity }: Props) => {
  const dispatch = useAppDispatch();
  const { cartId } = useAppSelector((state) => state.cart);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityValue, setQuantityValue] = useState('');

  const handleRemoveFromCart = () => {
    const newTotalQuantity = prevTotalQuantity - colorCode.quantity;
    const item: UpdateItemRequest = {
      cartId: cartId,
      items: [
        {
          quantity: newTotalQuantity,
          index: itemIndex,
          paintingCode: {
            ...colorCode,
            quantity: 0,
          },
        },
      ],
      sentFrom: 'CART',
    };
    console.log('Remove from cart ', item);
    dispatch(updateItem(item));
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleChangeQuantity = (quantity: string) => {
    const newTotalQuantity =
      prevTotalQuantity - colorCode.quantity + Number(quantity);

    const item: UpdateItemRequest = {
      cartId: cartId,
      items: [
        {
          quantity: newTotalQuantity,
          index: itemIndex,
          paintingCode: {
            ...colorCode,
            quantity: Number(quantity),
          },
        },
      ],
      sentFrom: 'CART',
    };
    console.log('handleChangeQuantity ', item);
    dispatch(updateItem(item));
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
          <ColorCode>{colorCode.code}</ColorCode>
        </ColorContainer>
        <QuantitySelector
          quantitySelected={(value: string) => handleSelectedQuantity(value)}
          quantity={colorCode.quantity}
          className="tintometric"
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
