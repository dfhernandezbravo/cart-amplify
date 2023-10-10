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
}

export interface Item {
  itemId: string;
  quantity: number;
  product: Product;
  adjustment: Adjustment[];
  priceAfterDiscount: number;
  index?: number
}

interface Adjustment {
  id: string;
  value: number;
  name: string;
  percentageDiscount: string;
  priceType: string;
}

interface Adjustments {
  id: string;
  description: string;
  value: number;
  type: string;
  name: string;
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

interface Totals {
  subtotal: number;
  discount: number;
  shippingPrice: number;
  totalCardPrice: number;
  totalPrice: number;
}

interface MessagesError {
  code: string;
  text: string;
  status: string;
  fields: Fields;
}

interface Fields {
  ean: string;
  itemIndex: string;
  skuName: string;
}

export const enum OperationStatus {
  SUCCESS,
  FAILURE,
  PENDING,
}

interface Product {
  id: string;
  sku: string;
  description: string;
  unit: string;
  unitValue: number;
  size: string;
  color: string;
  prices: Prices;
  images: string;
  brand: string;
  seller: Seller;
  options?: Option[];
  availability: string;
  category: string;
  ean: string;
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

interface Prices {
  currency: string;
  normalPrice: number;
  offerPrice: number;
  brandPrice?: number;
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
  CANNOTBEDELIVERED = 'cannotBeDelivered'
}


