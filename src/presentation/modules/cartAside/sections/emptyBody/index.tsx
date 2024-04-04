import MinicartError from '@modules/cart/components/molecules/MinicartError';
import { EmptyBodyContainer } from './styles';

const EmptyBody = () => {
  return (
    <EmptyBodyContainer>
      <MinicartError />
      Tu carro está vacío
    </EmptyBodyContainer>
  );
};

export default EmptyBody;
