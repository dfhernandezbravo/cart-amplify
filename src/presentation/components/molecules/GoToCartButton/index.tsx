import { useRouter } from 'next/router';
import Button from '@components/atoms/Button';

import { useAppSelector } from '@hooks/storeHooks';
import Link from 'next/link';

const GoToCartButton = () => {
  const router = useRouter();
  const { cartId, isHeadless } = useAppSelector((state) => state.cart);

  const handleClickBtn = () => {
    router.push(`/cart/${cartId}`);
  };

  return (
    <>
      {isHeadless ? (
        <Button
          className="linkBtn goToCartBtn fullWidth"
          onClick={handleClickBtn}
        >
          Ir al carro de compras
        </Button>
      ) : (
        <Link
          href={`https://cl-ccom-easy-host-headless.ecomm-stg.cencosud.com/cart/${cartId}`}
          target="_parent"
        >
          <Button className="linkBtn goToCartBtn fullWidth">
            Ir al carro de compras
          </Button>
        </Link>
      )}
    </>
  );
};

export default GoToCartButton;
