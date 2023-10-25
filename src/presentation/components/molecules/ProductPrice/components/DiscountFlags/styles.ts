import styled from 'styled-components';

export type clusterValues = 'EXPERTO' | 'EXPERTO_PREFERENTE' | 'COLABORADOR';

type ClusterProps = {
  cluster: clusterValues;
};

export const PricesContainer = styled.div`
  flex-direction: column;
  & .cluster-container {
    display: flex;
    gap: 5px;
  }
`;

export const PriceContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const Price = styled.p`
  font-size: 20px;
  font-weight: 700;
`;
export const DiscountPercent = styled.div`
  border-radius: 4px;
  padding: 4px;
  background: #cc1515;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
  width: 35px;
  text-align: center;
`;

export const WrapperClusterPrice = styled.div<ClusterProps>`
  display: flex;
  align-items: center;
  border: 1px solid
    ${({ cluster }) =>
      cluster === 'EXPERTO' || cluster === 'EXPERTO_PREFERENTE'
        ? '#363f45'
        : cluster === 'COLABORADOR'
        ? '#df6f1a'
        : '#178ad1'};
  border-radius: 8px;
  padding-right: 5px;
  gap: 5px;

  & .cluster-percent {
    border-top-left-radius: 6px;
    border-bottom-left-radius: 6px;
    padding: 4px;
    background: ${({ cluster }) =>
      cluster === 'EXPERTO' || cluster === 'EXPERTO_PREFERENTE'
        ? '#363f45'
        : cluster === 'COLABORADOR'
        ? '#df6f1a'
        : '#178ad1'};
    color: #fff;
    font-size: 0.8rem;
    font-weight: 600;
    width: 40px;
    text-align: center;
  }

  & .text-promotion {
    font-size: 14px;
    font-weight: 600;
    color: ${({ cluster }) =>
      cluster === 'EXPERTO' || cluster === 'EXPERTO_PREFERENTE'
        ? '#363f45'
        : cluster === 'COLABORADOR'
        ? '#df6f1a'
        : '#178ad1'};
  }
`;
