import { selectError } from '@store/error';
import { useAppSelector } from '@hooks/storeHooks';
import MinicartError from '@modules/cart/components/molecules/MinicartError';
import { EmptyBodyContainer } from './styles';

const EmptyBody = () => {
  const { error } = useAppSelector(selectError);

  return (
    <EmptyBodyContainer>
      {error ? <MinicartError title={error.message} /> : null}
      Tu carro está vacío
    </EmptyBodyContainer>
  );
};

export default EmptyBody;
