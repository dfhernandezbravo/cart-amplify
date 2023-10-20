import styled from 'styled-components';

export const Container = styled.div`
  margin: 5px 0;
  width: 260px;
`;

export const OfferPriceContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const FullPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const NormalPrice = styled.div`
  font-size: 13px;
  color: #4d4d4d;
  text-decoration: line-through;
  margin: 5px 0;
`;
