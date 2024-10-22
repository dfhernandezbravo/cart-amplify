import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;
  color: #363f45;

  & .cencopay-total-container {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  & .value-price {
    font-size: 16px;
    font-weight: 600;
    line-height: 20px;
  }

  @media only screen and (max-width: 320px) {
    &.cartAside .title {
      font-size: 12px;
    }
  }
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #363f45;
`;
