import { useAppSelector, useAppDispatch } from '@hooks/storeHooks'
import useBreakpoints from '@hooks/useBreakpoints'
import { valueHasChangeToast } from '@components/atoms/ToastContainer/customMessage'

import removeCouponCode from '@use-cases/cart/removeCouponCode'


import { CouponCodeWrapper, RemoveCoupon } from './styles'
const Discounts = () => {

  const {isXs, isMd} = useBreakpoints()

  const  { cartBFF, couponId, cartId } = useAppSelector(state =>state.cart)
  const dispatch = useAppDispatch()
  const couponCode = cartBFF?.adjustments?.filter(adjustment => {
    return adjustment.type === 'coupon'
  })


  const isMobile = isXs || isMd

  const removeCoupon = async(event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault()
    await dispatch(removeCouponCode({couponCode: couponId, cartId}))
    if(isMobile)  return valueHasChangeToast({position:'top-center'})
    valueHasChangeToast()
  }
 
  return (
    <>
      { couponCode?.length ? (
        <>
        <CouponCodeWrapper>
          <p className='couponCode'>{couponCode[0].id}</p>
          <p>${Math.abs(couponCode[0].value)}</p>
        </CouponCodeWrapper>
        <RemoveCoupon onClick={removeCoupon}>Eliminar cupón</RemoveCoupon>
        </>
      ) : null }
    </>
  )
}

export default Discounts