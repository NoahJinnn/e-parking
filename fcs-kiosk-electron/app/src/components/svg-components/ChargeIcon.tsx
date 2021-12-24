import React from 'react'

import { ISvgComponentProps } from './svg-component-type'

export default function ChargeIcon({ className, svgClass }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg className={svgClass} xmlns="http://www.w3.org/2000/svg" id="ic-mobile-battery" width="20" height="20" viewBox="0 0 14 21">
        <path
          fill="#8b8b8b"
          id="Path_722"
          d="M16 23H8a3.078 3.078 0 0 1-3-3.15V7.25A3.078 3.078 0 0 1 8 4.1 2.052 2.052 0 0 1 10 2h4a2.052 2.052 0 0 1 2 2.1 3.078 3.078 0 0 1 3 3.15v12.6A3.078 3.078 0 0 1 16 23zM8 6.2a1.026 1.026 0 0 0-1 1.05v12.6a1.026 1.026 0 0 0 1 1.05h8a1.026 1.026 0 0 0 1-1.05V7.25a1.026 1.026 0 0 0-1-1.05h-1a1.026 1.026 0 0 1-1-1.05V4.1h-4v1.05A1.026 1.026 0 0 1 9 6.2z"
          transform="translate(-5 -2)"
        />
        <path
          fill="#8b8b8b"
          id="Path_723"
          d="M11.42 18.5a.87.87 0 0 1-.44-.11 1 1 0 0 1-.45-1.34l1.28-2.55h-1a1.19 1.19 0 0 1-1-.61 1.22 1.22 0 0 1 0-1.21L12.57 8a.99.99 0 1 1 1.71 1l-2.09 3.5h.91a1.2 1.2 0 0 1 1.07 1.74L12.32 18a1 1 0 0 1-.9.5zm0-4.79z"
          transform="translate(-5 -1.388)"
        />
      </svg>
    </div>
  )
}
