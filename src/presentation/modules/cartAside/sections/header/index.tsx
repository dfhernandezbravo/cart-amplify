import { GrClose } from "react-icons/gr";
import { useAppSelector } from "@hooks/storeHooks";
import { totalProductsInCart } from "@store/cart";
import { HeaderProps } from "./types";
import { Title } from "./styles";

const Header = (props: HeaderProps) => {
  const totalProducts = useAppSelector(totalProductsInCart);
  const { setIsOpen } = props;

  return (
    <Title>
      <div>
        Mi carro
        {totalProducts > 0 && (
          <span className="count">
            ({totalProducts} {totalProducts > 1 ? "productos" : "producto"})
          </span>
        )}
      </div>
      <GrClose onClick={() => setIsOpen(false)} />
    </Title>
  );
};

export default Header;
