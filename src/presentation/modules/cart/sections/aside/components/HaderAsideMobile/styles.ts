import styled from "styled-components"


export const Container = styled.div` 
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
`