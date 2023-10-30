import { formattedCLP } from '@utils/helpers';
import { Prices } from '@entities/cart/cart.entity';
import { NormalPrice } from '../../styles';

interface Props {
  prices: Prices;
  quantity: number;
}

const StrikethroughPrice = ({ prices, quantity }: Props) => {
  return (
    <NormalPrice>
      Normal: {formattedCLP(prices.normalPrice * quantity)}
    </NormalPrice>
  );
};

export default StrikethroughPrice;
