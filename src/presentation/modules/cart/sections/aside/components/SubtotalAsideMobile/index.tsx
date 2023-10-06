import { StateCuponProps } from '../HaderAsideMobile/HeaderAsideMobile.types'
import CuponAsideMobile from '../CuponAsideMobile'

import cartSlice from '@store/cart'
import { useAppSelector } from '@hooks/storeHooks'
import { formattedCLP } from '@utils/helpers'

const SubtotalAsideMobile = ({openDetails, isCuponContainerOpen, setIsCuponContainerOpen}: StateCuponProps) => {

  const { cartBFF } = useAppSelector(state => state.cart)

  return (
    <div className="subtotal-container">
      <div className="price-container">
        <p>SubTotal con tarjeta Cencosud</p>
        <p>{formattedCLP(cartBFF?.totals?.totalCardPrice || 0)}</p>
      </div>

      <div className="price-container">
        <p>Subtotal con otros medios de pago</p>
        <p>{formattedCLP(cartBFF?.totals?.totalCardPrice || 0)}</p>
      </div>
      <CuponAsideMobile openDetails={openDetails} isCuponContainerOpen={isCuponContainerOpen} setIsCuponContainerOpen={setIsCuponContainerOpen}/>
    </div>
  )
}

export default SubtotalAsideMobile