import Image from 'next/image';
import Modal from '@components/atoms/Modal';
import { HeaderContainer, QuantitySelectorContainer } from './styles';

interface ModalQuantityProps {
  quantityValue: string;
  isModalOpen: boolean;
  handleCloseModal: () => void;
  handleQuantityValue: (value: string) => void;
  handleOnClick: () => void;
}

const ModalQuantity = ({
  quantityValue,
  isModalOpen,
  handleCloseModal,
  handleQuantityValue,
  handleOnClick,
}: ModalQuantityProps) => {
  return (
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
      <QuantitySelectorContainer>
        <HeaderContainer>
          <p>Elige cantidad</p>
          <Image
            className="close-icon"
            onClick={() => handleCloseModal()}
            src="/icons/general/close-modal.svg"
            width={20}
            height={20}
            alt="close-icon"
          />
        </HeaderContainer>
        <input
          type="number"
          value={quantityValue}
          placeholder="Ingresa la cantidad"
          onChange={(value) => handleQuantityValue(value.target.value)}
        />
        <button onClick={() => handleOnClick()}>Aplicar</button>
      </QuantitySelectorContainer>
    </Modal>
  );
};

export default ModalQuantity;
