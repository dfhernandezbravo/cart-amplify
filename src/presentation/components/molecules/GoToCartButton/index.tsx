import { useEffect, useState } from 'react';
import Button from '@components/atoms/Button';
import { useAppSelector } from '@hooks/storeHooks';
import Link from 'next/link';
import { environments } from '../../../../configs/env';

const GoToCartButton = () => {
  const { cartBFF, isHeadless } = useAppSelector((state) => state.cart);

  //TODO: delete this conditional when hybrid is gone
  const [recursiveNumber, setRecursiveNumber] = useState(0);

  useEffect(() => {
    if (!cartBFF?.id && recursiveNumber <= 5) {
      setRecursiveNumber(recursiveNumber + 1);
    }
  }, [recursiveNumber, cartBFF]);

  if (!cartBFF?.id) {
    return (
      <Button className="linkBtn goToCartBtn fullWidth">
        Ir al carro de comprass
      </Button>
    );
  }
  //TODO: delete this conditional when hybrid is gone

  return (
    <>
      <Link
        href={`${environments.hostDomain}cart/${cartBFF?.id}`}
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
