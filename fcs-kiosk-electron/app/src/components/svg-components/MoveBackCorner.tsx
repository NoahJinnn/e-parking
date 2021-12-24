import React from 'react'
import './svg-component-type'
import { ISvgComponentProps } from './svg-component-type'

export default function MoveBackCorner({ className }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg width="338" height="236" viewBox="0 0 338 236">
        <defs>
          <clipPath id="clipPath">
            <rect id="Rectangle_204" width="338" height="213.2" fill="#fff" stroke="#707070" strokeWidth="1" />
          </clipPath>
          <linearGradient id="checkin-gradient" x1="0.377" y1="0.577" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#9b71de" />
            <stop offset="1" stopColor="#388ee5" />
          </linearGradient>
        </defs>
        <g id="Mask_Group_8" data-name="Mask Group 8" clipPath="url(#cp)">
          <g id="Floor" transform="translate(-146.978 -271.839)">
            <circle id="Floor-2" data-name="Floor" cx="242.5" cy="242.5" r="242.5" fill="url(#checkin-gradient)" />
          </g>
        </g>
      </svg>
    </div>
  )
}
