import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  span {
    display: flex;
    align-items: center;
  }

  & .totalPrice {
    color: #363f45;
    font-weight: 600;
  }

  &.cartAside {
    span:first-child {
      font-size: 14px;
      font-weight: 400;
      color: #6e8391;
    }
  }

  @media only screen and (max-width: 320px) {
    &.cartAside {
      span:first-child {
        font-size: 12px;
      }
    }
  }
`;

export const Title = styled.span`
  font-size: 14px;
  color: #6e8391;
  font-weight: 400;
`;
