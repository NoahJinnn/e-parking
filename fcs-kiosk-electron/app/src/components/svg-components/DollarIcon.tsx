import React from 'react'
import './svg-component-type'
import { ISvgComponentProps } from './svg-component-type'

export default function DollarIcon({ className, fill }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="13" height="22" viewBox="0 0 13 29">
        <text
          id="_"
          fill={fill}
          data-name="$"
          fontFamily="SourceSansPro-Bold, Source Sans Pro"
          fontSize="23px"
          fontWeight="700"
          transform="translate(0 23)">
          <tspan x="0" y="0">
            $
          </tspan>
        </text>
      </svg>
    </div>
  )
}
