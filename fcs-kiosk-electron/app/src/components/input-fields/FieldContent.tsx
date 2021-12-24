import React, { HTMLAttributes } from 'react'
import styled from 'styled-components'

export default function FieldContent({ children, style }: HTMLAttributes<HTMLDivElement>) {
  return <InfoContent style={style}>{children}</InfoContent>
}

const InfoContent = styled.div.attrs({
  className: 'fl w-60 pv2 ph3',
})`
  color: #1d1e18;
  font-size: 1.3rem;
`
