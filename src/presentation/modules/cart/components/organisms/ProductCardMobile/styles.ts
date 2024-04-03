import styled from 'styled-components';

interface Props {
  isLastItem: boolean;
}

export const Container = styled.div<Props>`
  display: flex;
  background-color: #ffffff;
  padding: 10px;
  min-height: 200px;
  border-bottom: ${({ isLastItem }) =>
    isLastItem ? 'none' : '1px solid #cdcdcd'};
  flex-direction: column;
`;

export const ImageContainer = styled.div``;

export const QuantitySelectorAndDeleteContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

export const MainContainer = styled.div`
  display: flex;
`;
export const RibbonsLogisticContainer = styled.div`
  padding-bottom: 8px;
  & span {
    font-size: 11px;
  }
`;
