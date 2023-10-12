import { Divider } from '@modules/cart/components/organisms/PurchaseSummary/styles'
import { StatePropValue } from '../HaderAsideMobile/HeaderAsideMobile.types'
import { formattedCLP } from '@utils/helpers'
import { useAppSelector } from '@hooks/storeHooks'


import { Container } from './styles'
import Discounts from '@modules/cart/components/molecules/Discounts'


const BodyAsideMobile = ({openDetails} : StatePropValue) => {

  const  { cartBFF } = useAppSelector(state => state.cart)

  return (
    <Container openDetails={openDetails}>

      <div className='content-wrapper'>
        <div className='price-container'>
          <p>SubTotal</p>
          <span>{formattedCLP(cartBFF?.totals?.subtotal || 0)}</span>
        </div>

        <div className='price-container'>
          <p>Costo de envio desde</p>
          <span>{formattedCLP(cartBFF?.totals?.shippingPrice || 0)}</span>
        </div>

        <div className='price-container'>
          <p>Servicio</p>
          <span>$XX.XXX</span>
        </div>
        <Divider />

        <div className='price-container cupon-container'>
          <Discounts/>
        </div>
        <div className='price-container'>
          <p>Descuentos</p>
          <span>{formattedCLP(cartBFF?.totals?.discount || 0)}</span>
        </div>
        <Divider />

      </div>

    </Container>
  )
}

export default BodyAsideMobile