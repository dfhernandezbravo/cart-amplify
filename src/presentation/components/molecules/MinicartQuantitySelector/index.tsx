import { useEffect, useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import cartSlice from '@store/cart';

import Button from '@components/atoms/Button';
import { Textfield } from '@components/atoms/Textfield';
import updateItem from '@use-cases/cart/update-item';
import { QuantitySelectorProps } from './types';
import { QuantitySelectorContainer } from './styles';
import useAnalytics from '@hooks/useAnalytics';

const QuantitySelector = (props: QuantitySelectorProps) => {
  // props
  const { index, quantity, onIncrementQuantity, onDecrementQuantity, item } =
    props;

  // hooks
  const dispatch = useAppDispatch();
  const { cartId, loading } = useAppSelector((state) => state.cart);
  const { updateProductQuantity, resetSelectedQuantityMinicart } =
    cartSlice.actions;
  const {
    methods: { sendQuantityClickEvent },
  } = useAnalytics();

  const [quantityInput, setQuantityInput] = useState(`${quantity}`);
  const [isEditing, setIsEditing] = useState(false);

  const hasTintometric = item.product.colorCodes
    ? item.product.colorCodes.length > 0
    : false;

  // methods
  const methods = {
    updateQuantityInput: () => {
      dispatch(resetSelectedQuantityMinicart());
      const newQuantity = Number(quantityInput);
      if (newQuantity === quantity) return;

      const numberRegex = /^\d+$/; // only integers

      if (newQuantity > 0 && numberRegex.test(quantityInput)) {
        sendQuantityClickEvent({
          event: newQuantity > quantity ? 'addToCart' : 'removeFromCart',
          eventType: 'CH',
          ecommerce: {
            currencyCode: 'CLP',
            add: {
              products: [
                {
                  name: item?.product?.description,
                  id: item?.itemId,
                  price: item?.product?.prices?.normalPrice?.toString(),
                  brand: item?.product?.brand,
                  category: item?.product?.category,
                  variant: '',
                  quantity: Math.abs(quantity - newQuantity),
                },
              ],
            },
          },
        });

        dispatch(
          updateProductQuantity({ index: index, quantity: newQuantity }),
        );
        dispatch(
          updateItem({
            cartId: cartId ?? '',
            items: [{ quantity: newQuantity, index: index }],
          }),
        );
      }
      setIsEditing(false);
    },
  };

  useEffect(() => {
    setQuantityInput(`${quantity}`);
  }, [quantity]);

  return (
    <QuantitySelectorContainer>
      <Button
        className="quantitySelectorBtn quantitySelectorBtn--minus"
        onClick={onDecrementQuantity}
        disabled={quantity === 1}
      >
        <AiOutlineMinus />
      </Button>
      <Textfield
        type="text"
        name="quantityInput"
        min={1}
        onFocus={() => {
          setIsEditing(true);
        }}
        onBlur={methods.updateQuantityInput}
        onChange={(e) => setQuantityInput(e.target.value)}
        value={loading || isEditing ? quantityInput : quantity}
        className="quantityInput"
        disabled={loading || hasTintometric}
      />
      <Button
        className="quantitySelectorBtn quantitySelectorBtn--plus"
        onClick={onIncrementQuantity}
      >
        <AiOutlinePlus />
      </Button>
    </QuantitySelectorContainer>
  );
};

export default QuantitySelector;
