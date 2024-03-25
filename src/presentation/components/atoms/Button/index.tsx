import { ButtonProps } from './types';
import { ButtonContainer } from './styles';

const Button = ({
  children,
  className,
  onClick,
  disabled,
  dataId,
}: ButtonProps) => (
  <ButtonContainer
    data-id={dataId}
    isDisabled={disabled || true}
    className={className}
    onClick={onClick}
    disabled={disabled}
  >
    {children}
  </ButtonContainer>
);

export default Button;
