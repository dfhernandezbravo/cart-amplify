import { useState } from 'react';

import Button from '@components/atoms/Button';
import HeaderAsideMobile from './components/HaderAsideMobile';
import BodyAsideMobile from './components/BodyAsideMobile';
import SubtotalAsideMobile from './components/SubtotalAsideMobile';
import PurchaseSummaryDisabled from '../../components/organisms/PurchaseSummaryDisabled';

//Hooks
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import cartSlice from '@store/cart';

//Styles
import { ContainerMobile, EmptyAsideContainer } from './styles';
import ProductWithoutStockModal from '@modules/cart/components/organisms/ProductWithoutStockModal';
import useHandleRedirectEvent from '@hooks/useHandleRedirectEvent';

const AsideMobile = () => {
  const { openDetailsMobile, cartBFF } = useAppSelector((state) => state.cart);
  const { setOpenDetailsMobile } = cartSlice.actions;
  const [isCuponContainerOpen, setIsCuponContainerOpen] = useState(false);
  const {
    showModal,
    joinProductUnavailable,
    setShowModal,
    handleGoToCheckout,
    removeUnavailableItemsAndContinue,
  } = useHandleRedirectEvent();

  const dispatch = useAppDispatch();

  const toggleDetailsMobile = (value: boolean) => {
    dispatch(setOpenDetailsMobile(value));
  };

  if (joinProductUnavailable.length === cartBFF?.items?.length) {
    return (
      <EmptyAsideContainer>
        <PurchaseSummaryDisabled />
      </EmptyAsideContainer>
    );
  }

  return (
    <>
      <ContainerMobile>
        <div className="wrapper">
          <HeaderAsideMobile
            openDetails={openDetailsMobile}
            setOpenDetails={(value: boolean) => toggleDetailsMobile(value)}
          />
          <BodyAsideMobile openDetails={openDetailsMobile} />
          <SubtotalAsideMobile
            openDetails={openDetailsMobile}
            isCuponContainerOpen={isCuponContainerOpen}
            setIsCuponContainerOpen={setIsCuponContainerOpen}
          />
          <div className="button-container">
            <Button
              className="cartBtn cartBtn--primary fullWidth"
              onClick={() => handleGoToCheckout()}
            >
              Continuar tu compra
            </Button>
          </div>
        </div>
      </ContainerMobile>
      <ProductWithoutStockModal
        showModal={showModal}
        handleCloseModal={() => setShowModal(false)}
        removeUnavailableItem={removeUnavailableItemsAndContinue}
      />
    </>
  );
};

export default AsideMobile;
