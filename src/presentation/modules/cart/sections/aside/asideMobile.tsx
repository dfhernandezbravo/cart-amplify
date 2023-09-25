import { useState } from 'react'

import { ContainerMobile } from './styles'
import Image from 'next/image'
import { Divider } from '@mui/material'
import Button from '@components/atoms/Button'

const AsideMobile = () => {

  const [openDetails, setopenDetails] = useState(false)

  const [isCuponContainerOpen, setIsCuponContainerOpen] = useState(false)

  console.log(isCuponContainerOpen)


  const renderChevron = () => {
    if ( isCuponContainerOpen ) {
     return  <Image src='/icons/general/chevron-up-m.svg' width={25} height={25} alt='flecha arriba' />
    }
    return <Image src='/icons/general/chevron-down.svg' width={20} height={20} alt='flecha abajo' />
  }

  return (
    <ContainerMobile>
      <div className='wrapper'>

        <div className='header' onClick={() => setopenDetails(!openDetails)}>
          <div>
            <Image src='/icons/cart/cart.svg' alt='carrito' width={20} height={20} />
            <p>Resumen de compra</p>
          </div>
          <div>
            <button className='toggle-detail-btn'>{!openDetails ? 'Revisar' : 'Ocultar'}</button>
          </div>
        </div>

        <div className={`content ${openDetails ? 'open' : ''}`}>

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

            <div className="price-container">
              <p>SubTotal con tarjeta Cencosud</p>
              <p>$XX.XXXX</p>
            </div>

            <div className="price-container">
              <p>Subtotal con otros medios de pago</p>
              <p>$XX.XXXX</p>
            </div>


            {/* Cupon Container */}
            <div className='add-cupon--container'>

              <div className='add-cupon--header' onClick={() => setIsCuponContainerOpen(!isCuponContainerOpen)}>

                <div>
                  <Image src='/icons/cart/cupon-icon.svg' width={25} height={25} alt='cupon icon' />
                  <p>Cupón de descuento</p>
                </div>

                <div>
                  {renderChevron()}
                </div>

              </div>

              <div className={`add-cupon--input ${isCuponContainerOpen ? 'open' : ''}`}>

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
                
              </div>

            </div>

          </div>

        </div>

        <div className='button-container'>
          <Button
            className="cartBtn cartBtn--primary fullWidth"
            onClick={() => { }}
          >
            Continuar tu compra
          </Button>
        </div>


      </div>
      {openDetails && <div className='shade'></div>}
    </ContainerMobile>
  )
}

export default AsideMobile