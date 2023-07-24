import styled from "styled-components";

type CartAsideProp = {
  isOpen: boolean;
};

export const Container = styled.div<CartAsideProp>`
  position: fixed;
  top: 0;
  right: 0;
  min-width: 280px;
  width: 90%;
  max-width: 400px;
  height: 100%;
  background-color: white;
  box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2);
  z-index: 11;
  transition: transform 0.3s ease-in-out;
  transform: ${(props) =>
    props.isOpen ? "translateX(0)" : "translateX(100%)"};
`;

export const Overlay = styled.div<CartAsideProp>`
  position: ${(props) => (props.isOpen ? "fixed" : "unset")};
  background-color: rgba(0, 0, 0, 0.5);
  width: 100%;
  height: 100%;
  top: 0;
  right: 0;
  z-index: 999;
`;