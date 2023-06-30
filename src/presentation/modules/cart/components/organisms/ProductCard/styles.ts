import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0 20px;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  background-color: #fff;
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;

  img {
    height: auto;
  }
`;

export const ImageAndQuantityContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const PriceAndDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  min-width: 135px;

  button {
    padding: 0;
  }
`;

export const TextAndQuantityContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 75px;

  span {
    font-size: 13px;
    color: #818180;
  }
`;
