import Button from '@components/atoms/Button'
import React from 'react'
import { StateCuponProps, StatePropValue } from '../HaderAsideMobile/HeaderAsideMobile.types'
import Image from 'next/image'

import { Container, InputCuponContainer } from './styles'


type Props = StateCuponProps & StatePropValue

const CuponAsideMobile = ({openDetails, isCuponContainerOpen, setIsCuponContainerOpen }: Props) => {


  const renderChevron = () => {
    if (isCuponContainerOpen) {
      return <Image src='/icons/general/chevron-up-m.svg' width={25} height={25} alt='flecha arriba' />
    }
    return <Image src='/icons/general/chevron-down.svg' width={20} height={20} alt='flecha abajo' />
  }


  return (

    <Container openDetails={openDetails}>
      <div className='add-cupon--header' onClick={() => setIsCuponContainerOpen(!isCuponContainerOpen)}>
        <div>
          <Image src='/icons/cart/cupon-icon.svg' width={25} height={25} alt='cupon icon' />
          <p>Cupón de descuento</p>
        </div>

        <div>
          {renderChevron()}
        </div>
      </div>
      
      <InputCuponContainer isCuponContainerOpen={isCuponContainerOpen}>
        <div className='add-cupon--input-container'>
          <input type="text" placeholder='Ingresa tu cupón' />
        </div>
        <div className='button-container'>
          <Button
            className="cartBtn cartBtn--primary fullWidth"
            onClick={() => { }}
          >
            Aplicar
          </Button>
        </div>
      </InputCuponContainer>
    </Container >

  )
}

export default CuponAsideMobile