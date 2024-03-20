import styled from 'styled-components';

type Props = {
  color: string;
};

export const MainContainer = styled.ul`
  display: flex;
  flex-direction: column;
  max-height: fit-content;
  overflow: hidden;
  transition: max-height 0.5s ease-out;

  &.showAll {
    max-height: none;
  }
`;
