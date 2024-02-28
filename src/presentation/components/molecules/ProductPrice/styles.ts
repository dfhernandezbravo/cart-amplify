import styled from 'styled-components';

interface FullPriceProps {
  isFree?: boolean;
}

export const Container = styled.div`
  margin: 5px 0;
  /* width: 260px; */
`;

export const OfferPriceContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const FullPrice = styled.div<FullPriceProps>`
  font-size: 20px;
  font-weight: 700;
  color: ${({ isFree }) => (isFree ? '#1c8556' : '#363f45')};

  @media only screen and (max-width: 320px) {
    font-size: 18px;
  }
`;

export const NormalPrice = styled.div`
  font-size: 13px;
  color: #4d4d4d;
  text-decoration: line-through;
  margin: 5px 0;
`;
