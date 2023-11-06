import styled from 'styled-components';

export const Container = styled.div`
  margin-right: 8%;
  margin-bottom: 1rem;
  font-size: 14px;
  font-weight: 700;
  color: #a75314;
  display: flex;
  &:before {
    content: '';
    background-image: url('/icons/cart/warning-orange.svg');
    background-repeat: no-repeat;
    display: block;
    width: 25px;
    height: 25px;
    margin-right: 10px;
    margin-top: -5px;
  }
  @media only screen and (max-width: 48em) {
    margin-top: 1rem;
  }
`;
