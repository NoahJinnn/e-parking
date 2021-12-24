import React from 'react'

import { ISvgComponentProps } from './svg-component-type'

export default function AtmMethodIcon({ className }: ISvgComponentProps) {
  return (
    <div className={className}>
      <svg xmlns="http://www.w3.org/2000/svg" width="43" height="33" viewBox="0 0 43 33" stroke="#3c3c3c" fill="#3c3c3c">
        <g id="Group_609" data-name="Group 609" transform="translate(-1350 -525)">
          <text id="ATM" fontFamily="SourceSansPro-Black, Source Sans Pro" fontSize="16px" fontWeight="800" transform="translate(1356 547)">
            <tspan x="-2" y="0">
              ATM
            </tspan>
          </text>
          <g id="Rectangle_181" fill="none" strokeWidth="3px" data-name="Rectangle 181" transform="translate(1350 525)">
            <rect width="43" height="33" stroke="none" rx="5" />
            <rect width="40" height="30" x="1.5" y="1.5" rx="3.5" />
          </g>
        </g>
      </svg>
    </div>
  )
}
