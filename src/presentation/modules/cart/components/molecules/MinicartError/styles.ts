import { ErrorType, StatusError } from '@entities/error/error.entity';
import styled from 'styled-components';

type ErrorProps = {
  errorType: ErrorType;
  status: StatusError;
};

export const MainContainer = styled.div`
  padding: 16px;
`;

export const ErrorContainer = styled.div<ErrorProps>`
  background-color: ${(props) =>
    props.errorType === 'payload' && props.status === 'error'
      ? '#79110d'
      : '#c54b16'};
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
  width: 90%;
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
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  display: flex;
  cursor: pointer;
`;
