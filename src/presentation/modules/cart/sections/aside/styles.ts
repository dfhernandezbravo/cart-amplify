import styled from "styled-components";

export const Container = styled.div`
  width: 100%;
  max-width: 411px;
`;




//Mobile
export const ContainerMobile = styled.div`
  height: max-content;
  background-color: #ffffff;
  border: 2px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;

  & .wrapper {
    width: 100%;
    z-index: 99999;
    background-color: #ffffff;


  }

  & .content {
    /* height: 0; */
    background-color: red;
   }
   & .content.open {
    height: 250px;
    z-index: 99;
   }

    & .shade  {
      background-color: rgba(28, 28, 28, 0.58);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }
`
