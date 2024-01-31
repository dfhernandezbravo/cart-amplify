import Modal from '@components/atoms/Modal';
import { ModalContainer } from './styles';
import { Divider } from '../PurchaseSummary/styles';
import useBreakpoints from '@hooks/useBreakpoints';

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
  const { device } = useBreakpoints();
  return (
    <Modal isOpen={showModal} onClose={() => handleCloseModal()}>
      <ModalContainer>
        <p className="modal-title">Productos no disponibles</p>
        <Divider fullWidth />
        <p className="modal-content">
          Algunos productos no están disponibles en tu ubicación. Al continuar
          se eliminará este producto del carro.
        </p>
        <Divider fullWidth />
        <div className="button-container">
          <button onClick={() => handleCloseModal()}>Cancelar</button>
          <button onClick={() => removeUnavailableItem()}>
            {device === 'Phone' ? 'Continuar' : 'Continuar mi compra'}
          </button>
        </div>
      </ModalContainer>
    </Modal>
  );
};

export default ProductWithoutStockModal;
