import React from 'react'

import { ISvgComponentProps } from './svg-component-type'

export default function WarnPrompterIcon({ className }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="116.903" height="118.061" viewBox="0 0 116.903 118.061">
        <defs>
          <linearGradient id="xth9zpg0fa" x1=".5" x2=".5" y2="1" gradientUnits="objectBoundingBox">
            <stop offset="0" stop-color="#fabd33" />
            <stop offset="1" stop-color="#ff8900" />
          </linearGradient>
        </defs>
        <ellipse cx="58.452" cy="59.03" fill="url(#xth9zpg0fa)" rx="58.452" ry="59.03" />
        <g>
          <path
            fill="#fff"
            d="M256.482 175.153h-10.548v29.254h10.548zm0-16.056h-10.548v8.8h10.548z"
            transform="translate(52.423 36.281) translate(-245.934 -159.097)"
          />
        </g>
      </svg>
    </div>
  )
}
