import styled from "styled-components";
import { StateCuponProps } from "../HaderAsideMobile/HeaderAsideMobile.types";


type DetailsProps = {
  openDetails: boolean
}

type CuponProps = {
  isCuponContainerOpen: boolean
}

export const Container = styled.div<DetailsProps>`
    max-height: ${({ openDetails }) => openDetails ? '500px' : '0'};
    height:  ${({ openDetails }) => openDetails && 'max-content'};
    overflow: hidden;
    border: 1px solid #000000;
    border-radius: 8px;
    margin: 1rem;
    transition: max-height 1s ease 0s;

    & .add-cupon--header {
      display: flex;
      justify-content: space-between;
      margin: .5rem 1rem ;

      & div:first-child {
        display:flex;
        gap: .5rem
      }

    }
`


export const InputCuponContainer = styled.div<CuponProps> `

  max-height: ${({ isCuponContainerOpen }) => isCuponContainerOpen ? '200px' : '0'};
  height:  ${({ isCuponContainerOpen }) => isCuponContainerOpen && 'max-content'};
  overflow: hidden;
  transition: max-height 1s ease 0s;

  & .add-cupon--input-container {
  text-align: center;
  margin-bottom: .5rem;

  & input {
    width: 90%;
    height: 50px;
    border-radius: 5px;
    font-size: 1rem;
    padding-left: 10px;
  }

  & input:focus-visible {
    outline: none;
  }
}

`