export const validateCencopayId = (value: string) => {
  const cencopayValues = ['CENCOPAY_SALDO', 'CENCOPAY'];
  return cencopayValues.includes(value);
};
