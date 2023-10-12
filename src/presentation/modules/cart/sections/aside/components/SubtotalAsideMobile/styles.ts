import styled from 'styled-components';

export const SubtotalContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 5px 12px;
  & > div {
    display: flex;
  }
  & p {
    color: #6e8391;
    font-size: 15px;
  }

  & span {
    font-size: 15px;
    color: #000000;
    font-weight: 600;
  }
`;
