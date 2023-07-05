import styled from "styled-components";

export const Container = styled.div`
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
`;
