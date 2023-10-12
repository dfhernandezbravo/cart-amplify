import styled from "styled-components";


export const CouponCodeWrapper = styled.div `
  font-family: 'Open Sans';

  display: flex;
  justify-content: space-between;
  & .couponCode {
    color: #147ab8;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
  }
`
export const  RemoveCoupon = styled.a  `
font-family: 'Open Sans';
font-size: 14px;
font-style: normal;
font-weight: 700;
text-decoration: underline;
display:block;
cursor: pointer;
margin-top: -10px;
`