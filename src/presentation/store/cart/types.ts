import { Cart } from '@entities/cart/cart.entity';

export type QuantitySelectedProps = {
  index: number | null;
  quantity: number | null;
  availableQuantity: number | null;
};

// export type Hybridation = {
//   cartIdHybridation: string;
//   hasHybridation: boolean;
//   flag: boolean;
// };

export type InitialState = {
  cartBFF: Cart | undefined;
  cartId: string;
  loading: boolean;
  quantitySelected: QuantitySelectedProps;
  openDetailsMobile: boolean;
  // hybridation: Hybridation;
  hasHybridation: boolean;
  cartAsideIsOpen: boolean;
  isCencopayActive: boolean;
};

export interface CartItemModel {
  productId: string;
  quantity?: number;
  productName: string;
  brand: string;
  brandId: number;
  brandImageUrl?: null;
  linkText: string;
  productReference: string;
  productReferenceCode: string;
  categoryId: string;
  productTitle: string;
  metaTagDescription: string;
  releaseDate: string;
  clusterHighlights: ClusterHighlights;
  productClusters: ProductClusters;
  searchableClusters: SearchableClusters;
  categories?: string[] | null;
  categoriesIds?: string[] | null;
  link: string;
  'Tipo de Pilas'?: string[] | null;
  Capacidad?: string[] | null;
  'Tipo de Encendido'?: string[] | null;
  'Tipo de gas'?: string[] | null;
  Tiro?: string[] | null;
  'Características destacadas'?: string[] | null;
  Dimensiones?: string[] | null;
  Material?: string[] | null;
  Materiales?: string[] | null;
  'Regulador de Agua'?: string[] | null;
  'Regulador de Gas'?: string[] | null;
  Sensor?: string[] | null;
  Funciones?: string[] | null;
  Beneficios?: string[] | null;
  Modelo?: string[] | null;
  'Tipo de producto'?: string[] | null;
  Origen?: string[] | null;
  'Otras características'?: string[] | null;
  Recomendaciones?: string[] | null;
  'Observaciones y recomendaciones'?: string[] | null;
  Filtros?: string[] | null;
  Tamaño?: string[] | null;
  RutProveedor?: string[] | null;
  Configuraciones?: string[] | null;
  'Color Bucket'?: string[] | null;
  'Filtros Bucket'?: string[] | null;
  'Garantía Proveedor'?: string[] | null;
  'Garantía Mínima Legal'?: string[] | null;
  'Garantía y Durabilidad'?: string[] | null;
  allSpecifications?: string[] | null;
  allSpecificationsGroups?: string[] | null;
  description: string;
  items?: ItemsEntity[] | null;
}
export interface ClusterHighlights {
  1863: string;
}
export interface ProductClusters {
  256: string;
  338: string;
  450: string;
  466: string;
  622: string;
  685: string;
  832: string;
  834: string;
  1021: string;
  1050: string;
  1065: string;
  1172: string;
  1820: string;
  1831: string;
  1842: string;
  1863: string;
}
export interface SearchableClusters {
  338: string;
  622: string;
  1065: string;
  1172: string;
  1820: string;
}
export interface ItemsEntity {
  itemId: string;
  name: string;
  nameComplete: string;
  complementName: string;
  ean: string;
  referenceId?: ReferenceIdEntity[] | null;
  measurementUnit: string;
  unitMultiplier: number;
  modalType: string;
  isKit: boolean;
  images?: ImagesEntity[] | null;
  sellers?: SellersEntity[] | null;
  Videos?: null[] | null;
  estimatedDateArrival?: null;
}
export interface ReferenceIdEntity {
  Key: string;
  Value: string;
}
export interface ImagesEntity {
  imageId: string;
  imageLabel?: string;
  imageTag: string;
  imageUrl: string;
  imageText?: string;
  imageLastModified: string;
}
export interface SellersEntity {
  sellerId: string;
  sellerName: string;
  addToCartLink: string;
  sellerDefault: boolean;
  commertialOffer: CommertialOffer;
}
export interface CommertialOffer {
  DeliverySlaSamplesPerRegion: DeliverySlaSamplesPerRegion;
  Installments?: InstallmentsEntity[] | null;
  DiscountHighLight?: DiscountHighLightEntity[] | null;
  GiftSkuIds?: null[] | null;
  Teasers?: null[] | null;
  PromotionTeasers?: null[] | null;
  BuyTogether?: null[] | null;
  ItemMetadataAttachment?: null[] | null;
  Price: number;
  ListPrice: number;
  PriceWithoutDiscount: number;
  RewardValue: number;
  PriceValidUntil: string;
  AvailableQuantity: number;
  IsAvailable: boolean;
  Tax: number;
  DeliverySlaSamples?: DeliverySlaSamplesEntity[] | null;
  GetInfoErrorMessage?: null;
  CacheVersionUsedToCallCheckout: string;
  PaymentOptions: PaymentOptions;
}
export interface DeliverySlaSamplesPerRegion {
  0: DeliverySlaSamplesEntity;
}
export interface DeliverySlaSamplesEntity {
  DeliverySlaPerTypes?: null[] | null;
  Region?: null;
}
export interface InstallmentsEntity {
  Value: number;
  InterestRate: number;
  TotalValuePlusInterestRate: number;
  NumberOfInstallments: number;
  PaymentSystemName: string;
  PaymentSystemGroupName: string;
  Name: string;
}
export interface DiscountHighLightEntity {
  '<Name>k__BackingField': string;
}
export interface PaymentOptions {
  installmentOptions?: InstallmentOptionsEntity[] | null;
  paymentSystems?: PaymentSystemsEntity[] | null;
  payments?: null[] | null;
  giftCards?: null[] | null;
  giftCardMessages?: null[] | null;
  availableAccounts?: null[] | null;
  availableTokens?: null[] | null;
}
export interface InstallmentOptionsEntity {
  paymentSystem: string;
  bin?: null;
  paymentName: string;
  paymentGroupName: string;
  value: number;
  installments?: InstallmentsEntity1[] | null;
}
export interface InstallmentsEntity1 {
  count: number;
  hasInterestRate: boolean;
  interestRate: number;
  value: number;
  total: number;
  sellerMerchantInstallments?: SellerMerchantInstallmentsEntity[] | null;
}
export interface SellerMerchantInstallmentsEntity {
  id: string;
  count: number;
  hasInterestRate: boolean;
  interestRate: number;
  value: number;
  total: number;
}
export interface PaymentSystemsEntity {
  id: number;
  name: string;
  groupName: string;
  validator?: null;
  stringId: string;
  template: string;
  requiresDocument: boolean;
  isCustom: boolean;
  description?: null;
  requiresAuthentication: boolean;
  dueDate: string;
  availablePayments?: null;
}

export enum ProductQuantityMessage {
  NOT_ENOUGH = 'not enough',
}

export type CartState = {
  cartBFF: Cart;
  cartId: string;
  error: string;
  loading: boolean;
};
