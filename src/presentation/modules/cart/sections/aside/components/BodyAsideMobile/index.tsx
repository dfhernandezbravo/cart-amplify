import { Divider } from '@modules/cart/components/organisms/PurchaseSummary/styles';
import { StatePropValue } from '../HaderAsideMobile/HeaderAsideMobile.types';
import { formattedCLP } from '@utils/helpers';
import { useAppSelector } from '@hooks/storeHooks';

import { Container, DiscountsContainer } from './styles';
import useProductServices from '@hooks/useProductServices';
import Discounts from '@modules/cart/components/molecules/Discounts';

const BodyAsideMobile = ({ openDetails }: StatePropValue) => {
  const { cartBFF } = useAppSelector((state) => state.cart);
  const { totalServicePrice } = useProductServices();

  const servicePrice = totalServicePrice(cartBFF);
  const subtotal = cartBFF?.totals?.subtotal;
  const subtotalPrice = subtotal ? subtotal - servicePrice : 0;
  const discount = Math.abs(cartBFF?.totals?.discount ?? 0);

  return (
    <Container openDetails={openDetails}>
      <div className="content-wrapper">
        <div className="price-container">
          <p>Costo de tus productos</p>
          <span>{formattedCLP(subtotalPrice)}</span>
        </div>

        {servicePrice > 0 ? (
          <div className="price-container">
            <p>Servicio</p>
            <span>{formattedCLP(servicePrice)}</span>
          </div>
        ) : null}
        <Divider fullWidth={true} className="light" />

        {discount > 0 ? (
          <DiscountsContainer>
            <Discounts />
          </DiscountsContainer>
        ) : null}
      </div>
    </Container>
  );
};

export default BodyAsideMobile;
