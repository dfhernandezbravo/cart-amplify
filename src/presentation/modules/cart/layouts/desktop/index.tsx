import Desktop from "@components/layouts/desktop";
import CartContainer from "@modules/cart/components/organisms/CartContainer";
import { useRouter } from "next/router";

const CartDesktop = () => {

  // const router = useRouter()

  // console.log({router})
  


  return (
    <Desktop>
      <CartContainer />
    </Desktop>
  );
};

export default CartDesktop;
