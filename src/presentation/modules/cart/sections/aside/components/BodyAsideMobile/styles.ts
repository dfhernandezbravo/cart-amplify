import styled from 'styled-components';
import { StatePropValue } from '../HaderAsideMobile/HeaderAsideMobile.types';

export const Container = styled.div<StatePropValue>`
  max-height: ${({ openDetails }) => (openDetails ? '500px' : '0')};
  height: ${({ openDetails }) => openDetails && 'max-content'};
  overflow: hidden;
  transition: max-height 1s ease 0s;

  & .price-container p {
    color: #6e8391;
    font-size: 15px;
  }
  & .price-container span {
    color: #333333;
    font-size: 15px;
    font-weight: 600;
  }

  & .cupon-container {
    flex-direction: column;
    & a {
      margin-top: 0;
    }
  }
`;
