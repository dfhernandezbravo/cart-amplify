import { Divider } from '@modules/cart/components/organisms/PurchaseSummary/styles'
import { StatePropValue } from '../HaderAsideMobile/HeaderAsideMobile.types'
import { formattedCLP } from '@utils/helpers'
import { useAppSelector, useAppDispatch } from '@hooks/storeHooks'
import removeCouponCode from '@use-cases/cart/removeCouponCode'


import { Container } from './styles'


const BodyAsideMobile = ({openDetails} : StatePropValue) => {

  const  { cartBFF } = useAppSelector(state => state.cart)
  const dispatch = useAppDispatch()


  const handleRemoveCoupon = () => {
    const getCouponCode = cartBFF?.adjustments?.filter(code => code.type === 'coupon')

    if(getCouponCode?.length) {
        const data = {
          couponCode: getCouponCode[0].id,
          cartId: cartBFF?.id as string
        }
        dispatch(removeCouponCode(data))
    }
  }

  return (
    <Container openDetails={openDetails}>

      <div className='content-wrapper'>
        <div className='price-container'>
          <p>SubTotal</p>
          <p>{formattedCLP(cartBFF?.totals?.subtotal || 0)}</p>
        </div>

        <div className='price-container'>
          <p>Costo de envio desde</p>
          <p>{formattedCLP(cartBFF?.totals?.shippingPrice || 0)}</p>
        </div>

        <div className='price-container'>
          <p>Servicio</p>
          <p>$XX.XXX</p>
        </div>
        <Divider />


        {/* If exist cupon. render */}
        <div className='price-container cupon-container'>
          <p>CUPON CODE</p>
          <p>$XX.XXX</p>
        </div>
        <div className="delete-cupon">
          <button onClick={() => handleRemoveCoupon()}>Eliminar Cupón</button>
        </div>
        {/* If exist cupon. render */}

        <div className='price-container'>
          <p>Descuentos</p>
          <p>{formattedCLP(cartBFF?.totals?.discount || 0)}</p>
        </div>
        <Divider />

      </div>

    </Container>
  )
}

export default BodyAsideMobile