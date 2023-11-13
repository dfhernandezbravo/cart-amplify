import styled from 'styled-components';

export const ModalContainer = styled.div`
  width: 500px;

  & .button-container {
    display: flex;
    justify-content: space-between;

    & button {
      border-radius: 8px;
      padding: 16px;
      width: 180px;
      font-size: 14px;
      font-weight: 700;
      cursor: pointer;
      width: 49%;
    }
  }

  & .button-container button:first-child {
    background: #ffffff;
    color: #333333;
    border: 2px solid #333333;
  }

  & .button-container button:last-child {
    background-color: #af1212;
    border: 2px solid #af1212;
    color: #ffffff;
  }
`;
