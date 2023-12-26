import { Cart, Item, ProductAvailability } from '@entities/cart/cart.entity';
import { CartItemModel } from '@store/cart/types';
import { enviroments } from '../../configs/env';

type currencyFormatter = {
  currency: string;
  value: number;
};

const currencyFormatter = ({ currency, value }: currencyFormatter) => {
  const formatter = new Intl.NumberFormat('es-CL', {
    style: 'currency',
    currencySign: 'accounting',
    currency,
  });
  return formatter.format(value);
};

export const formattedCLP = (value: number) => {
  return currencyFormatter({
    currency: 'CLP',
    value,
  });
};

export const totalItems = (items: any) => {
  let sum = 0;
  if (!items) return sum;

  for (const obj of items) {
    sum += obj.quantity;
  }
  return sum;
};

// Vtex object structure
export const createNewItem = (data: CartItemModel, quantityValue?: number) => {
  const newItem = {
    itemId: data.items ? data?.items[0]?.itemId : '',
    quantity: quantityValue ? quantityValue : 1,
    adjustment: [
      {
        id: '',
        value: 0,
        name: '',
        percentageDiscount: '',
        priceType: '',
      },
    ],
    priceAfterDiscount: 1,
    product: {
      id: data.items ? data?.items[0]?.itemId : '',
      sku: '',
      description: data.items ? data.items[0]?.nameComplete : '',
      unit: '',
      unitValue: 1,
      size: '',
      color: '',
      prices: {
        brandPrice: null,
        currency: '',
        normalPrice: data.items
          ? data.items[0].sellers![0]?.commertialOffer?.ListPrice
          : 0,
        offerPrice: data.items
          ? data.items[0].sellers![0]?.commertialOffer?.Price
          : 0,
      },
      images: data.items ? data.items[0]?.images![0]?.imageUrl : '',
      brand: data?.brand,
      seller: { id: '' },
      availability: 'available',
      availableQuantity: 0,
      category: '',
      ean: '',
      detailUrl: '',
    },
  };

  return newItem;
};

export const createNewItemHeadless = (data: CartItemModel) => {
  const newItem = {
    itemId: data.productId,
    quantity: 1,
    adjustment: [],
    priceAfterDiscount: 1,
    product: {
      id: data.productId,
      sku: '',
      description: data.productName,
      unit: '',
      unitValue: 1,
      size: '',
      color: '',
      prices: {
        brandPrice: null,
        currency: '',
        normalPrice: data.prices?.normalPrice ? data.prices?.normalPrice : 0,
        offerPrice: null,
      },
      images: data.imageUrl,
      brand: data?.brand,
      seller: { id: '' },
      availability: 'available',
      availableQuantity: 0,
      category: '',
      ean: '',
      detailUrl: '',
    },
  };

  return newItem;
};

export const isProduction = () => {
  const checkoutDomain = enviroments.checkoutDomain;
  return !checkoutDomain?.includes('qa');
};
