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
    color: #000000de;
    font-weight: 600;
  }

  &.cartAside {
    span:first-child {
      font-size: 14px;
      font-weight: 600;
      color: #6e8391;
    }
  }
`;

export const Title = styled.span`
  font-size: 14px;
  color: #6e8391;
  font-weight: 400;
`;
