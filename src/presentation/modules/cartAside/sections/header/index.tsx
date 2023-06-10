import { GrClose } from "react-icons/gr";
import { useAppSelector } from "@hooks/storeHooks";
import { HeaderProps } from "./types";
import { Title } from "./styles";

const Header = (props: HeaderProps) => {
  const { cartItems } = useAppSelector((state) => state.cart);
  const { setIsOpen } = props;

  return (
    <Title>
      <div>
        Mi carro
        <span className="count">({cartItems?.length ?? 0} productos)</span>
      </div>
      <GrClose onClick={() => setIsOpen(false)} />
    </Title>
  );
};

export default Header;
