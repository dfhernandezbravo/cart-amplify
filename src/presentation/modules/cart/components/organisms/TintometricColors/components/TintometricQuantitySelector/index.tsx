import { useState } from 'react';
import QuantitySelector from '@components/atoms/CartQuantitySelector';
import { Props } from './types';
import ModalQuantity from '../../../ModalQuantity';

const TintometricQuantitySelector = ({
  quantity,
  handleChangeQuantity,
}: Props) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantityValue, setQuantityValue] = useState('');

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      <QuantitySelector
        quantitySelected={(value: string) => handleSelectedQuantity(value)}
        quantity={quantity}
        className="tintometric"
      />
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

export default TintometricQuantitySelector;
