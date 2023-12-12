import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 12px 16px;
  border: 1px solid #485760;
  border-radius: 8px;
  margin: 16px 16px 0;
`;

export const MainContainer = styled.div`
  display: flex;
  align-items: center;
`;

export const Title = styled.div`
  font-size: 16px;
  font-weight: 700;
  line-height: 20px;
  color: #485760;
  margin-bottom: 4px;

  @media (max-width: 767px) {
    font-size: 14px;
  }
`;

export const ModalLink = styled.button`
  font-size: 14px;
  font-weight: 600;
  line-height: 16px;
  color: #485760;
  text-decoration: underline;
  background-color: transparent;
  border: none;
  cursor: pointer;

  @media (max-width: 767px) {
    font-size: 12px;
  }
`;

export const PriceContainer = styled.div`
  width: 229px;

  @media (max-width: 767px) {
    width: 100px;
  }

  span {
    color: #485760;
    font-size: 20px;
    font-weight: 700;
    line-height: 23px;
  }
`;

export const IconContainer = styled.div`
  margin: 0 16px;
`;
