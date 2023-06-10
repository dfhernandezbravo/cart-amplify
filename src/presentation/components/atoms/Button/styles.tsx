import styled from "styled-components";

export const ButtonContainer = styled.button`
  display: flex;
  padding: 10px;
  background-color: #fff;
  border: 1px solid #e3e4e6;
  border-radius: 4px;
  cursor: pointer;

  &.linkBtn {
    background: none;
    border: none;
    color: #1a1a1a;
    font-size: 0.75rem;
    font-weight: 700;
    text-decoration: underline;
  }
`;
