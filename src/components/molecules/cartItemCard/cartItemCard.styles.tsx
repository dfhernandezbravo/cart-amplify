import styled, { css } from 'styled-components';

export const CartItemCardContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(218, 210, 210);
  text-align: left;
  padding: 0 0.5rem;
  cursor: pointer;
  display: flex;
  margin-top: 1rem;

  img {
    max-width: 50%;
    max-height: 50%;
  }
`;

export const ImageContainer = styled.div`
  width: 30%;
`;

export const ProductInfoContainer = styled.div`
  width: 70%;
`;

export const Title = styled.div`
  font-size: 12px;
  color: #1a1a1a;
  margin-top: 5px;
  font-weight: 600;
`;

export const Description = styled.div`
  font-size: 16px;
  color: #4d4d4d;
  margin-top: 5px;
  font-weight: 400;
`;

export const Price = styled.div`
  font-size: 20px;
  font-weight: 700;
  margin: 5px 0;
`;

export const AddToCartContainer = styled.div`
  margin-top: 15px;
  width: 100%;
  align-items: center;
`;
