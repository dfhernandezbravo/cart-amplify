import Mobile from "@components/layouts/mobile";
import Header from "@modules/cart/sections/header";
import MainMobile from "@modules/cart/sections/main/main-mobile";
import AsideMobile from "@modules/cart/sections/aside/asideMobile";


//Hooks
import { useAppSelector } from "@hooks/storeHooks";
import  { selectTotalProductsInCart } from '@store/cart'


//Styles
import { Shade } from "./styles";

const CartMobile = () => {

  const { openDetailsMobile } = useAppSelector(state=> state.cart)

  const totalProducts = useAppSelector( selectTotalProductsInCart)

  return (
    <Mobile>
      {/* <Header/> */}
      {totalProducts > 0 ? (
      <div className="container">
        <MainMobile/>
        <AsideMobile/>
        {openDetailsMobile && <Shade/>}
      </div>

      ) : (
        // TODO: add empty view
        <div>
          No Products
        </div>
      )
    }
    </Mobile>
  ) 
};

export default CartMobile;
