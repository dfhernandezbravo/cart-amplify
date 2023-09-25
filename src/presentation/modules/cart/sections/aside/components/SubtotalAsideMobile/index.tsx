import Image from 'next/image'
import Button from '@components/atoms/Button'
import { StateCuponProps } from '../HaderAsideMobile/HeaderAsideMobile.types'
import CuponAsideMobile from '../CuponAsideMobile'

const SubtotalAsideMobile = ({openDetails, isCuponContainerOpen, setIsCuponContainerOpen}: StateCuponProps) => {
 
  return (
    <div className="subtotal-container">
      <div className="price-container">
        <p>SubTotal con tarjeta Cencosud</p>
        <p>$XX.XXXX</p>
      </div>

      <div className="price-container">
        <p>Subtotal con otros medios de pago</p>
        <p>$XX.XXXX</p>
      </div>
      <CuponAsideMobile openDetails={openDetails} isCuponContainerOpen={isCuponContainerOpen} setIsCuponContainerOpen={setIsCuponContainerOpen}/>
    </div>
  )
}

export default SubtotalAsideMobile