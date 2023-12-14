import { Cart } from '@entities/cart/cart.entity';

const productServiceTypes = {
  visit: {
    title: 'Visita de factibilidad',
    icon: '/icons/cart/visit-service.svg',
  },
  instalation: {
    title: 'Instalación',
    icon: '/icons/cart/instalation-service.svg',
  },
  assembly: { title: 'Armado', icon: '/icons/cart/assembly-service.svg' },
};

const useProductServices = () => {
  const mapServicetype = (option: string) => {
    if (option.toLowerCase().includes('factibilidad')) {
      return productServiceTypes.visit;
    }
    if (option.toLowerCase().includes('armado')) {
      return productServiceTypes.assembly;
    }
    return productServiceTypes.instalation;
  };

  const totalServicePrice = (cart: Cart | undefined) => {
    let total = 0;

    const productsWithServices = cart?.items.filter(
      (item) => item.product.options?.length,
    );

    if (!productsWithServices) return total;

    for (let i = 0; i < productsWithServices.length; i++) {
      const options = productsWithServices[i].product.options;

      if (options) {
        const price = options
          .filter(({ isApplied }) => isApplied === true)
          .reduce((acc, cur) => acc + cur.price, 0);

        total = price ? total + price : total;
      }
    }

    return total;
  };

  return { mapServicetype, totalServicePrice };
};

export default useProductServices;
