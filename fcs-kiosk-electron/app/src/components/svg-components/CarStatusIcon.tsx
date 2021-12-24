import React from 'react'

import { ISvgComponentProps } from './svg-component-type'

export default function CarStatusIcon({ className, svgClass, onClickHandler }: ISvgComponentProps) {
  return (
    <div className={className} onClick={onClickHandler}>
      <svg className={svgClass} xmlns="http://www.w3.org/2000/svg" width="58" height="58" viewBox="0 0 58 58">
        <g stroke="#43c424" strokeLinecap="round" strokeWidth="3px">
          <g fill="#fff" strokeDasharray="113" transform="translate(-718.901 -306.901) rotate(81 204.818 603.625)">
            <circle cx="25.347" cy="25.347" r="25.347" stroke="none" />
            <circle cx="25.347" cy="25.347" r="23.847" fill="none" />
          </g>
          <path
            fill="none"
            strokeLinejoin="round"
            d="M10616.51 2885.57l9.6 9.782 18.648-21.742"
            transform="translate(-718.901 -306.901) translate(-9873.197 -2555.208)"
          />
        </g>
      </svg>
    </div>
  )
}
