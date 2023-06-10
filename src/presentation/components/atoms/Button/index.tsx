import { ButtonProps } from "./types";
import { ButtonContainer } from "./styles";

const Button = (props: ButtonProps) => {
  const { children, className, onClick } = props;
  return (
    <ButtonContainer className={className} onClick={onClick}>
      {children}
    </ButtonContainer>
  );
};

export default Button;
