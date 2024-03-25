import { TextfieldProps } from './Textfield.types';
import { Input, TextFieldContainer } from './Textfield.styles';

export const Textfield = ({
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
  dataId,
}: TextfieldProps) => (
  <TextFieldContainer className={className}>
    <Input
      data-id={dataId}
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
