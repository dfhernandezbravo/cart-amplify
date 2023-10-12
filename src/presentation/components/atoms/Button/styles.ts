import styled from 'styled-components';

type Props = {
  isDisabled: boolean;
};

export const ButtonContainer = styled.button<Props>`
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

    &:hover {
      border-color: #cacbcc;
    }
  }

  &.quantitySelectorBtn--minus {
    border-top-right-radius: 0;
    border-bottom-right-radius: 0;
  }

  &.quantitySelectorBtn--plus {
    border-top-left-radius: 0;
    border-bottom-left-radius: 0;
  }

  &.buyBtn {
    background-color: #af1212;
    border: 1px solid #af1212;
    color: #fff;
    font-size: 1rem;
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
  }

  &:disabled {
    background-color: #f2f2f2;
    color: #818180;
    cursor: unset;

    &:hover {
      border-color: #e3e4e6;
    }
  }

  &.cartBtn {
    border-radius: 8px;
    font-size: 16px;
    font-weight: 700;
    justify-content: center;
    line-height: 20px;
    padding: 14px 24px;
    width: 280px;
    height: 48px;
    margin-bottom: 16px;
  }

  &.cartBtn--primary {
    background-color: #af1212;
    color: #f3f3f3;

    &:hover {
      background-color: #990707;
      border-color: #990707;
      cursor: pointer;
    }
  }

  &.cartBtn--secondary {
    background-color: transparent;
    color: #333333;
    border: 1px solid #333333;
  }

  &.fullWidth {
    width: 100%;
  }
`;
