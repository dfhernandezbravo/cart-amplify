import Modal from '@components/atoms/Modal';
import { ModalContainer } from './styles';
import { Divider } from '../PurchaseSummary/styles';

interface Props {
  showModal: boolean;
  handleCloseModal: () => void;
  removeUnavailableItem: () => void;
}

const ProductWithoutStockModal = ({
  showModal,
  handleCloseModal,
  removeUnavailableItem,
}: Props) => {
  return (
    <Modal isOpen={showModal} onClose={() => handleCloseModal()}>
      <ModalContainer>
        <p>Title</p>
        <Divider fullWidth />
        <p>
          Algunos productos no están disponibles en tu ubicación. Al continuar
          se eliminará este producto del carro.
        </p>
        <Divider fullWidth />
        <div className="button-container">
          <button onClick={() => handleCloseModal()}>Volver</button>
          <button onClick={() => removeUnavailableItem()}>
            Continuar mi compra{' '}
          </button>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default ProductWithoutStockModal;
