import styled, { css } from 'styled-components';

type CartAsideProp = {
    isOpen: boolean;
}

export const CartAsideContainer = styled.div<CartAsideProp>`
    position: fixed;
    top: 0;
    right: 0;
    min-width: 280px;
    width: 400px;
    height: 100%;
    background-color: white;
    box-shadow: -2px 0 4px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease-in-out;
    transform: ${props => props.isOpen ? 'translateX(0)' : 'translateX(100%)'};
`;

export const Title = styled.div`
    color: #1a1a1a;
    font-size: 1.5rem;
    line-height: 1.5rem;
    font-weight: 600;
    padding: 0 1rem 1rem 1.5rem;
    margin-top: 1rem;
    display: flex;
    justify-content: space-between;
    border-bottom: 5px solid #ccc;

    .count {
        font-size: 1rem;
        line-height: 1rem;
        letter-spacing: 0;
        color: #818180;
        padding-left: 1rem;
    }
    svg {
        cursor: pointer;
    }
`;

export const Body = styled.div`
    height: 100%;    
    max-height: 75%;
    overflow-y: auto;
    background-color: white;
`;

export const Footer = styled.div`
    background-color: #ccc;
    height: 100%;
    max-height: 25%;
`;