import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  background-color: #ffffff;
  padding: 10px;
  min-height: 100px;
  margin-top: 0.5rem;

  & .image-container {
    display: flex;
    align-items: center;
  }

  & .main-container {
    display: flex;
    align-items: center;
  }
`;
