import { Divider } from '@modules/cart/components/organisms/PurchaseSummary/styles'

import { Container } from './styles'

import { StatePropValue } from '../HaderAsideMobile/HeaderAsideMobile.types'

const BodyAsideMobile = ({openDetails} : StatePropValue) => {
  return (
    <Container openDetails={openDetails}>

      <div className='content-wrapper'>
        <div className='price-container'>
          <p>SubTotal</p>
          <p>$XX.XXX</p>
        </div>

        <div className='price-container'>
          <p>Costo de envio desde</p>
          <p>$XX.XXXX</p>
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
          <button>Eliminar Cupón</button>
        </div>
        {/* If exist cupon. render */}

        <div className='price-container'>
          <p>Descuentos</p>
          <p>$XX.XXX</p>
        </div>
        <Divider />

      </div>

    </Container>
  )
}

export default BodyAsideMobile