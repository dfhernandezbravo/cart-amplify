import styled from 'styled-components';
import { StatePropValue } from '../HaderAsideMobile/HeaderAsideMobile.types';

export const Container = styled.div<StatePropValue>`
  max-height: ${({ openDetails }) => (openDetails ? '500px' : '0')};
  height: ${({ openDetails }) => openDetails && 'max-content'};
  overflow: hidden;
  transition: max-height 1s ease 0s;

  & .content-wrapper {
    padding: 0 10px;
  }

  & .price-container {
    padding: 0 5px;
  }
  & .price-container p {
    color: #363f45;
    font-size: 14px;
    font-weight: 400;
  }
  & .price-container span {
    color: #363f45;
    font-size: 16px;
    font-weight: 600;
  }

  & .cupon-container {
    flex-direction: column;
    & a {
      margin-top: 0;
    }
  }
`;

export const DiscountsContainer = styled.div`
  display: flex;
  flex-direction: column;

  span {
    flex-direction: row;
    justify-content: space-between;
  }

  p {
    display: flex;
    justify-content: space-between;
    padding: 0 5px;
    color: #6e8391;
    font-size: 15px;
    margin: 3px 0;
  }
`;
