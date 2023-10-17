import React from 'react';
import { Container } from './styles';

const PurchaseSummaryDisabled = () => {
  return (
    <Container>
      <p>Sin stock disponible</p>
      <span>El artículo seleccionado se encuentra agotado.</span>
      <div>
        <button>Contiuar tu compra</button>
      </div>
    </Container>
  );
};

export default PurchaseSummaryDisabled;
