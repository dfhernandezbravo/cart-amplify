import styled, { css } from "styled-components";

export const TextFieldContainer = styled.div`
  margin: 10px;

  &.quantityInput {
    margin: 0;
  }
`;

export const Input = styled.input`
  height: 2rem;
  width: 15rem;

  &.quantityInput {
    background-color: #fff;
    border: 1px solid #e3e4e6;
    border-right: none;
    border-left: none;
    height: 35px;
    width: 40px;
    text-align: center;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
`;
