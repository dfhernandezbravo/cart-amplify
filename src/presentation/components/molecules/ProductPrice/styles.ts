import styled from "styled-components";

export const Container = styled.div`
  margin: 5px 0;
`;

export const OfferPriceContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

export const OfferPrice = styled.div`
  font-size: 20px;
  font-weight: 700;
`;

export const DiscountPercent = styled.div`
  border-radius: 4px;
  padding: 4px;
  background: #cc1515;
  color: #fff;
  font-size: 0.8rem;
  font-weight: 600;
`;

export const NormalPrice = styled.div`
  font-size: 13px;
  color: #4d4d4d;
  text-decoration: line-through;
  margin: 5px 0;
`;