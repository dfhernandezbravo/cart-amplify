import styled from 'styled-components';

export const Container = styled.div`
  background-color: #f7ccba;
  padding: 12px 16px;
  display: flex;
  align-items: center;

  & .text-container {
    margin-left: 16px;

    & .title {
      font-weight: 600;
      font-size: 14px;
    }
    & .description {
      font-size: 12px;
      font-weight: 400;
    }
  }
`;
