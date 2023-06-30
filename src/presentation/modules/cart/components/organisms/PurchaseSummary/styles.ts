import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid rgb(170, 170, 170);
  border-radius: 6px;
  padding: 16px;

  h1 {
    font-size: 15px;
  }

  p {
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 14px;
    margin: 10px 0;

    span {
      font-weight: 500;
    }
  }

  .purchaseSummary {
    color: #cc1414;
    font-size: 14px;
    font-weight: 600;
    padding-top: 10px;
  }
`;
