import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 7px;

  & .title-container {
    display: flex;
    gap: 5px;
  }

  span {
    display: flex;
    align-items: center;
  }

  & .totalPrice {
    color: #363f45;
    font-weight: 600;
  }

  & .cartAside {
    span:first-child {
      font-size: 14px;
      font-weight: 400;
      color: #363f45;
    }

    .totalPrice {
      img {
        margin-right: 5px;
      }
    }
  }

  @media only screen and (max-width: 320px) {
    &.cartAside span:first-child {
      font-size: 12px;
    }
  }
`;

export const Skeleton = styled.span`
  font:
    normal normal 600 0px/24px Roboto,
    serif;
  cursor: progress;
  background: linear-gradient(0.25turn, transparent, #fff, transparent),
    linear-gradient(#eee, #eee),
    radial-gradient(38px circle at 19px 19px, #eee 50%, transparent 51%),
    linear-gradient(#eee, #eee);
  background-repeat: no-repeat;
  background-size:
    315px 250px,
    315px 180px,
    100px 100px,
    225px 30px;
  background-position:
    -315px 0,
    0 0,
    0px 190px,
    50px 195px;
  animation: loading 1.5s infinite;
  width: 100px;
  height: 24px;

  @keyframes loading {
    to {
      background-position:
        315px 0,
        0 0,
        0 190px,
        50px 195px;
    }
  }
`;

export const Title = styled.span`
  font-size: 14px;
  font-weight: 400;
  color: #363f45;

  /* @media screen and (max-width: 767px) {
    max-width: 209px;
    font-size: 15px;
  } */
`;
