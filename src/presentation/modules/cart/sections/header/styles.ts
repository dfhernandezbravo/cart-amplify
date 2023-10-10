import styled from "styled-components";

export const Container = styled.div`
  background-color: #af1212;
  display: flex;
  align-items: center;
  padding: 12px 64px;
  width: 100%;
  .logo {
    height: 52px;
  }

  @media only screen and (max-width: 48em)  {
    padding: 12px 10px
  }
`;

export const Title = styled.div`
  color: #fff;
  font-size: 24px;
  font-weight: 700;
  line-height: 30px;
  margin-left: 16px;
`;
