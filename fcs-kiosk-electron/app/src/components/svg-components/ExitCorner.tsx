import React from 'react'
import './svg-component-type'
import { ISvgComponentProps } from './svg-component-type'

export default function ExitCorner({ className, width, height }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg width="250" height="166" viewBox="0 0 321 213">
        <defs>
          <clipPath id="clipPath">
            <rect id="Rectangle_205" data-name="Rectangle 205" width="321" height="213" fill="#fff" stroke="#707070" strokeWidth="1" />
          </clipPath>
          <linearGradient id="exit-corner-gradient" x1="0.623" y1="0.577" x2="0.5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stopColor="#55ace2" />
            <stop offset="1" stopColor="#3888e5" />
          </linearGradient>
        </defs>
        <g id="Mask_Group_10" data-name="Mask Group 10" clipPath="url(#clipPath)">
          <g id="Floor" transform="translate(-0.021 -271.839)">
            <circle id="Floor-2" data-name="Floor" cx="242.5" cy="242.5" r="242.5" fill="url(#exit-corner-gradient)" />
          </g>
        </g>
      </svg>
    </div>
  )
}
