import './BtnStyle.scss'

import React, { HTMLAttributes } from 'react'
import { Button } from 'rendition'

import RippleBtn from './RippleBtn'

export interface IOutlineBtnProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  disabled?: boolean
  onClickHandler: unknown
  rippleStyle?: object
  btnColor?: string
}

export default function OutlineBtn({
  className,
  style,
  rippleStyle,
  label,
  disabled,
  onClickHandler,
  btnColor = '#557cff',
}: IOutlineBtnProps) {
  const OutlineRipple = RippleBtn(btnColor)

  return (
    <OutlineRipple style={rippleStyle} onClickHandler={onClickHandler}>
      <Button
        style={{
          ...style,
          color: btnColor,
          borderColor: btnColor,
        }}
        outline={true}
        disabled={disabled}
        className={`outline-btn ${className}`}>
        {label}
      </Button>
    </OutlineRipple>
  )
}
