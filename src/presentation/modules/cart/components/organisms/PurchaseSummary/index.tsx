import Button from '@components/atoms/Button';
import TotalPriceCencosud from '@components/molecules/TotalPriceCencosud';
import TotalPrice from '@components/molecules/TotalPrice';
import PromotionalCode from '@modules/cart/components/molecules/PromotionalCode';
import { useAppSelector } from '@hooks/storeHooks';
import { Container, Divider } from './styles';
import PurchaseSummaryDisabled from '../PurchaseSummaryDisabled';
import CouponDiscounts from '../../molecules/CouponDiscounts';
import TotalCencopayPrice from '@components/molecules/TotalCencopayPrice';
import SubtotalPrice from '@components/molecules/SubtotalPrice';
import ProductWithoutStockModal from '../ProductWithoutStockModal';
import useHandleRedirectEvent from '@hooks/useHandleRedirectEvent';
import ServicePrice from '@components/molecules/ServicePrice';
import ShippingCostMessage from '../../molecules/ShippingCostMessage';
import Discounts from '@modules/cart/components/molecules/Discounts';

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
        <Discounts />
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
      <ShippingCostMessage />
      <ProductWithoutStockModal
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
        removeUnavailableItem={removeUnavailableItemsAndContinue}
      />
    </>
  );
};

export default PurchaseSummary;
