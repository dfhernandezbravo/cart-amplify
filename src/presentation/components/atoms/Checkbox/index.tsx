import { CheckboxProps } from './types';
import { InputContainer } from './styles';

const Checkbox = (props: CheckboxProps) => {
  const { value, onChange } = props;
  return <InputContainer type="checkbox" checked={value} onChange={onChange} />;
};

export default Checkbox;
