import styled from 'styled-components';

export const EmptyBodyContainer = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  position: relative;

  .minicart__error {
    width: 100%;
    top: 0;
    position: absolute;
  }
`;

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  max-width: 283px;
`;

export const Title = styled.p`
  font-size: 20px;
  font-weight: 600;
  line-height: 23px;
  color: #485760;
  margin: 8px 0;
`;

export const Description = styled.p`
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  color: #5c6e7a;
  margin: 0 48px 16px;
  text-align: center;
`;
