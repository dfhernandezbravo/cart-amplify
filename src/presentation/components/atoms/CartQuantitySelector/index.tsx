import { Select } from './styles';

type Props = {
  quantity: number;
  quantitySelected: (value: string) => void;
  className?: string;
};

const QuantitySelector = ({ quantitySelected, quantity, className }: Props) => {
  const incrementalNumber = ['1', '2', '3', '4', '5'];
  const additionalNumber = ['6 +'];

  const optionsConditional = () => {
    let options: React.ReactElement[] = [];
    if (quantity >= 6) {
      incrementalNumber.forEach((number) => {
        const option = <option value={`${number}`}>{number} un.</option>;
        options.push(option);
      });
      options.push(<option value={quantity}>{quantity} un.</option>);
      options.push(
        <option value={additionalNumber[0]}>{additionalNumber[0]} un.</option>,
      );
      return options;
    } else {
      const allOptions = incrementalNumber.concat(additionalNumber);
      allOptions.forEach((number, index) => {
        const option = (
          <option key={index} value={number}>
            {number} un.
          </option>
        );
        options.push(option);
      });
      return options;
    }
  };

  return (
    <Select
      name="select"
      value={quantity}
      onChange={(event) => quantitySelected(event.target.value)}
      className={className}
    >
      {optionsConditional()}
    </Select>
  );
};

export default QuantitySelector;
