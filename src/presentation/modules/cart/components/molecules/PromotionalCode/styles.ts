import styled from 'styled-components';

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid rgb(170, 170, 170);
  border-radius: 6px;
  margin-bottom: 16px;
  padding: 12px 16px;

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
  font-family: inherit;
  width: 100%;
  cursor: pointer;

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
