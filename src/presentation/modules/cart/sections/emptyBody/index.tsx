import Image from 'next/image';
import { useRouter } from 'next/router';
import Button from '@components/atoms/Button';
import { useAppSelector } from '@hooks/storeHooks';
import { Container, Description, Title } from './styles';
import { isProduction } from '@utils/helpers';

const EmptyBody = () => {
  const { isHeadless } = useAppSelector((state) => state.cart);

  const router = useRouter();

  const handleSearchProducts = () => {
    if (!isHeadless && isProduction()) {
      router.push('https://easy.cl');
    } else if (!isHeadless && !isProduction()) {
      router.push('https://site.qa.easy.cl');
    } else {
      router.push('/');
    }
  };

  return (
    <Container>
      <Image
        src={`/images/empty-cart.svg`}
        width={98}
        height={94}
        alt="empty-cart"
        priority
      />
      <Title>Tu carro está vacío</Title>
      <Description>Miles de productos y ofertas te están esperando</Description>
      <Button
        className=" cartBtn cartBtn--secondary"
        onClick={handleSearchProducts}
      >
        Buscar productos
      </Button>
    </Container>
  );
};

export default EmptyBody;
