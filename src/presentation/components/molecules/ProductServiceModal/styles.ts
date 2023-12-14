import styled from 'styled-components';

export const Container = styled.div`
  padding: 8px 16px;
  color: #485760;

  ul {
    li {
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      margin-bottom: 16px;

      &:last-child {
        margin-bottom: 0;
      }
    }
  }
`;
