import styled from "styled-components";

export const Title = styled.div`
  color: #1a1a1a;
  font-size: 1.5rem;
  line-height: 1.5rem;
  font-weight: 600;
  padding: 0 1rem 1rem 1.5rem;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  border-bottom: 5px solid #f1f1f1;

  .count {
    font-size: 1rem;
    line-height: 1rem;
    letter-spacing: 0;
    color: #393939;
    padding-left: 1rem;
  }
  svg {
    cursor: pointer;
  }
`;
