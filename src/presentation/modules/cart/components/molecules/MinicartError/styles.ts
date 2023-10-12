import styled from 'styled-components';

export const MainContainer = styled.div`
  padding: 16px;
`;

export const ErrorContainer = styled.div`
  background-color: #c54b16;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;

  svg path {
    stroke: #fff;
  }
`;

export const IconAndTextContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;
`;

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Title = styled.div`
  font-size: 14px;
  font-weight: 500;
  line-height: 20px;
`;

export const Content = styled.div`
  font-size: 12px;
  font-weight: 400;
  line-height: 16px;
`;
