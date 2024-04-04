import styled from 'styled-components';

export const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;

  & .close-icon {
    cursor: pointer;
  }
`;

export const QuantitySelectorContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 350px;
  & p {
    font-size: 18px;
    font-weight: 700;
  }
  & input {
    padding: 16px;
    margin: 1rem 0;
    border: 1px solid #aaaaaa;
    border-radius: 5px;
  }
  & input[type='number']::-webkit-inner-spin-button,
  input[type='number']::-webkit-outer-spin-button {
    -webkit-appearance: none;
    appearance: none;
  }
  & button {
    border: 1px solid #af1211;
    border-radius: 8px;
    background-color: #af1211;
    padding: 16px;
    font-size: 14px;
    font-weight: 700;
    color: #ffffff;
  }
  @media only screen and (max-width: 768px) {
    width: 100%;
  }
`;
