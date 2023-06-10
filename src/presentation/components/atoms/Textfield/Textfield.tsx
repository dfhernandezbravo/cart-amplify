import { TextfieldProps } from "./Textfield.types";
import { Input, TextFieldContainer } from "./Textfield.styles";

export const Textfield = (props: TextfieldProps) => {
  const { type, placeholder, value, onChange, name } = props;

  return (
    <TextFieldContainer>
      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        name={name}
      />
    </TextFieldContainer>
  );
};
