import styled from "styled-components";

export const Container = styled.div`
    
    .Toastify__toast-body {
        position: relative;
    }
    .Toastify__progress-bar {
        position: absolute;
        width: 100%;
        top: 0;
        background: #B01717;
    }
    
`


export const MessageContainer = styled.div `
    & p:first-child {
        font-size: 15px
    }
    & p:last-child {
        font-size: 12px;
    }
`
