import { RibbonType } from '@ccom-easy-design-system/atoms.ribbon';
export interface Cart {
  id: string;
  currencyCode: string;
  items: Item[];
  adjustments?: Adjustments[];
  shipping?: Shipping;
  customer?: Customer;
  payment?: Payment;
  taxes?: Taxes;
  totals?: Totals;
  messagesErrors?: MessagesError[];
  validatedCoupon?: OperationStatus | undefined;
  canEdit?: boolean;
  loggedIn?: boolean;
  terms?: boolean;
  channel: string;
}

export interface Item {
  itemId: string;
  quantity: number;
  product: Product;
  adjustment: Adjustment[];
  priceAfterDiscount: number;
  index?: number;
}

export interface Adjustment {
  id: string;
  value: number;
  name: string;
  percentageDiscount: string;
  priceType: string;
}

export interface Adjustments {
  id: string;
  description: string;
  value: number;
  type: string;
  name: string;
  percentageDiscount: string;
  priceType: string;
}

interface Shipping {
  whoWithdraw: WithdrawalThird;
  grouping: Grouping[];
  isAddressIncomplete: boolean;
  selectedAddresses: AddressShipping[];
  isShippingInfoComplete: boolean;
}

interface Customer {
  documentType: string;
  document: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  isCorporate: boolean;
  birthdate: Date;
  userId?: string;
  isEmployee?: boolean;
}

interface Payment {}

interface Taxes {}

export interface Totals {
  subtotal: number;
  discount: number;
  shippingPrice: number;
  totalCardPrice: number;
  totalPrice: number;
  totalCencoPay: number;
}

export enum PriceType {
  totalPrice = 'totalPrice',
  totalCardPrice = 'totalCardPrice',
  totalCencoPay = 'totalCencoPay',
}

export interface MessagesError {
  code: string;
  text: string;
  status: string;
  fields: Fields;
}

interface Fields {
  ean: string;
  itemIndex: string;
  skuName: string;
  id: string;
}

export const enum OperationStatus {
  SUCCESS,
  FAILURE,
  PENDING,
}

export interface ColorCode {
  code: string;
  hexColor: string;
  quantity: number;
}

export interface Product {
  id: string;
  sku: string;
  description: string;
  unit: string;
  unitValue: number;
  size: string;
  color: string;
  prices: Prices;
  images: string;
  imageUrl?: string;
  brand: string;
  seller: Seller;
  options?: Option[];
  availability: string;
  availableQuantity: number;
  category: string;
  ean: string;
  productId?: string;
  detailUrl: string;
  ribbons: RibbonType[];
  colorCodes?: ColorCode[];
}

export interface WithdrawalThird {
  firstName: string;
  lastName: string;
  document: string;
}

export interface Grouping {
  name: string;
  shippingMethods?: ShippingMethod[];
  items: ItemGroup[];
}

export type AddressShipping = {
  addressId: string;
  street: string;
  state?: string;
  receiverName?: string;
  postalCode?: string;
  number?: string;
  neighborhood?: string;
  country?: string;
  city?: string;
  addressType?: string;
  addressName?: string;
  defaultAddress?: boolean;
  geoCoordinates?: any;
  addressValue?: any;
  countryfake?: string;
};

export interface Prices {
  currency: string;
  normalPrice: number;
  offerPrice: number | null;
  brandPrice: number | null;
}

interface Seller {
  id: string;
  name?: string;
}

export interface Option {
  type: string;
  id: string;
  description: string;
  price: number;
  isApplied: boolean;
}

export interface ShippingMethod {
  id: string;
  deliveryChannel: string;
  name: string;
  price: number;
  pickupStoreInfo: PickupStoreInfo | null;
  pickupDistance: string | null;
  availableDeliveryWindows: DeliveryWindow[];
  deliveryWindow?: DeliveryWindow;
  businessHours?: BussinessHour[];
  selected: boolean;
  visibility: string;
}

export interface ItemGroup {
  itemIndex: number;
  selectedDeliveryChannel: string;
  addressId: string;
  itemId: string;
  sku: string;
  selectedShippingMethod: string;
  availability: string;
  shippingMethods: string[];
  quantity: number;
  product: Product;
}

export interface PickupStoreInfo {
  friendlyName: string;
  address: AddressShipping;
  additionalInfo: string;
  id: string;
}

export interface DeliveryWindow {
  startDateUtc: string;
  endDateUtc: string;
  lisPrice?: number;
  price?: number;
  tax?: number;
}

export interface BussinessHour {
  DayOfWeek: number;
  OpeningTime: string;
  ClosingTime: string;
}

export interface CouponCode {
  couponCode: string;
  cartId: string;
}

export enum ProductAvailability {
  AVAILABLE = 'available',
  WITHOUTSTOCK = 'withoutStock',
  CANNOTBEDELIVERED = 'cannotBeDelivered',
  ITEM_QUANTITY_NOT_AVAILABLE = 'itemQuantityNotAvailable',
  UNAVAILABLE_ITEM_FULFILLMENT = 'unavailableItemFulfillment',
}
