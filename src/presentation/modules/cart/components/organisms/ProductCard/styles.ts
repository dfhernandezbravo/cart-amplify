import styled from 'styled-components';

export const Container = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 0 16px;
  padding: 16px 0;
  border-bottom: 1px solid #aaa;
  background-color: #fff;
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  column-gap: 16px;

  & p {
    color: #485760;
    font-weight: 600;
  }

  img {
    height: auto;
  }
`;

export const ProductInfoAndPriceContainer = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
`;

export const QuantitySelectorAndDeleteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  margin-right: 106px;
`;

export const ImageContainer = styled.div`
  position: relative;
`;

export const QuantitySelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  & p {
    font-size: 18px;
    font-weight: 700;
  }
  & input {
    padding: 16px;
    margin: 1rem 0;
    border: 1px solid #aaaaaa;
    border-radius: 5px;
  }
  & input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }
  & button {
    border: 1px solid #333333;
    border-radius: 8px;
    background-color: #333333;
    padding: 16px;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
  }
`;
