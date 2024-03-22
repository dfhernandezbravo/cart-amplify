import styled from 'styled-components';

interface Props {
  isLastItem: boolean;
}

export const Container = styled.div<Props>`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  border-bottom: ${({ isLastItem }) =>
    isLastItem ? 'none' : '1px solid #aaa;'};
  background-color: #fff;
`;

export const ProductInfoContainer = styled.div`
  display: flex;
  column-gap: 16px;
  /* @media (min-width: 1440px) {
    width: 50rem;
  }

  @media (min-width: 1024px) and (max-width: 1439px) {
    width: 30rem;
  } */

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
  align-items: center;
  width: 100%;
`;

export const QuantitySelectorAndDeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: flex-end;

  & .quantity-container {
    display: flex;
    /* margin-right: 106px; */
    flex-direction: row;
    gap: 10px;
    align-items: center;
  }
`;

export const ImageContainer = styled.div`
  margin-left: 1rem;
  position: relative;
`;

export const ProductUnavailableContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 16px 0;
  background-color: #fff;
`;

export const ButtonContainer = styled.div`
  /* width: 100%; */
  margin-right: 0.6rem;

  @media (min-width: 1024px) and (max-width: 1439px) {
    min-width: 15rem;
  }

  @media (min-width: 1440px) {
    min-width: 20rem;
  }
`;

export const PriceContainer = styled.div`
  margin-right: 0.6rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;

  @media (max-width: 1023px) {
    min-width: 12rem;
  }

  @media (min-width: 1024px) and (max-width: 1439px) {
    min-width: 15rem;
  }

  @media (min-width: 1440px) {
    min-width: 20rem;
  }
`;

export const BrandProductNameContainer = styled.div`
  & .product-name--container {
    max-width: 350px;
  }
`;

export const RibbonsLogisticContainer = styled.div`
  padding-bottom: 8px;
  & span {
    font-size: 11px;
  }
`;
