import './BtnStyle.scss'

import React, { HTMLAttributes } from 'react'
import { Button } from 'rendition'

import RippleBtn from './RippleBtn'

const PrimaryRipple = RippleBtn('#DEDEDE')
export interface IPrimaryBtnProps extends HTMLAttributes<HTMLDivElement> {
  label?: string
  disabled?: boolean
  onClickHandler: unknown
  rippleStyle?: object
  btnColor?: string
}

export default function PrimaryBtn({
  className,
  style,
  rippleStyle,
  label,
  disabled,
  onClickHandler,
  btnColor = '#557cff',
}: IPrimaryBtnProps) {
  return (
    <PrimaryRipple style={rippleStyle} onClickHandler={onClickHandler}>
      <Button
        style={{
          ...style,
          backgroundColor: btnColor,
          borderColor: btnColor,
        }}
        primary={true}
        disabled={disabled}
        className={`primary-btn ${className}`}>
        {label}
      </Button>
    </PrimaryRipple>
  )
}
