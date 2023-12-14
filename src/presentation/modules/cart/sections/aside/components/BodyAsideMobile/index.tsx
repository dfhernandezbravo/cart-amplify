import { Divider } from '@modules/cart/components/organisms/PurchaseSummary/styles';
import { StatePropValue } from '../HaderAsideMobile/HeaderAsideMobile.types';
import { formattedCLP } from '@utils/helpers';
import { useAppSelector } from '@hooks/storeHooks';

import { Container } from './styles';
import Discounts from '@modules/cart/components/molecules/Discounts';
import useProductServices from '@hooks/useProductServices';

const BodyAsideMobile = ({ openDetails }: StatePropValue) => {
  const { cartBFF } = useAppSelector((state) => state.cart);
  const { totalServicePrice } = useProductServices();

  const servicePrice = totalServicePrice(cartBFF);
  const subtotal = cartBFF?.totals?.subtotal;
  const subtotalPrice = subtotal ? subtotal - servicePrice : 0;

  return (
    <Container openDetails={openDetails}>
      <div className="content-wrapper">
        <div className="price-container">
          <p>Subtotal</p>
          <span>{formattedCLP(subtotalPrice)}</span>
        </div>

        <div className="price-container">
          <p>Costo de envío desde</p>
          <span>{formattedCLP(cartBFF?.totals?.shippingPrice || 0)}</span>
        </div>

        {servicePrice > 0 ? (
          <div className="price-container">
            <p>Servicio</p>
            <span>{formattedCLP(servicePrice)}</span>
          </div>
        ) : null}

        <Divider fullWidth={true} />

        <div className="price-container cupon-container">
          <Discounts />
        </div>
        <div className="price-container">
          <p>Descuentos</p>
          <span>{formattedCLP(cartBFF?.totals?.discount || 0)}</span>
        </div>
        <Divider fullWidth={true} />
      </div>
    </Container>
  );
};

export default BodyAsideMobile;
