import styled from "styled-components";



type DividerProps = {
  fullWidth?: boolean;
}

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  padding: 16px;

  h1 {
    font-size: 18px;
    color: #485760;
    font-weight: 600;
    line-height: 30px;
  }

  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    color: #6E8391;
    margin: 10px 0;

    span {
      font-size: 16px;
      font-weight: 700;
      color: #333333;
    }
  }

  .purchaseSummary {
    color: #333;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
  }
`;

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

export const Divider = styled.hr<DividerProps>`
  border: none;
  border-bottom: 1px solid #aaa;
  margin: 16px auto;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '85%')};
  &.light {
    border-color: #eaeaea;
  }
`;
