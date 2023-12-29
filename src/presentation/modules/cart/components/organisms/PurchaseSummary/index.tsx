import Button from '@components/atoms/Button';
import TotalPriceCencosud from '@components/molecules/TotalPriceCencosud';
import TotalPrice from '@components/molecules/TotalPrice';
import PromotionalCode from '@modules/cart/components/molecules/PromotionalCode';
import { useAppSelector } from '@hooks/storeHooks';
import { Container, Divider } from './styles';
import PurchaseSummaryDisabled from '../PurchaseSummaryDisabled';
import Discounts from '../../molecules/Discounts';
import TotalCencopayPrice from '@components/molecules/TotalCencopayPrice';
import SubtotalPrice from '@components/molecules/SubtotalPrice';
import ShippinPrice from '@components/molecules/ShippingPrice';
import TotalPriceDiscount from '@components/molecules/TotalPriceDiscount';
import ProductWithoutStockModal from '../ProductWithoutStockModal';
import useHandleRedirectEvent from '@hooks/useHandleRedirectEvent';
import ServicePrice from '@components/molecules/ServicePrice';

const PurchaseSummary = () => {
  const {
    showModal,
    joinProductUnavailable,
    setShowModal,
    handleGoToCheckout,
    removeUnavailableItemsAndContinue,
  } = useHandleRedirectEvent();

  // hooks
  const { cartBFF } = useAppSelector((state) => state.cart);

  if (joinProductUnavailable.length === cartBFF?.items?.length) {
    return <PurchaseSummaryDisabled />;
  }
  return (
    <>
      <Container>
        <h1>Resumen de mi compra</h1>
        <Divider fullWidth={true} />
        <SubtotalPrice />
        <ShippinPrice />
        <ServicePrice />
        <Divider fullWidth={true} className="light" />
        <TotalPriceDiscount />
        <Discounts />
        <Divider fullWidth={true} className="light" />
        <TotalCencopayPrice />
        <TotalPriceCencosud className="purchaseSummary" />
        <TotalPrice className="purchaseSummary" />
        <Button
          className="cartBtn cartBtn--primary fullWidth"
          onClick={handleGoToCheckout}
        >
          Continuar tu compra
        </Button>
        <PromotionalCode />
      </Container>
      <ProductWithoutStockModal
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
        removeUnavailableItem={removeUnavailableItemsAndContinue}
      />
    </>
  );
};

export default PurchaseSummary;
