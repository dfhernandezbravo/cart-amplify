import Mobile from "@components/layouts/mobile";
import Header from "@modules/cart/sections/header";
import Image from "next/image";
import CartIcon from '/icons/cart.svg'

const CartMobile = () => {
  return (
    <Mobile>
      <div className="container">
       <Header/>
       <div> 
        <Image src='/icons/cart/cart.svg' width={20} height={20} alt="carrito"/>
        <p>Resumen de compra</p>
        
       </div>
      </div>
    </Mobile>
  ) 
};

export default CartMobile;
