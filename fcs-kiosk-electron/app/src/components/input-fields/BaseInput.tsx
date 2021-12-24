import './BaseInput.scss'

import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

import TimesCircleIcon from '../svg-components/TimesCircleIcon'
import { FieldContainer } from './FieldContainer'

export interface IBaseInputProps extends HTMLAttributes<HTMLDivElement> {
  containerRef?: any
  label?: string
  value?: string
  onClearTxt?: () => any
  containerClassName?: string
  labelClassName?: string
  labelStyle?: object
  inputClassName?: string
  showClearBtn?: boolean
  hasSeparator?: boolean
  autoFocus?: true
}

export default function BaseInput({
  id,
  containerRef,
  label,
  value = '',
  onClearTxt,
  containerClassName,
  labelClassName,
  labelStyle,
  inputClassName,
  showClearBtn = true,
  hasSeparator = true,
  autoFocus,
}: IBaseInputProps) {
  return (
    <div id={id} ref={containerRef} className={`${containerClassName} relative`}>
      <FieldContainer id={id}>
        <Label id={id} hasSeparator={hasSeparator} style={labelStyle} className={`${labelClassName} base-input__label mh3`}>
          {label}
        </Label>
        <input autoFocus={autoFocus} id={id} value={value} className={`${inputClassName} base-input ba br3 f3 bn outline-0 pb1`} />
        {value.length > 0 && showClearBtn && <TimesCircleIcon onClickHandler={onClearTxt} className="clear-all-input" />}
      </FieldContainer>
    </div>
  )
}

const Label = styled.div<{ hasSeparator: boolean }>`
  color: #1d1e18;
  font-size: 0.9rem;
  opacity: 0.54;
  font-weight: 600;
  text-align: left;
  position: relative;
  min-width: 30%;
  &:after {
    content: '';
    width: ${(props) => (props.hasSeparator ? '1px' : '0')};
    height: 1.8rem;
    background-color: #1d1e18;
    position: absolute;
    top: -0.2rem;
    right: 4px;
  }
`
