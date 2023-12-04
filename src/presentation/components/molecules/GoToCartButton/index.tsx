import Button from '@components/atoms/Button';
import { useAppSelector } from '@hooks/storeHooks';
import Link from 'next/link';
import { enviroments } from '../../../../configs/env';

const GoToCartButton = () => {
  const { cartBFF, isHeadless } = useAppSelector((state) => state.cart);

  return (
    <>
      <Link
        href={`${enviroments.hostDomain}cart/${cartBFF?.id}`}
        target={isHeadless ? '_self' : '_parent'}
      >
        <Button className="linkBtn goToCartBtn fullWidth">
          Ir al carro de compras
        </Button>
      </Link>
    </>
  );
};

export default GoToCartButton;
