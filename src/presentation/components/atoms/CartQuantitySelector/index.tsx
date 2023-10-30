import { Select } from './styles';

type Props = {
  quantity: number;
  quantitySelected: (value: string) => void;
};

const QuantitySelector = ({ quantitySelected, quantity }: Props) => {
  const incrementalNumber = ['1', '2', '3', '4', '5'];
  const additionalNumber = ['6 +'];
  console.log('updated');
  const optionsConditional = () => {
    let options: React.ReactElement[] = [];
    if (quantity >= 6) {
      incrementalNumber.forEach((number) => {
        const option = <option value={`${number}`}>{number}u.</option>;
        options.push(option);
      });
      options.push(<option value={quantity}>{quantity}u.</option>);
      options.push(
        <option value={additionalNumber[0]}>{additionalNumber[0]}</option>,
      );
      return options;
    } else {
      const allOptions = incrementalNumber.concat(additionalNumber);
      allOptions.forEach((number) => {
        const option = <option value={number}>{number}u.</option>;
        options.push(option);
      });
      return options;
    }
  };

  return (
    <Select
      name="select"
      id="select"
      value={quantity}
      onChange={(event) => quantitySelected(event.target.value)}
    >
      {optionsConditional()}
    </Select>
  );
};

export default QuantitySelector;
