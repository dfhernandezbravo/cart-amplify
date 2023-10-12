import showToast from "./ToastMessage"

type Props = {
  position?: PositionType
}

export  const ValueHasChangeToast = (props?: Props) => {
  const position = props?.position || 'bottom-right'
  return showToast({
    description: 'Los valores han cambiado.',
    type: 'info',
    position
  })
}

export const CouponNoValidToast = (props?: Props) => {
  const position = props?.position || 'bottom-right'
  return showToast({
    description: 'cupón no valido.',
    type: 'error',
    position
  })
}