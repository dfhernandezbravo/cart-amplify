import styled, { keyframes } from 'styled-components';

const skeletonAnimation = keyframes`
  0% {
    opacity: 0.5;
  }
  100% {
    opacity: 1;
  }
`;

export const SkeletonCartPageContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 16px;
  width: 100%;
  height: 100vh;
  padding: 100px;
`;

export const SkeletonProductsCard = styled.div`
  display: flex;
  gap: 16px;
  flex: 1;
  background-color: aliceblue;
  border-radius: 8px;
  background-color: #f0f0f0;
  animation: ${skeletonAnimation} 1s infinite alternate;
`;

export const SkeletonProductsSummary = styled.div`
  height: 162px;
  width: 500px;
  border-radius: 8px;
  background-color: #f0f0f0;
  animation: ${skeletonAnimation} 1s infinite alternate;
`;
