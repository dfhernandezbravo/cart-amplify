import styled from 'styled-components';

export const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  max-height: fit-content;
  overflow: hidden;
  transition: max-height 0.5s ease-out;

  &.showAll {
    max-height: none;
  }

  @media (max-width: 767px) {
    padding-left: 6px;
  }
`;

export const LinkButton = styled.button`
  background-color: transparent;
  border: none;
  color: #1479b8;
  font-size: 14px;
  font-weight: 700;
  padding: 8px;
  text-align: start;
  text-decoration: underline;
  width: 123px;

  @media (max-width: 767px) {
    margin: 0 auto;
  }
`;
