import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;

  & .cencopay-total-container {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  & .value-price {
    color: #333333;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
  }
  @media only screen and (max-width: 1024px) {
    padding: 5px 12px;
    margin: 0;

    & .value-price {
      font-size: 15px;
      font-weight: 600;
    }
  }
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 500;
  color: #6e8391;
`;
