import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;

  span {
    display: flex;
    align-items: center;

    &.skeleton {
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
    }

    @keyframes loading {
      to {
        background-position:
          315px 0,
          0 0,
          0 190px,
          50px 195px;
      }
    }
  }

  &.cartAside {
    span {
      font-weight: 400;
      color: #485760;
    }

    .totalPrice {
      font-weight: 600;
    }
  }
`;

export const Title = styled.span`
  font-size: 14px;
  color: #6e8391;
  font-weight: 500;

  @media screen and (max-width: 767px) {
    max-width: 187px;
    font-size: 15px;
  }
`;
