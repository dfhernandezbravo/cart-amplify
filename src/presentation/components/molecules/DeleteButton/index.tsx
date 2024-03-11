import Button from '@components/atoms/Button';
import { RiDeleteBinLine } from 'react-icons/ri';
import { DeleteButtonProps } from './types';
import { IconAndTextContainer } from './styles';

const DeleteButton = (props: DeleteButtonProps) => {
  const { hasIcon = false, onRemoveFromCart } = props;

  return (
    <Button
      dataId="delete-container-btn"
      className="linkBtn"
      onClick={onRemoveFromCart}
    >
      <IconAndTextContainer>
        {hasIcon ? <RiDeleteBinLine size={'18px'} /> : null}{' '}
        <span>Eliminar</span>
      </IconAndTextContainer>
    </Button>
  );
};

export default DeleteButton;
