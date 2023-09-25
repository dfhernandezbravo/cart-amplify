import { useState } from 'react'

import { ContainerMobile } from './styles'
import Image from 'next/image'
import { Divider } from '@mui/material'
import Button from '@components/atoms/Button'
import HeaderAsideMobile from './components/HaderAsideMobile'
import BodyAsideMobile from './components/BodyAsideMobile'
import SubtotalAsideMobile from './components/SubtotalAsideMobile'

const AsideMobile = () => {

  const [openDetails, setOpenDetails] = useState(false)

  const [isCuponContainerOpen, setIsCuponContainerOpen] = useState(false)

  return (
    <ContainerMobile>
      <div className='wrapper'>
        <HeaderAsideMobile openDetails={openDetails} setOpenDetails={setOpenDetails}/>
        <BodyAsideMobile openDetails={openDetails}/>
        <SubtotalAsideMobile openDetails={openDetails} isCuponContainerOpen={isCuponContainerOpen} setIsCuponContainerOpen={setIsCuponContainerOpen}/>
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