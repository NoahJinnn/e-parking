import React from 'react'
import styled from 'styled-components'

export interface IIndicatorPoint {
  text: string
  isHighlight?: boolean
  symbol: React.ReactNode
}

export default function IndicatorPoint({ text, symbol, isHighlight }: IIndicatorPoint) {
  return (
    <div className="relative flex">
      <div className="flex-column">
        <div className="flex justify-center w-100 mb2">
          <RoundPoint
            style={{
              backgroundColor: `${isHighlight ? '#557cff' : '#F5F3F7'}`,
            }}>
            {symbol}
          </RoundPoint>
        </div>
        <div className={`${isHighlight ? 'b' : 'indicator-point--blur'} f4`} style={{ color: '#071013' }}>
          {text}
        </div>
      </div>
    </div>
  )
}

const RoundPoint = styled.div.attrs({
  className: 'br-100',
})`
  width: 3rem;
  height: 3rem;
`
