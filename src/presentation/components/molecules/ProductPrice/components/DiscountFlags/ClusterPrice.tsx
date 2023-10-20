import { typeOfCluster } from '@utils/typeOfCluster';
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
  const clusterName = typeOfCluster(offerDiscount[0].id);
  const clusterText =
    clusterName === 'experto'
      ? 'Mundo Experto'
      : clusterName === 'colaborador'
      ? 'Dto. Colaborador'
      : 'Dto. 2da unidad';

  const porcentage = replaceCharacter(
    offerDiscount[0].percentageDiscount,
    '-',
    '',
  );

  return (
    <PricesContainer>
      <div className="cluster-container">
        <Price>{formattedCLP(offerPrice * quantity)}</Price>
        <WrapperClusterPrice cluster={clusterName as clusterValues}>
          <div className="cluster-percent">{porcentage}</div>
          <p className="text-promotion">{clusterText}</p>
        </WrapperClusterPrice>
      </div>
    </PricesContainer>
  );
};

export default ClusterPrice;
