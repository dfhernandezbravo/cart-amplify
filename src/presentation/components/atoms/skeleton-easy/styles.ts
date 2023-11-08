import styled, { keyframes } from 'styled-components';

const skeletonAnimation = keyframes`
  0% {
    opacity: 0.6;
  }
  100% {
    opacity: 1;
  }
`;
export const SkeletonContainer = styled.div`
  position: relative;
  background: #aaacae;
  width: 100%;
  height: 350px;
`;

export const Skeleton = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #f0f0f0;
  animation: ${skeletonAnimation} 1s infinite alternate;
`;
