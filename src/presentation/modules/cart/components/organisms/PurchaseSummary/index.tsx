import { useRouter } from 'next/router';
import { useState, useMemo } from 'react';
import Button from '@components/atoms/Button';
import TotalPriceCencosud from '@components/molecules/TotalPriceCencosud';
import TotalPrice from '@components/molecules/TotalPrice';
import PromotionalCode from '@modules/cart/components/molecules/PromotionalCode';
import { useAppSelector, useAppDispatch } from '@hooks/storeHooks';
import deleteItem from '@use-cases/cart/delete-item';
import { getUnavailableProduct } from '@utils/getUnavailabilityProduct';
import { Container, Divider, ModalContainer } from './styles';
import PurchaseSummaryDisabled from '../PurchaseSummaryDisabled';
import Modal from '@components/atoms/Modal';
import Discounts from '../../molecules/Discounts';
import TotalCencopayPrice from '@components/molecules/TotalCencopayPrice';
import SubtotalPrice from '@components/molecules/SubtotalPrice';
import ShippinPrice from '@components/molecules/ShippingPrice';
import TotalPriceDiscount from '@components/molecules/TotalPriceDiscount';

const PurchaseSummary = () => {
  const host =
    location.host === 'checkout.easy.cl'
      ? 'https://checkout.easy.cl'
      : 'https://checkout.qa.easy.cl';
  const [showModal, setShowModal] = useState(false);

  // hooks
  const { cartBFF, cartId } = useAppSelector((state) => state.cart);
  const router = useRouter();

  const dispatch = useAppDispatch();

  const itemWithoutStock = useMemo(() => {
    return cartBFF?.items?.length ? getUnavailableProduct(cartBFF) : [];
  }, [cartBFF]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const goToCheckout = () => router.push(`${host}/${cartId}`);

  const removeUnavailableItemsAndContinue = () => {
    itemWithoutStock.forEach((item) => {
      dispatch(
        deleteItem({
          cartId: cartBFF?.id ?? '',
          itemIndex: item.index as number,
        }),
      );
    });
    setShowModal(false);
    goToCheckout();
  };

  // methods
  const methods = {
    handleGoToCheckout: () => {
      if (itemWithoutStock?.length) {
        setShowModal(true);
        return;
      }
      goToCheckout();
    },
  };

  if (itemWithoutStock?.length === cartBFF?.items?.length) {
    return <PurchaseSummaryDisabled />;
  }
  return (
    <>
      <Container>
        <h1>Resumen de mi compra</h1>
        <Divider fullWidth={true} />
        <SubtotalPrice />
        <ShippinPrice />
        <Divider fullWidth={true} className="light" />
        <TotalPriceDiscount />
        <Discounts />
        <Divider fullWidth={true} className="light" />
        <TotalCencopayPrice />
        <TotalPriceCencosud className="purchaseSummary" />
        <TotalPrice className="purchaseSummary" />
        {/* <BuyButton text="Ir a comprar" /> */}
        <Button
          className="cartBtn cartBtn--primary fullWidth"
          onClick={methods.handleGoToCheckout}
        >
          Continuar tu compra
        </Button>
        <PromotionalCode />
      </Container>
      <Modal isOpen={showModal} onClose={() => handleCloseModal()}>
        <ModalContainer>
          <p>Title</p>
          <Divider fullWidth />
          <p>
            Algunos productos no están disponibles en tu ubicación. Al continuar
            se eliminará este producto del carro.
          </p>
          <Divider fullWidth />
          <div className="button-container">
            <button onClick={() => handleCloseModal()}>Volver</button>
            <button onClick={() => removeUnavailableItemsAndContinue()}>
              Continuar mi compra{' '}
            </button>
          </div>
        </ModalContainer>
      </Modal>
    </>
  );
};

export default PurchaseSummary;
