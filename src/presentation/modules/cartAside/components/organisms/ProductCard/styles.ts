import styled from 'styled-components';

export const ProductCardContainer = styled.div`
  width: 100%;
  border-bottom: 1px solid rgb(218, 210, 210);
  text-align: left;
  padding: 0 0.5rem 1rem;
  display: flex;
  gap: 10px;
  margin-top: 1rem;
  flex-direction: column;

  img {
    max-width: 80%;
    height: auto;
  }
`;

export const ProductInfoContainer = styled.div`
  width: 70%;
`;

export const ImageAndDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const MainContainer = styled.div`
  display: flex;
`;
