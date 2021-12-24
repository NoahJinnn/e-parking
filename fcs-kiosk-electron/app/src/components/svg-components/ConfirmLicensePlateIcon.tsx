import React from 'react'
import './svg-component-type'
import { ISvgComponentProps } from './svg-component-type'

export default function ConfirmLicensePlateIcon({ className, strokeWidth = 12, stroke = '#b6b6b6' }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="10" viewBox="0 0 152.04 83.07">
        <g id="icon-xacnhanbienso" transform="translate(9 9)">
          <path
            id="Path_16"
            data-name="Path 16"
            d="M4388.727,913.144h134.039"
            transform="translate(-4388.727 -913.144)"
            fill="none"
            stroke={stroke}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
          <path
            id="Path_17"
            data-name="Path 17"
            d="M4388.727,913.144H4502.8"
            transform="translate(-4368.757 -880.608)"
            fill="none"
            stroke={stroke}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
          <path
            id="Path_18"
            data-name="Path 18"
            d="M4388.727,913.144h84.543"
            transform="translate(-4339.231 -848.073)"
            fill="none"
            stroke={stroke}
            strokeLinecap="round"
            strokeWidth={strokeWidth}
          />
        </g>
      </svg>
    </div>
  )
}
