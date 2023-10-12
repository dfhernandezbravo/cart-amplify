import showToast from "./ToastMessage"

type Props = {
  position?: PositionType
}

export const valueHasChangeToast = (props?: Props) => {
  const position = props?.position || 'bottom-right'
  return showToast({
    description: 'Los valores han cambiado.',
    type: 'info',
    position
  })
}

export const couponNoValidToast = (props?: Props) => {
  const position = props?.position || 'bottom-right'
  return showToast({
    description: 'cupón no valido.',
    type: 'error',
    position
  })
}


export const changeOfAmount = (props?: Props) => {
  const position = props?.position || 'bottom-right'
  return showToast({
    title: 'Hubo cambios en tus productos',
    description:
      'Lo sentimos, no contamos con la cantidad de unidades seleccionadas.',
    type: 'warning',
    position
  })
}