import React from 'react';
import { Container, Content } from './styles';

type Props = {
  quantity: number;
};

const AvailableQuantity = ({ quantity }: Props) => {
  return (
    <Content>
      <svg
        width="20"
        height="20"
        viewBox="0 0 28 28"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M15.0104 3.50003L26.124 22.75C26.2264 22.9274 26.2803 23.1286 26.2803 23.3334C26.2803 23.5381 26.2264 23.7393 26.124 23.9167C26.0216 24.094 25.8744 24.2413 25.697 24.3437C25.5197 24.4461 25.3185 24.5 25.1137 24.5H2.88636C2.68157 24.5 2.48039 24.4461 2.30304 24.3437C2.12569 24.2413 1.97842 24.094 1.87602 23.9167C1.77363 23.7393 1.71973 23.5381 1.71973 23.3334C1.71973 23.1286 1.77364 22.9274 1.87603 22.75L12.9897 3.50003C13.0921 3.32269 13.2394 3.17542 13.4167 3.07304C13.5941 2.97065 13.7952 2.91675 14 2.91675C14.2048 2.91675 14.406 2.97065 14.5833 3.07304C14.7607 3.17542 14.908 3.32269 15.0104 3.50003ZM4.90703 22.1667H23.093L14 6.4167L4.90703 22.1667ZM12.8334 18.6667H15.1667V21H12.8334V18.6667ZM12.8334 10.5H15.1667V16.3334H12.8334V10.5Z"
          fill="#A75314"
        />
      </svg>
      <Container>Existen {quantity} disponibles</Container>
    </Content>
  );
};

export default AvailableQuantity;
