import Button from '@components/atoms/Button';
import { useAppSelector } from '@hooks/storeHooks';
import Link from 'next/link';
import { enviroments } from '../../../../configs/env';
import { useRouter } from 'next/router';

const GoToCartButton = () => {
  const { cartBFF, isHeadless } = useAppSelector((state) => state.cart);

  const router = useRouter();

  console.log({ router });

  const url = cartBFF?.id
    ? `${enviroments.hostDomain}cart/${cartBFF?.id}`
    : '#';

  const handleOnclick = () => {
    console.log('no id detected...');
  };

  if (!cartBFF?.id) {
    return (
      <Button onClick={handleOnclick} className="linkBtn goToCartBtn fullWidth">
        Ir al carro de comprass
      </Button>
    );
  }

  return (
    <>
      <Link
        href={`${enviroments.hostDomain}cart/${cartBFF?.id}`}
        target={isHeadless ? '_self' : '_parent'}
        onClick={handleOnclick}
      >
        <Button className="linkBtn goToCartBtn fullWidth">
          Ir al carro de compras
        </Button>
      </Link>
    </>
  );
};

export default GoToCartButton;
