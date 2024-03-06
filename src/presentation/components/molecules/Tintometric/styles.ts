import styled from 'styled-components';

type Props = {
  color: string;
};

export const Container = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 13px 0;
`;

export const ColorContainer = styled.div`
  width: 28px;
  height: 28px;
  border: 1px solid #868686;
  padding: 2px;
`;

export const Color = styled.div<Props>`
  background-color: ${(props) => (props.color ? props.color : '#fff')};
  width: 22px;
  height: 22px;
`;
