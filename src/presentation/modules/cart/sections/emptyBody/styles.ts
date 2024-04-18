import styled from 'styled-components';

export const Container = styled.div`
  height: 100dvh;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  padding: 0 1rem;
  margin: 5rem 0 3rem;
`;

export const TopContainer = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-bottom: 2.5rem;
  max-width: 283px;
`;

export const BottomContainer = styled.div`
  width: 100dvw;
  background-color: #e1e6ea;
  margin-top: auto;
  padding-bottom: 2rem;
  display: flex;
  justify-content: center;

  h2 {
    text-align: center;
    font-size: 18px;
    font-weight: 600;
    line-height: 24px;
  }
`;

export const Title = styled.p`
  font-size: 16px;
  font-weight: 600;
  line-height: 20px;
  color: #363f45;
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
