import styled from "styled-components";



export const Container = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color:#ffffff;
    padding: 16px;
    border: 1px solid #bfbfbf;
    border-radius: 8px;

    & span {
        color: #485760;
        
    }
    & p {
        font-size: 16px;
        color: #485760;
        font-weight: 600;
        margin-bottom: .5rem;
    }

    & div {
        margin-top: 1.5rem;
        width:100%;
        text-align: center;

        & button {
            background:#eaeaea;
            border: 1px solid #bfbfbf;
            border-radius: 8px;
            color: #bfbfbf;
            font-size: 16px;
            padding: 14px 24px;
            font-weight: 700;
            width: 100%;
        }
    }
`

