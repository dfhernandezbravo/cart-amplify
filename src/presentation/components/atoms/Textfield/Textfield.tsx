import { TextfieldProps } from './Textfield.types';
import { Input, TextFieldContainer } from './Textfield.styles';

export const Textfield = (props: TextfieldProps) => {
  const {
    type,
    placeholder,
    defaultValue,
    value,
    name,
    className,
    disabled,
    onChange,
    onBlur,
    onFocus,
  } = props;

  return (
    <TextFieldContainer className={className}>
      <Input
        type={type}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        onFocus={onFocus}
        name={name}
        className={className}
        disabled={disabled}
      />
    </TextFieldContainer>
  );
};
