import styled from 'styled-components';

export const Container = styled.div`
  width: 100%;
  max-width: 411px;
`;

//Mobile
export const ContainerMobile = styled.div`
  height: max-content;
  background-color: #ffffff;
  border: 1px solid #000000;
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  border-radius: 8px 8px 0px 0px;
  box-shadow: rgba(0, 0, 0, 0.2) 0px -3px 3px;
  z-index: 9999;

  .price-container {
    display: flex;
    padding: 5px;
    justify-content: space-between;
  }

  & .wrapper {
    width: 100%;
    z-index: 99999;
    background-color: #ffffff;
    border-radius: 8px 8px 0px 0px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px -3px 3px;
  }

  & .button-container {
    display: flex;
    justify-content: center;
    & button {
      width: 90%;
    }
  }
`;

export const EmptyAsideContainer = styled.div`
  position: fixed;
  width: 100%;
  bottom: 0;
`;
