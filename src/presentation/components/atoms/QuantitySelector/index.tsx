import { Select } from "./styles";

type Props = {
  quantity: number;
  quantitySelected:(value:string) => void;
}

const QuantitySelector = ({quantitySelected, quantity}: Props) => {
  const incrementalNumber = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '+10']

  return (
    <Select name="select" id="select"  value={quantity} onChange={(event) => quantitySelected(event.target.value)}>
      {incrementalNumber.map((number, index) => {
        return <option key={index} value={number}>{number}u.</option>
      })}
    </Select>
  )
};

export default QuantitySelector;
