import { useState } from 'react'

import { ContainerMobile } from './styles'

const AsideMobile = () => {

  const [openDetails, setopenDetails] = useState(false)



  return (
    <ContainerMobile>
      <div className='wrapper'>
        <div className='header' onClick={() => setopenDetails(!openDetails)}>Revisar</div>
        <div className={`content ${openDetails ? 'open' : ''}`}>content</div>
        <button>Buy</button>

      </div>
      {openDetails && <div className='shade'></div>}
    </ContainerMobile>
  )
}

export default AsideMobile