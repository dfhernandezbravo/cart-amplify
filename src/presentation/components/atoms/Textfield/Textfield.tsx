import { TextfieldProps } from "./Textfield.types";
import { Input, TextFieldContainer } from "./Textfield.styles";

export const Textfield = (props: TextfieldProps) => {
  const { type, placeholder, value, onChange, name, className } = props;

  return (
    <TextFieldContainer className={className}>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
        className={className}
      />
    </TextFieldContainer>
  );
};
