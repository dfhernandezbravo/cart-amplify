import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  padding: 12px 16px;
  border: 1px solid #485760;
  border-radius: 8px;
  margin: 16px 8px 0 16px;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  line-height: 18px;
  color: #485760;
  margin-bottom: 4px;
`;

export const PriceContainer = styled.div`
  color: #485760;
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
`;

export const IconContainer = styled.div`
  display: flex;
  align-items: center;

  img {
    max-width: 100%;
  }
`;

export const InfoContainer = styled.div`
  margin: 0 16px;
`;
