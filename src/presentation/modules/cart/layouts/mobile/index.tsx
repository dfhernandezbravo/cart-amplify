import Mobile from "@components/layouts/mobile";
import Header from "@modules/cart/sections/header";
import MainMobile from "@modules/cart/sections/main/main-mobile";
import AsideMobile from "@modules/cart/sections/aside/asideMobile";


//Hooks
import { useAppSelector } from "@hooks/storeHooks";
import minicartSlice, { selectTotalProductsInCart } from '@store/minicart'


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
        <div>
          No Products
        </div>
      )
    }
    </Mobile>
  ) 
};

export default CartMobile;
