import React from 'react'
import { toast } from "react-toastify";

import { MessageContainer } from './styles'
type Props = {
    title?: string;
    description?: string;
}
type TypesProps = 'info' | 'success' | 'warning' | 'error' | 'default'

const toastTypes = ['info', 'success', 'warning', 'error']


const ToastMessage = ({title, description} : Props) => {
  return  (
    <MessageContainer>
      <p>
        <strong>{title ?? ''}</strong>
      </p>
      <p>{description ?? ''}</p>
    </MessageContainer>
  );
}

const showToast = (title: string, description: string, type:TypesProps = 'default') => {

  if(type === 'default') {
    return  toast(<ToastMessage title={title} description={description}/>)
  }
  
  if(toastTypes.includes(type)) {
    return toast[type](<ToastMessage title={title} description={description} />)
  } 
}


export default showToast