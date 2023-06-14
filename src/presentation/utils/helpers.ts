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
