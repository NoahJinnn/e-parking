import React from 'react'
import './svg-component-type'
import { ISvgComponentProps } from './svg-component-type'

export default function SuccessIcon({ className, width, height }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width={width} height={height} viewBox="0 0 164 164" stroke="#47FF69">
        <g id="icon-success" transform="translate(-876 -238)">
          <g id="Ellipse_22" data-name="Ellipse 22" transform="translate(876 238)" fill="none" strokeWidth="15">
            <circle cx="82" cy="82" r="82" stroke="none" />
            <circle cx="82" cy="82" r="74.5" fill="none" />
          </g>
          <path
            id="Path_512"
            data-name="Path 512"
            d="M4375.948,924.88l29.7,24.5L4439.9,903.8"
            transform="translate(-3449.741 -606.555)"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="15"
          />
        </g>
      </svg>
    </div>
  )
}
