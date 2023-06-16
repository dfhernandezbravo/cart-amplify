import styled from "styled-components";

export const ProductCardContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(218, 210, 210);
  text-align: left;
  padding: 0 0.5rem 1rem;
  display: flex;
  gap: 10px;
  margin-top: 1rem;

  img {
    max-width: 80%;
    height: auto;
  }
`;

export const ProductInfoContainer = styled.div`
  width: 70%;
`;

export const ProductBrand = styled.div`
  font-size: 12px;
  color: #1a1a1a;
  margin-top: 5px;
  font-weight: 600;
`;

export const ProductName = styled.div`
  font-size: 14px;
  color: #4d4d4d;
  margin: 5px 0;
  font-weight: 400;
`;

export const ImageAndDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
