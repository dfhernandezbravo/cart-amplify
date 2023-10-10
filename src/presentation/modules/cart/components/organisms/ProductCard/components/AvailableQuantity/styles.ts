import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width:300px;
  font-size: 14px;
  font-weight: 700;
  color: #a75314;
  display: flex;
  &:before {
    content: "";
    background-image: url("/icons/cart/warning-orange.svg");
    background-repeat: no-repeat;
    display: block;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    margin-top: -5px;

  }
`;
