import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid rgb(170, 170, 170);
  border-radius: 6px;
  margin-bottom: 16px;
  padding: 16px;

  .promotionalCodeError {
    display: flex;
    justify-content: center;
    font-size: 12px;
    color: #cc1414;
    margin-top: 10px;
  }

  .promotionalCode {
    display: flex;
    align-items: center;
    margin-top: 10px;

    svg {
      width: 24px;
      height: 24px;
    }
  }
`;

export const ButtonContainer = styled.button`
  background-color: #fff;
  border: none;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  font-family: inherit;
  font-weight: 600;
  width: 100%;

  svg {
    width: 24px;
    height: 24px;
  }
`;

export const FormContainer = styled.form`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;

  input {
    width: 50%;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 4px 6px;
  }

  button {
    width: 50%;
    background-color: #f2f2f2;
    color: #818180;
    font-weight: 600;
    font-size: 14px;
    border: none;
    border-radius: 8px;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
  }
`;
