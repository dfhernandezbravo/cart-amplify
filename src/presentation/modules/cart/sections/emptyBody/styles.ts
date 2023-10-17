import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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
