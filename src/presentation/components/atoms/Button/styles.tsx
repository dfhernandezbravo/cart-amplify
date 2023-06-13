import styled from "styled-components";

export const ButtonContainer = styled.button`
  display: flex;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e3e4e6;
  border-radius: 4px;
  cursor: pointer;
  font-family: inherit;

  &.linkBtn {
    background: none;
    border: none;
    color: #1a1a1a;
    font-size: 0.75rem;
    font-weight: 700;
    text-decoration: underline;
  }

  &.quantitySelectorBtn {
    width: 35px;
    height: 35px;
  }

  &.quantitySelectorBtn--minus {
    border-right: none;
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.quantitySelectorBtn--plus {
    border-left: none;
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &.buyBtn {
    background-color: #cc1515;
    color: #fff;
    font-size: 1rem;
    width: 100%;
    height: 40px;
    align-items: center;
    justify-content: center;

    &:hover {
      background-color: #990707;
      border-color: #990707;
    }
  }

  &.goToCartBtn {
    font-size: 14px;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &:disabled {
    background-color: #f2f2f2;
    color: #818180;
  }
`;
