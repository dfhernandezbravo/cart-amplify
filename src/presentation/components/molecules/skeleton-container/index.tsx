import React from 'react';
import {
  SkeletonCartPageContainer,
  SkeletonProductsCard,
  SkeletonProductsSummary,
} from './styles';
import Skeleton from '@components/atoms/skeleton-easy';

const SkeletonCartPage = () => {
  return (
    <SkeletonCartPageContainer>
      <SkeletonProductsCard></SkeletonProductsCard>
      <SkeletonProductsSummary></SkeletonProductsSummary>
    </SkeletonCartPageContainer>
  );
};

export default SkeletonCartPage;
