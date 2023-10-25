import {
  Price,
  PricesContainer,
  WrapperClusterPrice,
  clusterValues,
} from './styles';
import { formattedCLP } from '@utils/helpers';
import { replaceCharacter } from '@utils/replaceCharacter';
import { DiscountProps } from './types';

const ClusterPrice = ({
  offerDiscount,
  offerPrice,
  quantity,
}: DiscountProps) => {
  const hashLabel = {
    EXPERTO: 'Mundo Experto',
    EXPERTO_PREFERENTE: 'Mundo Experto',
    COLABORADOR: 'Colaborador',
  };

  const porcentage = replaceCharacter(
    offerDiscount[0].percentageDiscount,
    '-',
    '',
  );

  return (
    <PricesContainer>
      <div className="cluster-container">
        <Price>{formattedCLP(offerPrice * quantity)}</Price>
        <WrapperClusterPrice cluster={offerDiscount[0].id as clusterValues}>
          <div className="cluster-percent">{porcentage}</div>
          <p className="text-promotion">
            {hashLabel[offerDiscount[0].id as clusterValues]}
          </p>
        </WrapperClusterPrice>
      </div>
    </PricesContainer>
  );
};

export default ClusterPrice;
