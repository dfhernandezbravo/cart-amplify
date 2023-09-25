import styled from "styled-components";

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
  box-shadow: rgba(0,0,0,0.2) 0px -3px 3px;


  & .header {
    display: flex;
    justify-content: space-between;
    padding: 15px;

    & div:first-child {
      display: flex;
      padding-left: 15px;
      & p {
        margin-left: 15px;
        font-size: 16px;
        font-weight: 600
      }
    }

    & div:last-child {
      padding-right: 15px;
    }

    & .toggle-detail-btn {
    background-color: transparent;
    border: none;
    border-bottom: 1px solid #11699d;
    color: #11699d;
    font-size: 14px;
    font-weight: 600;
    }
  }

  & .wrapper {
    width: 100%;
    z-index: 99999;
    background-color: #ffffff;
    border-radius: 8px 8px 0px 0px;
    box-shadow: rgba(0, 0, 0, 0.2) 0px -3px 3px;


  }

  & .content {
    max-height: 0;
    overflow: hidden;
    transition: max-height 1s ease 0s;

     & .price-container {
      display: flex;
      padding: 5px 12px;
      justify-content: space-between;
     }
   }


   & .content.open {
    max-height: 500px;
    height: max-content;
    transition: max-height 1s ease 0s;
    z-index: 99;
   }

   & .button-container {
    display: flex;
    justify-content: center;
    & button {
      width: 90%;
    }
  }

    & .shade  {
      background-color: rgba(28, 28, 28, 0.58);
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }



  & .add-cupon--container {

    border: 1px solid #000000;
    border-radius: 8px;
    margin: 1rem;

    & .add-cupon--header {
      display: flex;
      justify-content: space-between;
      margin: .5rem 1rem ;

      & div:first-child {
        display:flex;
        gap: .5rem
      }

    }

  }

  & .add-cupon--input {

    max-height: 0;
    overflow: hidden;
    transition: max-height 1s ease 0s;


    & .add-cupon--input-container {
      text-align: center;
      margin-bottom: .5rem;

      & input {
        width: 90%;
        height: 50px;
        border-radius: 5px;
        font-size: 1rem;
        padding-left: 10px;
      }

      & input:focus-visible {
        outline: none;
      }
      
    }

  }
  & .add-cupon--input.open {
      max-height: 200px;
      height: max-content;
      transition: all 1s ease 0s;
    }


`
