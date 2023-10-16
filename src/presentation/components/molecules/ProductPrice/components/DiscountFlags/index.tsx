
import Image from "next/image"
import { ProductPriceProps } from "../../types"
import { DiscountPercent, Price, PriceContainer, PricesContainer } from "./styles"
import { formattedCLP } from "@utils/helpers"

enum PromotionType {
  CENCOPAY = 'CENCOPAY',
  CAT = 'CAT',
  OFFER = 'OFFER'
}

const DiscountFlags = ({ prices, adjustment, quantity }: ProductPriceProps) => {


  const signInvertion = (value: number) => {
    if (!value) return 0
    return Math.abs(value)
  }

  const cencoPayPromotion = adjustment?.filter(promotion => promotion.id === PromotionType.CENCOPAY)
  const cencosudPromotion = adjustment?.filter(promotion => promotion.id === PromotionType.CAT)
  const offerPromotion = adjustment?.filter(promotion => promotion.id === PromotionType.OFFER)

  const cencoPayDiscount = signInvertion(cencoPayPromotion[0]?.value)
  const cencosudDiscount = signInvertion(cencosudPromotion[0]?.value)
  const offerDiscount = signInvertion(offerPromotion[0]?.value)

  const offerPrice = formattedCLP(prices.offerPrice * quantity)




  const CencopayPrice = () => {

    const porcentage = cencoPayPromotion[0].percentageDiscount.replace('-', '')
    return (
      <PriceContainer>
        <Price>{offerPrice}</Price>
        <DiscountPercent>{porcentage}</DiscountPercent>
        <Image src={'/icons/cart/cencopay-icon.svg'} width={40} height={40} alt="cencopay-icon" />
      </PriceContainer>
    )
  }

  const CencosudPrice = () => {
    const porcentage = cencosudPromotion[0].percentageDiscount.replace('-', '')


    return (
      <PriceContainer>
        <Price>{offerPrice}</Price>
        <DiscountPercent>{porcentage}</DiscountPercent>
        <Image src={'/icons/cart/tc-cencosud.svg'} width={40} height={40} alt="cencosud-icon" />
      </PriceContainer>
    )
  }

  const OfferPrice = () => {
    const porcentage = offerPromotion[0].percentageDiscount.replace('-', '')

    return (
      <PriceContainer>
        <Price>{offerPrice}</Price>
        <DiscountPercent>{porcentage}</DiscountPercent>
      </PriceContainer>
    )
  }

  if (offerDiscount >= cencoPayDiscount && offerDiscount >= cencosudDiscount) {
    return <OfferPrice />
  }


  if (cencosudDiscount > offerDiscount && cencosudDiscount > cencoPayDiscount) {
    return (
      <PriceContainer>
        <CencosudPrice />
        <OfferPrice />
      </PriceContainer>
    )
  }

  if (cencoPayDiscount > offerDiscount && cencoPayDiscount > cencosudDiscount) {
    return (
      <PricesContainer>
        <CencopayPrice />
        <OfferPrice />
      </PricesContainer>
    )
  }




  // return (
  //   <PricesContainer>
  //     {cencoPayPromotion?.length ? <CencopayPrice /> : null}
  //     {cencosudPromotion?.length ? <CencosudPrice /> : null}
  //     {offerPromotion?.length ? <OfferPrice /> : null}
  //   </PricesContainer>
  // )
}

export default DiscountFlags