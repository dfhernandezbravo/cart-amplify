import { useState } from 'react'

import Button from '@components/atoms/Button'
import HeaderAsideMobile from './components/HaderAsideMobile'
import BodyAsideMobile from './components/BodyAsideMobile'
import SubtotalAsideMobile from './components/SubtotalAsideMobile'
import PurchaseSummaryDisabled from '../../components/organisms/PurchaseSummaryDisabled'


//Hooks
import { useAppDispatch, useAppSelector } from '@hooks/storeHooks'
import cartSlice from '@store/cart'

//Styles
import { ContainerMobile, EmptyAsideContainer  } from './styles'


const AsideMobile = () => {

  // const [openDetails, setOpenDetails] = useState(false)
  
  const dispatch = useAppDispatch()

  const { openDetailsMobile } = useAppSelector(state => state.cart)
  const { setOpenDetailsMobile } = cartSlice.actions

  const [isCuponContainerOpen, setIsCuponContainerOpen] = useState(false)

  
  const toggleDetailsMobile = (value: boolean) => {
    dispatch(setOpenDetailsMobile(value))
  }



  //TODO: condition to render product without stock aside or not
  // return(
  //   <EmptyAsideContainer>
  //       <PurchaseSummaryDisabled/>
  //   </EmptyAsideContainer>
  // )

  return (
    <ContainerMobile>
      <div className='wrapper'>
        <HeaderAsideMobile openDetails={openDetailsMobile} setOpenDetails={(value:boolean) => toggleDetailsMobile(value)}/>
        <BodyAsideMobile openDetails={openDetailsMobile}/>
        <SubtotalAsideMobile openDetails={openDetailsMobile} isCuponContainerOpen={isCuponContainerOpen} setIsCuponContainerOpen={setIsCuponContainerOpen}/>
        <div className='button-container'>
          <Button
            className="cartBtn cartBtn--primary fullWidth"
            onClick={() => { }}
          >
            Continuar tu compra
          </Button>
        </div>
      </div>
    </ContainerMobile>
  )
}

export default AsideMobile