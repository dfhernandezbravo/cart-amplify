import styled from 'styled-components';

export const CouponContainer = styled.div`
  display: flex;
  justify-content: space-between;

  @media screen and (max-width: 1024px) {
    padding: 0 4px;
  }
`;

export const CouponNameContainer = styled.div`
  display: flex;
  background-color: #e1e6ea;
  gap: 8px;
  padding: 4px;
  border-radius: 4px;
`;

export const RemoveButton = styled.button`
  border: none;
  background-color: transparent;
  cursor: pointer;
  display: flex;
  align-items: center;
`;

export const CouponName = styled.span`
  color: #485760;
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
`;

export const CouponPrice = styled.span`
  color: #363f45;
  font-weight: 400;
`;
