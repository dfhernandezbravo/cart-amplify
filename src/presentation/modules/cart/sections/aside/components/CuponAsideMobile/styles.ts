import styled from 'styled-components';
import { StateCuponProps } from '../HaderAsideMobile/HeaderAsideMobile.types';

type DetailsProps = {
  openDetails: boolean;
};

type CuponProps = {
  isCuponContainerOpen: boolean;
};

type InputProps = DetailsProps & CuponProps;

export const Container = styled.div<DetailsProps>`
  max-height: ${({ openDetails }) => (openDetails ? '500px' : '0')};
  height: ${({ openDetails }) => openDetails && 'max-content'};
  overflow: hidden;
  border: ${({ openDetails }) => (openDetails ? '1px solid #000000' : 'none')};
  border-radius: 8px;
  margin: 1rem 0;
  transition: max-height 1s ease 0s;
  background-color: #fff;
  border: 1px solid rgb(170, 170, 170);

  & .add-cupon--header {
    display: flex;
    justify-content: space-between;
    margin: 0.5rem 1rem;

    & div:first-child {
      display: flex;
      gap: 0.5rem;
    }
  }
`;

export const InputCuponContainer = styled.div<CuponProps>`
  max-height: ${({ isCuponContainerOpen }) =>
    isCuponContainerOpen ? '200px' : '0'};
  height: ${({ isCuponContainerOpen }) =>
    isCuponContainerOpen && 'max-content'};
  overflow: hidden;
  transition: max-height 1s ease 0s;

  & .add-cupon--input-container {
    text-align: center;
    margin-bottom: 0.5rem;

    & input {
      width: 90%;
      height: 50px;
      border: 1px solid #000000;
      border-radius: 5px;
      font-size: 1rem;
      padding-left: 10px;
    }

    & input:focus-visible {
      outline: none;
    }
  }
  & .button-container {
    margin-bottom: 12px;
  }
`;

export const IconAndTextContainer = styled.div`
  display: flex;
  align-items: center;
  column-gap: 8px;

  span {
    color: #333;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
  }
`;
