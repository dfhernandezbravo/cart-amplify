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

  return { mapServicetype };
};

export default useProductServices;
