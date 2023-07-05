import styled from "styled-components";

export const Container = styled.div`
  background-color: #fff;
  border: 1px solid #bfbfbf;
  border-radius: 8px;
  padding: 16px;

  h1 {
    font-size: 24px;
    font-weight: 700;
    line-height: 30px;
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
    color: #333;
    font-size: 16px;
    font-weight: 700;
    line-height: 20px;
  }
`;

export const Divider = styled.hr`
  border: none;
  border-bottom: 1px solid #aaa;
  margin: 16px auto;
  width: 85%;

  &.light {
    border-color: #eaeaea;
  }
`;
