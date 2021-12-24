import React from 'react'

import { ISvgComponentProps } from './svg-component-type'

export default function TickIcon({ className, stroke = '#b6b6b6', strokeWidth = 18, svgClass }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg className={svgClass} xmlns="http://www.w3.org/2000/svg" width="1.8em" height="1.8em" viewBox="0 0 150.633 110.958">
        <path
          id="Path_931"
          data-name="Path 931"
          d="M4375.949,945.125l58.219,48.031,67.143-89.356"
          transform="translate(-4363.279 -891.199)"
          fill="none"
          stroke={stroke}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={strokeWidth}
        />
      </svg>
    </div>
  )
}
