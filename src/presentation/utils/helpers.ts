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
  for (const obj of items) {
    sum += obj.quantity;
  }
  return sum;
};

export default totalItems;
