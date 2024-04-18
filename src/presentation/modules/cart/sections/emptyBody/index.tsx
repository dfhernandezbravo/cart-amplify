import Image from 'next/image';
import { useRouter } from 'next/router';
import { useAppSelector } from '@hooks/storeHooks';
import {
  Container,
  Description,
  Title,
  TopContainer,
  BottomContainer,
} from './styles';
import { isProduction } from '@utils/helpers';
import RecommendedProducts from './components/recommended-products';
import Button from '@components/atoms/BitButton';

const EmptyBody = () => {
  const { isHeadless } = useAppSelector((state) => state.cart);
  const router = useRouter();

  const handleSearchProducts = () => {
    if (!isHeadless && isProduction()) {
      router.push('https://easy.cl');
    } else if (!isHeadless && !isProduction()) {
      router.push('https://site.qa.easy.cl');
    } else {
      router.back();
    }
  };

  return (
    <Container>
      <TopContainer>
        <Image
          src={`/images/empty-cart.svg`}
          width={98}
          height={94}
          alt="empty-cart"
          priority
        />
        <Title>Tu carro está vacío</Title>
        <Description>
          Miles de productos y ofertas te están esperando
        </Description>
        <Button label="Buscar productos" onClick={handleSearchProducts} />
      </TopContainer>
      <BottomContainer>
        <RecommendedProducts />
      </BottomContainer>
    </Container>
  );
};

export default EmptyBody;
