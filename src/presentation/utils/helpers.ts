import { Cart, Item, ProductAvailability } from "@entities/cart/cart.entity";
import { CartItemModel } from "@store/cart/types";

type currencyFormatter = {
  currency: string;
  value: number;
};



const currencyFormatter = ({ currency, value }: currencyFormatter) => {
  const formatter = new Intl.NumberFormat("es-CL", {
    style: "currency",
    currencySign: "accounting",
    currency,
  });
  return formatter.format(value);
};

export const formattedCLP = (value: number) => {
  return currencyFormatter({
    currency: "CLP",
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

export const createNewItem = (data: CartItemModel) => {
  const newItem = {
    itemId: "",
    quantity: 1,
    adjustment: [
      {
        id: "",
        value: 0,
        name: "",
        percentageDiscount: "",
        priceType: "",
      },
    ],
    priceAfterDiscount: 1,
    product: {
      id: data?.productReference,
      sku: "",
      description: data.items ? data.items[0]?.nameComplete : "",
      unit: "",
      unitValue: 1,
      size: "",
      color: "",
      prices: {
        brandPrice: undefined,
        currency: "",
        normalPrice: data.items
          ? data.items[0].sellers![0]?.commertialOffer?.ListPrice
          : 0,
        offerPrice: data.items
          ? data.items[0].sellers![0]?.commertialOffer?.Price
          : 0,
      },
      images: data.items ? data.items[0]?.images![0]?.imageUrl : "",
      brand: data?.brand,
      seller: { id: "" },
      availability: "",
      category: "",
      ean: "",
    },
  };

  return newItem;
};


export const getUnavailableProduct = (cart:Cart ) => {

  const itemWithoutStock: Item[] | never = [];

  cart?.items?.forEach((item, index) => {
    const availability = item.product.availability;
    if (
      availability === ProductAvailability.WITHOUTSTOCK ||
      availability === ProductAvailability.CANNOTBEDELIVERED
    ) {
      const product = {
        ...item,
        index,
      };
      itemWithoutStock.push(product);
    }
  });
  return itemWithoutStock
}



