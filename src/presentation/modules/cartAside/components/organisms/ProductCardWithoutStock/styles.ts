import styled from "styled-components";


export const WrapperContainer = styled.div `
    background-color: #e1e6ea;
    padding: 1rem 1rem .5rem 1rem;
`

export const Container = styled.div `
    display: flex;
    margin-bottom: 1rem;
    align-items: center;
    & > div {
        margin-right: 1rem;
    }
    & > div img {
      max-width: 80%;
      height: auto;
    }
    & div:nth-child(2) button {
        padding: 0;
    }
`

export const OutOfStockMessageContainer = styled.div `
    position: relative;
    display: flex;
    padding: 8px 16px;
    background-color: #f8bcba;
    border-radius: 8px;
    margin-bottom: 1rem;
    font-size: 14px;
    &:before {
        content:'';
        background-image: url(/icons/cart/exclamation-mark.svg);
        display: block;
        width: 20px;
        height: 20px;
        margin-right: 0.5rem;
        background-repeat: no-repeat;
    }
`


