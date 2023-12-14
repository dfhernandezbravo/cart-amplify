import { useState } from 'react';
import useProductServices from '@hooks/useProductServices';
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import useBreakpoints from '@hooks/useBreakpoints';
import addProductService from '@use-cases/cart/add-product-service';
import deleteProductService from '@use-cases/cart/delete-product-service';
import ProductServiceMobile from './ProductServiceMobile';
import { ProductServiceProps } from './types';
import ProductServiceDesktop from './ProductServiceDesktop';

const ProductService = ({ option, index }: ProductServiceProps) => {
  const { mapServicetype } = useProductServices();
  const dispatch = useAppDispatch();
  const { cartId } = useAppSelector((state) => state.cart);
  const { isXs, isSm } = useBreakpoints();

  const isMobile = isXs || isSm;

  const [checked, setChecked] = useState(option.isApplied);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { description, price, id } = option;
  const serviceType = mapServicetype(description);

  const handleChange = () => {
    const updateChecked = !checked;
    setChecked(updateChecked);

    if (updateChecked) {
      dispatch(addProductService({ cartId, id, itemIndex: index }));
    } else {
      dispatch(
        deleteProductService({ cartId, itemIndex: index, optionId: id }),
      );
    }
  };

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {isMobile ? (
        <ProductServiceMobile
          checked={checked}
          description={description}
          isModalOpen={isModalOpen}
          price={price}
          serviceType={serviceType}
          handleChange={handleChange}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      ) : (
        <ProductServiceDesktop
          checked={checked}
          description={description}
          isModalOpen={isModalOpen}
          price={price}
          serviceType={serviceType}
          handleChange={handleChange}
          handleOpenModal={handleOpenModal}
          handleCloseModal={handleCloseModal}
        />
      )}
    </>
  );
};

export default ProductService;
