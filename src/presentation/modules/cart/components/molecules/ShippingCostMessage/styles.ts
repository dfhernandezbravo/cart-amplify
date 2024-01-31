import styled from 'styled-components';

type ContentStruct = {
  isMobile: boolean;
};

export const Container = styled.div<ContentStruct>`
  margin-top: ${(props) => (props.isMobile ? '0' : '16px')};
  background-color: #fff;
  border: ${(props) => (props.isMobile ? 'none' : '1px solid #bfbfbf')};
  border-radius: 8px;
  padding: 16px;
  display: flex;
  align-items: center;
  color: #363f45;
  font-size: 14px;
  font-weight: 600;
  img {
    margin-right: 8px;
  }
`;

export const Text = styled.div<ContentStruct>`
  display: flex;
  width: 100%;
  justify-content: ${(props) => (props.isMobile ? 'center' : 'start')};
`;
