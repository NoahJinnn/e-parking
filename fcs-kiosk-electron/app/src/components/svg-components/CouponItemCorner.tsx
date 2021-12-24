import React from 'react'
import './svg-component-type'
import { ISvgComponentProps } from './svg-component-type'

export default function CouponItemCorner({ className }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg width="52" height="49" viewBox="0 0 52 49" fill="none">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M52 39.3963C46.521 45.3033 38.6922 49 30 49C13.4315 49 0 35.5685 0 19C0 11.7914 2.5425 5.17655 6.77968 0.00340132C6.85284 0.00113932 6.92629 0 7 0H45C48.866 0 52 3.13401 52 7V39.3963Z"
          fill="#FF8E84"
        />
      </svg>
    </div>
  )
}
