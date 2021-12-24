import React, { HTMLAttributes } from 'react'

import styled from 'styled-components'

export default function FieldTitle({ children, style }: HTMLAttributes<HTMLDivElement>) {
  return <InfoTitle style={style}>{children}</InfoTitle>
}

const InfoTitle = styled.div.attrs({
  className: 'fl w-40 pv2 ph3',
})`
  color: #1d1e18;
  font-size: 0.9rem;
  display: flex;
  align-items: center;
  position: relative;
  opacity: 0.54;
  font-weight: 600;
  text-align: left;
  &:after {
    content: '';
    width: 1px;
    height: 1.8rem;
    background: #1d1e18;
    position: absolute;
    right: 4px;
  }
`
