import { useRouter } from 'next/router';

interface Props {
  cartId: string;
}

const useGoToCheckout = () => {
  const router = useRouter();
  const testEnviroment = [
    'https://cl-ccom-easy-host-headless.ecomm-stg.cencosud.com',
    'localhost',
  ];
  const host = testEnviroment.includes(location.host)
    ? 'https://checkout.easy.cl'
    : 'https://checkout.qa.easy.cl';

  const handleOnClickGoToCheckout = (cartId: Props) => {
    router.push(`${host}/${cartId}`);
  };

  return { handleOnClickGoToCheckout };
};

export default useGoToCheckout;
