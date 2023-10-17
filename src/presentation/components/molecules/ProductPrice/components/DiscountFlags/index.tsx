
import Image from "next/image"
import { ProductPriceProps } from "../../types"
import { DiscountPercent, Price, PriceContainer, PricesContainer } from "./styles"
import { formattedCLP } from "@utils/helpers"

enum PromotionType {
  OFFER = 'OFFER',
  CENCOPAY = 'CENCOPAY',
  CAT = 'CAT',
  CAT_CENCOPAY = 'CAT_CENCOPAY',
  CENCOPAY_SALDO = 'CENCOPAY_SALDO'
}


enum PriceType {
  offer = 'offer',
  brand = 'brand'
}

const DiscountFlags = ({ prices, adjustment, quantity }: ProductPriceProps) => {


  const { offerPrice, brandPrice } = prices

  const offerDiscount = adjustment?.filter(promotion => promotion.priceType === PriceType.offer)
  const brandDiscount = adjustment?.filter(promotion => promotion.priceType === PriceType.brand)


  const offerPriceQuantity = offerPrice && formattedCLP(offerPrice * quantity)

  const replaceMinus = (value: string) => value.replace('-', '')



  const Flag = () => {
    switch (brandDiscount[0].id) {
      case PromotionType.CAT:
        return <Image src={'/icons/cart/tc-cencosud.svg'} width={40} height={40} alt="cencosud-icon" />
      case PromotionType.CENCOPAY:
        return <Image src={'/icons/cart/cencopay-icon.svg'} width={40} height={40} alt="cencopay-icon" />
      case PromotionType.CENCOPAY_SALDO:
        return <Image src={'/icons/cart/cencopay-saldo.svg'} width={40} height={40} alt="cencopay-saldo-icon" />
    }
  }

  const OfferPrice = () => {
    const porcentage = replaceMinus(offerDiscount[0].percentageDiscount)
    return (
      <PriceContainer>
        <Price>{offerPriceQuantity}</Price>
        <DiscountPercent>{porcentage}</DiscountPercent>
      </PriceContainer>
    )
  }

  const BrandPrice = () => {
    const porcentage = replaceMinus(brandDiscount[0].percentageDiscount)

    if (!brandPrice) return
    return (
      <PriceContainer>
        <Price>{formattedCLP(brandPrice)}</Price>
        <DiscountPercent>{porcentage}</DiscountPercent>
        <Flag />
      </PriceContainer>
    )
  }

  if (offerPrice && brandPrice && offerPrice <= brandPrice) {
    return <OfferPrice />
  }

  return (
    <PricesContainer>
      <OfferPrice />
      <BrandPrice />
    </PricesContainer>
  )
}

export default DiscountFlags