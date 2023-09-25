import styled from "styled-components";
import { StatePropValue } from "../HaderAsideMobile/HeaderAsideMobile.types";


export const Container = styled.div<StatePropValue>`
    max-height: ${({openDetails}) => openDetails ? '500px' : '0'};
    height: ${({openDetails}) => openDetails && 'max-content'};
    overflow: hidden;
    transition: max-height 1s ease 0s;
`