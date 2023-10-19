import { useState, useMemo } from 'react';
import Button from '@components/atoms/Button';
import TotalPriceCencosud from '@components/molecules/TotalPriceCencosud';
import TotalPrice from '@components/molecules/TotalPrice';
import PromotionalCode from '@modules/cart/components/molecules/PromotionalCode';
import { useAppSelector, useAppDispatch } from '@hooks/storeHooks';
import deleteItem from '@use-cases/cart/delete-item';
import { formattedCLP, getUnavailableProduct } from '@utils/helpers';
import { Container, Divider, ModalContainer } from './styles';
import PurchaseSummaryDisabled from '../PurchaseSummaryDisabled';
import Modal from '@components/atoms/Modal';
import Discounts from '../../molecules/Discounts';
import { Skeleton } from '@components/molecules/TotalPriceCencosud/styles';
const PurchaseSummary = () => {
  const [showModal, setShowModal] = useState(false);

  // hooks
  const { cartBFF, loading } = useAppSelector((state) => state.cart);

  const dispatch = useAppDispatch();

  const itemWithoutStock = useMemo(() => {
    return cartBFF?.items?.length ? getUnavailableProduct(cartBFF) : [];
  }, [cartBFF]);

  const handleCloseModal = () => {
    setShowModal(false);
  };

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
    console.log('go to checkout.');
  };

  // methods
  const methods = {
    handleGoToCheckout: () => {
      if (itemWithoutStock?.length) {
        setShowModal(true);
        return;
      }
      console.log('Go to checkuot.');
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
        <p>
          Subtotal
          {loading ? (
            <Skeleton />
          ) : (
            <span>{formattedCLP(cartBFF?.totals?.subtotal ?? 0)}</span>
          )}
        </p>
        <p>
          Costo de envío desde{' '}
          {loading ? (
            <Skeleton />
          ) : (
            <span>{formattedCLP(cartBFF?.totals?.shippingPrice ?? 0)}</span>
          )}
        </p>
        <Divider fullWidth={true} className="light" />
        <p>
          Descuentos:{' '}
          {loading ? (
            <Skeleton />
          ) : (
            <span>
              -{formattedCLP(Math.abs(cartBFF?.totals?.discount ?? 0))}
            </span>
          )}
        </p>
        <Discounts />
        <Divider fullWidth={true} className="light" />

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
