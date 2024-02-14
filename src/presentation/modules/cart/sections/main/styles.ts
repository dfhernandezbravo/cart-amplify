import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  border-radius: 8px;
  box-shadow: 0px 4px 12px 0px rgba(37, 39, 39, 0.12);
  width: 100%;
  margin-bottom: 4rem;

  & .items-container {
    position: relative;
  }
`;

export const TotalProductsContainer = styled.div`
  border-bottom: 1px solid #aaa;
  display: flex;
  align-items: bottom;
  color: #333333;
  font-size: 24px;
  font-weight: 600;
  line-height: 30px;
  padding: 16px;

  span {
    font-size: 18px;
    font-weight: 400;
    margin-left: 8px;
  }
`;

export const Loader = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0, 0, 0, 0.1);

  @media screen and (max-width: 1023px) {
    position: fixed;
  }

  &:before {
    content: '';
    display: block;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    border: 3px solid #e95e53;
    border-top-color: transparent;
    animation: spin 1.2s linear infinite;
    @keyframes spin {
      to {
        transform: rotate(360deg);
      }
    }
  }
`;

//Mobile
export const ContainerMobile = styled.div`
  margin-bottom: 20rem;
`;
