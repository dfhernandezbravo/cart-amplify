import styled from 'styled-components';

type Props = {
  color: string;
};

export const Container = styled.li`
  display: flex;
  align-items: center;
  margin: 6px 0;
  gap: 16px;
`;

export const ColorContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  border: 1px solid #6e8391;
  border-radius: 4px;
  padding: 4px 8px 4px 4px;
`;

export const Color = styled.div<Props>`
  background-color: ${(props) => (props.color ? props.color : '#fff')};
  width: 71px;
  height: 24px;
`;

export const ColorCode = styled.span`
  font-size: 13px;
  color: #485760;
`;
