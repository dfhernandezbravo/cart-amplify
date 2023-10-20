import { PromotionType } from '@entities/cart/promotions';

export const typeOfCluster = (offer: string) => {
  switch (offer) {
    case PromotionType.EXPERTO:
    case PromotionType.EXPERTO_PREFERENTE:
      return 'experto';
    case PromotionType.COLABOLADOR:
      return 'colaborador';
    case PromotionType.X_UNIDAD:
      return '2da unidad';
    default:
      return null;
  }
};
