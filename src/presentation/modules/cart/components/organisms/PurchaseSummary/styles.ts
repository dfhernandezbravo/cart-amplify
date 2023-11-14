import styled from 'styled-components';

type DividerProps = {
  fullWidth?: boolean;
};

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
    color: #6e8391;
    margin: 10px 0;

    span {
      font-size: 16px;
      font-weight: 600;
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

export const Divider = styled.hr<DividerProps>`
  border: none;
  border-bottom: 1px solid #aaa;
  margin: 16px auto;
  width: ${({ fullWidth }) => (fullWidth ? '100%' : '85%')};
  &.light {
    border-color: #eaeaea;
  }
`;
