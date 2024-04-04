import styled from 'styled-components';

export const Container = styled.div`

  width: 100%;
  margin-bottom: 1rem;

  font-size: 14px;
  font-weight: 700;
  color: #a75314;
  display: flex;
  @media only screen and (max-width: 48em) {
  }
`;

export const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 13%;
  margin-bottom: 10px;
  @media only screen and (max-width: 48em) {
    width: fit-content;
    margin-bottom: 10px;
  }
`;
