import { useAppSelector } from '@hooks/storeHooks';
import { Container } from './styles';
import { ProductAvailability } from '@entities/cart/cart.entity';

const PurchaseSummaryDisabled = () => {
  const { cartBFF } = useAppSelector((state) => state.cart);

  const validDescription = (type: ProductAvailability) => {
    const cannotBeDelivered = {
      title: 'No disponible para tu ubicación',
      description:
        'El o los artículos seleccionados no están disponibles para tu ubicación.',
    };
    switch (type) {
      case ProductAvailability.CANNOTBEDELIVERED:
        return cannotBeDelivered;
      case ProductAvailability.WITHOUTSTOCK:
        return {
          title: 'Sin stock disponible',
          description: 'El artículo seleccionado se encuentra agotado.',
        };
      default:
        return cannotBeDelivered;
    }
  };

  const typeOfUnavailable = cartBFF?.items[0]?.product
    .availability as ProductAvailability;

  const info = validDescription(typeOfUnavailable);

  return (
    <Container>
      <p>{info.title}</p>
      <span>{info.description}</span>
      <div>
        <button>Contiuar tu compra</button>
      </div>
    </Container>
  );
};

export default PurchaseSummaryDisabled;
