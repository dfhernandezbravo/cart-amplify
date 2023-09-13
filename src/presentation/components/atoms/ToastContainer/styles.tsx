import styled from 'styled-components';

export const Container = styled.div`
  .Toastify__toast-body {
    position: relative;
  }
  .Toastify__progress-bar {
    position: absolute;
    width: 100%;
    top: 0;
    background: #b01717;
  }
  & .Toastify__close-button {
    align-self: center;
  }
  & .Toastify__close-button:before {
    content: '';

    background-image: url('/icons/cart/close-icon.svg');
    background-repeat: no-repeat;
    fill: #ffffff;
    display: block;
    width: 25px;
    height: 25px;
  }
  .Toastify__close-button > svg {
    display: none;
  }
`;

export const MessageContainer = styled.div`
  & p:first-child {
    font-size: 14px;
  }
  & p:last-child {
    font-size: 12px;
  }
`;
