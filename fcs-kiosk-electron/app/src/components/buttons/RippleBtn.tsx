import './BtnStyle.scss'

import React, { Dispatch, HTMLAttributes, useState } from 'react'
import { createRipples } from 'react-ripples'
import { useDebounceClick } from 'src/services/react-hooks/debounce-click'

export interface IRippleBtnProps extends HTMLAttributes<HTMLDivElement> {
  children: any
  onClickHandler: any
}

const RippleBtnWrapper = (rippleColor: string) => {
  const MyRipples: any = createRipples({
    during: 500,
    color: rippleColor,
  })

  const RippleBtn = ({ className = '', style, children, onClickHandler }: IRippleBtnProps) => {
    const [onDebounceClick] = useDebounceClick()
    const onBtnClick = () => {
      onDebounceClick(onClickHandler)
    }

    return (
      <MyRipples style={style} className={`ripple-btn btn-click--active ${className}`} onClick={onBtnClick}>
        {children}
      </MyRipples>
    )
  }

  return RippleBtn
}

export default RippleBtnWrapper
