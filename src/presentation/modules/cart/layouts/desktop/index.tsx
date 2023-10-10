import { useEffect } from 'react'
import { useRouter } from "next/router";
import Desktop from "@components/layouts/desktop";
import CartContainer from "@modules/cart/components/organisms/CartContainer";


//Hooks
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks';
import getCart from '@use-cases/cart/get-cart';



const CartDesktop = () => {

  const dispatch = useAppDispatch()

  const { query } = useRouter()

  useEffect(() => {
    const cartId = query.cartId as string
    dispatch(getCart({cartId}))
  },[])
  

  return (
    <Desktop>
      <CartContainer />
    </Desktop>
  );
};

export default CartDesktop;
