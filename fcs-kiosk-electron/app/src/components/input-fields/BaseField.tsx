import React, { HTMLAttributes, ReactComponentElement, ReactElement } from 'react'

import { FieldContainer } from './FieldContainer'
import FieldContent from './FieldContent'
import FieldTitle from './FieldTitle'

export interface IBaseField extends HTMLAttributes<HTMLDivElement> {
  titleIcon?: React.ReactNode
  title: string
  body: any
  titleStyle?: object
  contentStyle?: object
}

export default function BaseField({ titleIcon, title, titleStyle, body, contentStyle, className }: IBaseField) {
  return (
    <div className={className}>
      <FieldContainer>
        <FieldTitle style={titleStyle}>
          {titleIcon}
          <span>{title}</span>
        </FieldTitle>
        <FieldContent style={contentStyle}>{body}</FieldContent>
      </FieldContainer>
    </div>
  )
}
