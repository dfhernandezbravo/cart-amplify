import DeleteButton from '@components/molecules/DeleteButton';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import updateItem from '@use-cases/cart/update-item';
import { UpdateItemRequest } from '@entities/cart/cart.request';
import cartSlice, { quantitySelected } from '@store/cart';
import { Props } from './types';
import { Color, ColorCode, ColorContainer, Container } from './styles';
import TintometricQuantitySelector from '../TintometricQuantitySelector';

const Tintometric = ({ colorCode, itemIndex, prevTotalQuantity }: Props) => {
  const dispatch = useAppDispatch();
  const { cartId } = useAppSelector((state) => state.cart);

  const { setQuantitySelected } = cartSlice.actions;

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

    dispatch(setQuantitySelected(quantitySelected));
    dispatch(updateItem(item));
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

    dispatch(
      setQuantitySelected({ quantity: newTotalQuantity, index: itemIndex }),
    );
    dispatch(updateItem(item));
  };

  return (
    <>
      <Container>
        <ColorContainer>
          <Color color={colorCode.hexColor}></Color>
          <ColorCode>{colorCode.code}</ColorCode>
        </ColorContainer>
        <TintometricQuantitySelector
          quantity={colorCode.quantity}
          handleChangeQuantity={handleChangeQuantity}
        />
        <DeleteButton
          hasIcon={true}
          onRemoveFromCart={() => handleRemoveFromCart()}
        />
      </Container>
    </>
  );
};

export default Tintometric;
