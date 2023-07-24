import { ButtonProps } from "./types";
import { ButtonContainer } from "./styles";

const Button = (props: ButtonProps) => {
  const { children, className, onClick, disabled } = props;
  return (
    <ButtonContainer
      className={className}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </ButtonContainer>
  );
};

export default Button;