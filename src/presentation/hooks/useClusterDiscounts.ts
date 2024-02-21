import { Adjustment } from '@entities/cart/cart.entity';
import { PromotionType } from '@entities/cart/promotions';

type Props = {
  clusters: Adjustment[];
};

const EXPERTO_CLUSTER_NAME = 'Mundo experto';
const COLABORADOR_CLUSTER_NAME = 'Mundo colaborador';

const useClusterDiscounts = () => {
  const expertoDiscount = ({ clusters }: Props) => {
    const expertoCluster = clusters.filter(
      (cluster) =>
        cluster.id === PromotionType.EXPERTO ||
        cluster.id === PromotionType.EXPERTO_PREFERENTE,
    );

    if (expertoCluster.length === 0)
      return { total: 0, name: EXPERTO_CLUSTER_NAME };

    const total = expertoCluster.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);

    return { total: Math.abs(total), name: EXPERTO_CLUSTER_NAME };
  };

  const colaboradorDiscount = ({ clusters }: Props) => {
    const colaboradorCluster = clusters.filter(
      (cluster) => cluster.id === PromotionType.COLABORADOR,
    );

    if (colaboradorCluster.length === 0)
      return { total: 0, name: COLABORADOR_CLUSTER_NAME };

    const total = colaboradorCluster.reduce((acc, cur) => {
      return acc + cur.value;
    }, 0);

    return { total: Math.abs(total), name: COLABORADOR_CLUSTER_NAME };
  };

  return { expertoDiscount, colaboradorDiscount };
};

export default useClusterDiscounts;
